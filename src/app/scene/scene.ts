import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  effect,
  inject,
  viewChild,
} from '@angular/core';
import { ScrollSpyService } from '../services/scroll-spy';
import { CodeScene } from './code-scene';

/** Index of the Experience section (0 hero, 1 experience, 2 projects, ...). */
const EXPERIENCE_INDEX = 1;

/** Fixed full-screen canvas that hosts the 3D background. It is hidden on the Experience section. */
@Component({
  selector: 'app-scene',
  template: `<canvas #canvas aria-hidden="true"></canvas>`,
  host: { '[class.off]': 'off()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Scene {
  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly spy = inject(ScrollSpyService);
  private readonly destroyRef = inject(DestroyRef);
  private scene?: CodeScene;

  protected readonly off = computed(() => this.spy.activeIndex() === EXPERIENCE_INDEX);

  constructor() {
    afterNextRender(() => {
      const el = this.canvas().nativeElement;
      try {
        this.scene = new CodeScene(el, () => this.spy.progress());
        this.scene.start();
        this.scene.setPaused(this.off());
      } catch {
        // No WebGL: hide the canvas, the rest of the page works as normal.
        el.style.display = 'none';
      }
      this.destroyRef.onDestroy(() => this.scene?.dispose());
    });

    // Stop rendering while the background is hidden.
    effect(() => this.scene?.setPaused(this.off()));
  }
}
