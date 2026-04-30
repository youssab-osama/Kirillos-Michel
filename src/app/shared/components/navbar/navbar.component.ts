import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
  computed,
  OnInit,
} from '@angular/core';
import { ScrollService } from '../../../core/services/scroll.service';
import { PortfolioDataService } from '../../../core/services/portfolio-data.service';
import { OverlayMenuComponent } from '../overlay-menu/overlay-menu.component';

@Component({
  selector: 'app-navbar',
  imports: [OverlayMenuComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  private readonly scrollService = inject(ScrollService);
  private readonly portfolioData = inject(PortfolioDataService);

  protected readonly navVisible = this.scrollService.navVisible;
  protected readonly navItems = this.portfolioData.navItems;
  protected readonly menuOpen = signal(false);

  protected readonly scrolled = computed(() => this.scrollService.scrollY() > 50);

  ngOnInit(): void {
    this.scrollService.init();
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  protected scrollTo(anchor: string): void {
    this.scrollService.scrollTo(anchor);
    this.menuOpen.set(false);
  }
}
