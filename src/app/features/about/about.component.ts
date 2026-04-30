import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  protected readonly softSkills = [
    'Problem Solving',
    'Analytical Thinking',
    'Self-Learning',
    'Persistence',
    'Leadership',
    'Teamwork',
    'Communication',
    'Growth-Driven',
  ];
}
