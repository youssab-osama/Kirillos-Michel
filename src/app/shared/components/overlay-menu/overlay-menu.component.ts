import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  effect,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import type { NavItem } from '../../../core/models/portfolio.model';

@Component({
  selector: 'app-overlay-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './overlay-menu.component.html',
  styleUrl: './overlay-menu.component.css',
})
export class OverlayMenuComponent {
  private readonly platformId = inject(PLATFORM_ID);

  readonly isOpen = input.required<boolean>();
  readonly navItems = input.required<NavItem[]>();
  readonly closeMenu = output<void>();
  readonly navigateTo = output<string>();

  constructor() {
    effect(() => {
      if (!isPlatformBrowser(this.platformId)) return;
      document.body.style.overflow = this.isOpen() ? 'hidden' : '';
    });
  }

  protected onClose(): void {
    this.closeMenu.emit();
  }

  protected onNavigate(anchor: string): void {
    this.navigateTo.emit(anchor);
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeMenu.emit();
    }
  }
}
