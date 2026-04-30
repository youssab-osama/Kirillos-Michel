import {
  Component,
  ChangeDetectionStrategy,
  signal,
  inject,
  PLATFORM_ID,
  HostListener,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-cursor-spotlight',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="spotlight"
      [style.transform]="'translate(' + x() + 'px, ' + y() + 'px)'"
      aria-hidden="true"
    ></div>
  `,
  styles: `
    .spotlight {
      position: fixed;
      top: -100px;
      left: -100px;
      width: 200px;
      height: 200px;
      border-radius: 50%;
      background: radial-gradient(
        circle at center,
        rgba(124, 58, 237, 0.2) 0%,
        rgba(124, 58, 237, 0.15) 30%,
        rgba(239, 68, 68, 0.2) 60%,
        transparent 70%
      );
      pointer-events: none;
      z-index: 9999;
      mix-blend-mode: screen;
      filter: blur(50px);
      transition: transform 0.1s ease-out;
      will-change: transform;
    }
  `
})
export class CursorSpotlightComponent {
  private readonly platformId = inject(PLATFORM_ID);
  protected readonly x = signal(-500);
  protected readonly y = signal(-500);

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.x.set(event.clientX);
    this.y.set(event.clientY);
  }
}
