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
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
