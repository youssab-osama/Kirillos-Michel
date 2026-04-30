import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { MatrixRainComponent } from '../../shared/components/matrix-rain/matrix-rain.component';

@Component({
  selector: 'app-skills',
  imports: [MatrixRainComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css',
})
export class SkillsComponent {
  protected readonly data = inject(PortfolioDataService);
  protected readonly skillGroups = this.data.skillGroups;
}
