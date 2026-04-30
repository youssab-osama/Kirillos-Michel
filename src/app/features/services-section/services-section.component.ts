import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';

@Component({
  selector: 'app-services-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './services-section.component.html',
  styleUrl: './services-section.component.css',
})
export class ServicesSectionComponent {
  protected readonly data = inject(PortfolioDataService);
  protected readonly services = this.data.services;
}
