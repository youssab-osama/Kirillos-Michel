import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';

@Component({
  selector: 'app-projects',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent {
  protected readonly data = inject(PortfolioDataService);
  protected readonly projects = this.data.projects;
  protected readonly activeProject = this.data.activeProject;
  protected readonly activeId = this.data.activeProjectId;

  protected selectProject(id: number): void {
    this.data.setActiveProject(id);
  }
}
