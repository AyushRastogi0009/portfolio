import {
  Color,
  CanvasTexture,
  FogExp2,
  GridHelper,
  Material,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  SRGBColorSpace,
  WebGLRenderer,
} from 'three';
import { CARD_LAYOUT, CODE_SNIPPETS, CodeSnippet } from './code-snippets';

const MONO = '"IBM Plex Mono", ui-monospace, Menlo, Consolas, monospace';

/** Groups: 1 comment, 2 string, 3 keyword, 4 number. */
const TOKEN_RE =
  /(\/\/.*$|--.*$)|('[^']*'|"[^"]*"|`[^`]*`)|\b(const|let|var|async|await|function|return|new|import|from|export|class|implements|EXEC|SELECT|FROM|GROUP|BY|AS|COUNT|if|else|try|catch)\b|(\b\d[\d_.]*\b)/g;

interface Card {
  mesh: Mesh;
  baseY: number;
  baseRotY: number;
  phase: number;
}

/**
 * The 3D background: syntax-highlighted code windows floating in depth.
 * Scrolling moves the camera forward through them and the mouse adds a small parallax.
 * The constructor throws when WebGL is not available, so the caller can hide the canvas.
 */
export class CodeScene {
  private readonly renderer: WebGLRenderer;
  private readonly scene = new Scene();
  private readonly camera = new PerspectiveCamera(55, 1, 0.1, 200);
  private readonly grid: GridHelper;
  private readonly cards: Card[] = [];
  private readonly calm: boolean;
  private readonly small: boolean;
  private readonly travel = 38;

  private readonly mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  private smoothProgress = 0;
  private time = 0;
  private last = performance.now();
  private raf = 0;
  private disposed = false;
  private paused = false;

  private readonly onResize = () => this.resize();
  private readonly onPointer = (e: PointerEvent) => {
    this.mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
    this.mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
  };

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly getProgress: () => number,
  ) {
    this.calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.small = window.innerWidth < 720;

    this.renderer = new WebGLRenderer({
      canvas,
      antialias: !this.small,
      alpha: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, this.small ? 1.5 : 2));

    this.scene.fog = new FogExp2(new Color(this.token('--ink')), 0.02);

    // A faint floor grid gives the scene some depth.
    this.grid = new GridHelper(220, 110, new Color(this.token('--accent')), new Color(this.token('--accent')));
    this.grid.position.set(0, -6, -35);
    const gridMaterial = this.grid.material as Material;
    gridMaterial.transparent = true;
    gridMaterial.opacity = 0.07;
    this.scene.add(this.grid);

    this.resize();
  }

  start(): void {
    window.addEventListener('resize', this.onResize);
    window.addEventListener('pointermove', this.onPointer, { passive: true });

    // Draw the windows after the code font is ready so the text uses it.
    const build = () => {
      if (!this.disposed) this.buildCards();
    };
    if (document.fonts?.load) {
      document.fonts.load('500 26px "IBM Plex Mono"').then(build, build);
    } else {
      build();
    }

    this.last = performance.now();
    this.raf = requestAnimationFrame(this.frame);
  }

  dispose(): void {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('pointermove', this.onPointer);

    for (const card of this.cards) {
      const material = card.mesh.material as MeshBasicMaterial;
      card.mesh.geometry.dispose();
      material.map?.dispose();
      material.dispose();
    }
    this.grid.geometry.dispose();
    (this.grid.material as Material).dispose();
    this.renderer.dispose();
  }

  /** Stops or restarts rendering, for example while the canvas is hidden. */
  setPaused(paused: boolean): void {
    if (this.paused === paused || this.disposed) return;
    this.paused = paused;
    if (paused) {
      cancelAnimationFrame(this.raf);
    } else {
      this.last = performance.now();
      this.raf = requestAnimationFrame(this.frame);
    }
  }

  private readonly frame = (now: number): void => {
    if (this.disposed) return;
    const dt = Math.min(0.05, (now - this.last) / 1000);
    this.last = now;
    const motion = this.calm ? 0 : 1;
    this.time += dt * motion;

    const target = this.getProgress();
    this.smoothProgress = this.calm
      ? target
      : this.smoothProgress + (target - this.smoothProgress) * (1 - Math.exp(-dt * 4));
    this.mouse.x += (this.mouse.tx - this.mouse.x) * (1 - Math.exp(-dt * 3));
    this.mouse.y += (this.mouse.ty - this.mouse.y) * (1 - Math.exp(-dt * 3));

    const camZ = 10 - this.smoothProgress * this.travel;
    this.camera.position.set(this.mouse.x * 0.9, 0.4 - this.mouse.y * 0.5, camZ);
    this.camera.lookAt(this.mouse.x * 0.6, 0.2, camZ - 14);

    for (const card of this.cards) {
      card.mesh.position.y = card.baseY + Math.sin(this.time * 0.5 + card.phase) * 0.2;
      card.mesh.rotation.y = card.baseRotY + Math.sin(this.time * 0.3 + card.phase) * 0.04;
    }

    this.renderer.render(this.scene, this.camera);
    this.raf = requestAnimationFrame(this.frame);
  };

  private resize(): void {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  private buildCards(): void {
    const narrow = window.innerWidth / window.innerHeight < 1;
    CODE_SNIPPETS.forEach((snippet, i) => {
      const [x, y, z, rotY] = CARD_LAYOUT[i];
      const mesh = new Mesh(
        new PlaneGeometry(6.4, 3.2),
        new MeshBasicMaterial({
          map: this.drawCard(snippet),
          transparent: true,
          opacity: 0.6,
          depthWrite: false,
        }),
      );
      mesh.position.set(narrow ? x * 0.55 : x, y, z);
      mesh.rotation.y = rotY;
      this.scene.add(mesh);
      this.cards.push({ mesh, baseY: y, baseRotY: rotY, phase: i * 1.3 });
    });
  }

  /** Paints one code window onto a canvas and returns it as a texture. */
  private drawCard(snippet: CodeSnippet): CanvasTexture {
    const W = 1024;
    const H = 512;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const g = canvas.getContext('2d')!;

    g.fillStyle = 'rgba(11,18,26,0.94)';
    g.fillRect(0, 0, W, H);
    g.fillStyle = 'rgba(255,255,255,0.04)';
    g.fillRect(0, 0, W, 56);
    g.strokeStyle = '#2A3C50';
    g.lineWidth = 3;
    g.strokeRect(1.5, 1.5, W - 3, H - 3);

    const accent = this.token('--accent');
    const text = this.token('--text');
    const muted = '#5F7389';
    const stringColor = '#D9B77E';

    g.textBaseline = 'middle';
    g.font = `500 24px ${MONO}`;
    g.fillStyle = accent;
    g.fillText(snippet.file, 28, 29);

    g.font = `500 26px ${MONO}`;
    const lineHeight = 38;
    const firstLineY = 56 + 38;

    snippet.lines.forEach((line, n) => {
      const y = firstLineY + n * lineHeight;
      g.fillStyle = muted;
      g.fillText(String(n + 1), 28, y);

      let x = 28 + 52;
      const put = (chunk: string, color: string) => {
        if (!chunk) return;
        g.fillStyle = color;
        g.fillText(chunk, x, y);
        x += g.measureText(chunk).width;
      };

      let lastIndex = 0;
      let match: RegExpExecArray | null;
      TOKEN_RE.lastIndex = 0;
      while ((match = TOKEN_RE.exec(line))) {
        put(line.slice(lastIndex, match.index), text);
        put(match[0], match[1] ? muted : match[2] ? stringColor : accent);
        lastIndex = TOKEN_RE.lastIndex;
      }
      put(line.slice(lastIndex), text);
    });

    const texture = new CanvasTexture(canvas);
    texture.colorSpace = SRGBColorSpace;
    texture.anisotropy = Math.min(4, this.renderer.capabilities.getMaxAnisotropy());
    return texture;
  }

  private token(name: string): string {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }
}
