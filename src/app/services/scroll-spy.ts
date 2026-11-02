import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';

/**
 * Tracks scrolling for the whole page:
 * - `activeIndex` is the section nearest the middle of the screen (drives the side nav).
 * - `progress()` is the scroll position from 0 to 1 (drives the 3D camera).
 * Sections are any elements marked with `data-node`.
 */
@Injectable({ providedIn: 'root' })
export class ScrollSpyService {
  private readonly doc = inject(DOCUMENT);

  readonly activeIndex = signal(0);

  private centers: number[] = [];
  private cleanups: Array<() => void> = [];

  start(): void {
    const win = this.doc.defaultView;
    if (!win || this.cleanups.length > 0) return;

    const refresh = () => {
      this.measure(win);
      this.update(win);
    };
    const onScroll = () => this.update(win);

    win.addEventListener('scroll', onScroll, { passive: true });
    win.addEventListener('resize', refresh);
    win.addEventListener('load', refresh);
    this.cleanups.push(() => {
      win.removeEventListener('scroll', onScroll);
      win.removeEventListener('resize', refresh);
      win.removeEventListener('load', refresh);
    });

    // Web fonts change the page height, so measure again once they are ready.
    this.doc.fonts?.ready.then(refresh);

    const main = this.doc.querySelector('main');
    if (main && typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver(refresh);
      observer.observe(main);
      this.cleanups.push(() => observer.disconnect());
    }

    refresh();
  }

  stop(): void {
    this.cleanups.forEach((fn) => fn());
    this.cleanups = [];
  }

  /** Scroll position as a number from 0 (top) to 1 (bottom). */
  progress(): number {
    const win = this.doc.defaultView;
    if (!win) return 0;
    const max = this.doc.documentElement.scrollHeight - win.innerHeight;
    if (max <= 0) return 0;
    return Math.min(1, Math.max(0, win.scrollY / max));
  }

  private measure(win: Window): void {
    this.centers = Array.from(this.doc.querySelectorAll<HTMLElement>('[data-node]')).map((el) => {
      const rect = el.getBoundingClientRect();
      return rect.top + win.scrollY + rect.height / 2;
    });
  }

  private update(win: Window): void {
    const y = win.scrollY + win.innerHeight * 0.5;
    let best = 0;
    let bestDistance = Infinity;
    this.centers.forEach((center, i) => {
      const distance = Math.abs(center - y);
      if (distance < bestDistance) {
        bestDistance = distance;
        best = i;
      }
    });
    if (best !== this.activeIndex()) this.activeIndex.set(best);
  }
}
