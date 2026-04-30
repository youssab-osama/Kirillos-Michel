import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { HomeComponent } from './features/home/home.component';
import { AboutComponent } from './features/about/about.component';
import { ServicesSectionComponent } from './features/services-section/services-section.component';
import { SkillsComponent } from './features/skills/skills.component';
import { ExperienceComponent } from './features/experience/experience.component';
import { ProjectsComponent } from './features/projects/projects.component';
import { ContactComponent } from './features/contact/contact.component';
import { CursorSpotlightComponent } from './shared/components/cursor-spotlight/cursor-spotlight.component';

@Component({
  selector: 'app-root',
  imports: [
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    ServicesSectionComponent,
    SkillsComponent,
    ExperienceComponent,
    ProjectsComponent,
    ContactComponent,
    CursorSpotlightComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
