import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  signal,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);

  protected readonly loadProgress = signal(0);
  protected readonly currentYear = new Date().getFullYear();
  private intervalId?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.startLoadingBar();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  private startLoadingBar(): void {
    this.intervalId = setInterval(() => {
      this.loadProgress.update((v) => {
        if (v >= 100) return 0;
        return v + 1;
      });
    }, 60);
  }
}
