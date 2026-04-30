import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { fromEvent } from 'rxjs';
import { throttleTime, distinctUntilChanged, map } from 'rxjs/operators';

export type ScrollDirection = 'up' | 'down' | 'none';

@Injectable({ providedIn: 'root' })
export class ScrollService {
  private readonly platformId = inject(PLATFORM_ID);

  readonly direction = signal<ScrollDirection>('none');
  readonly scrollY = signal(0);
  readonly navVisible = signal(true);

  private lastScrollY = 0;

  init(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    fromEvent(window, 'scroll')
      .pipe(
        throttleTime(50),
        map(() => window.scrollY),
        distinctUntilChanged()
      )
      .subscribe((y) => {
        const delta = y - this.lastScrollY;
        this.scrollY.set(y);

        if (Math.abs(delta) > 5) {
          if (delta > 0) {
            this.direction.set('down');
            this.navVisible.set(y < 100); // Always show near top
          } else {
            this.direction.set('up');
            this.navVisible.set(true);
          }
        }

        this.lastScrollY = y;
      });
  }

  scrollTo(sectionId: string): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const el = document.getElementById(sectionId);
    if (!el) return;

    const navbarHeight = 80;
    const targetY = el.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

    this.smoothScrollTo(targetY, 700);
  }

  private smoothScrollTo(targetY: number, duration: number): void {
    const startY = window.pageYOffset;
    const distanceY = targetY - startY;
    const startTime = performance.now();

    const easeInOutCubic = (t: number): number =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const step = (currentTime: number): void => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);

      window.scrollTo(0, startY + distanceY * easedProgress);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }
}

