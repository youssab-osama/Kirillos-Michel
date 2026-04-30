import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';

@Component({
  selector: 'app-experience',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css',
})
export class ExperienceComponent {
  protected readonly data = inject(PortfolioDataService);
  protected readonly experiences = this.data.experiences;
}
