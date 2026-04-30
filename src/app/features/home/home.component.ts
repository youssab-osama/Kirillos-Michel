import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ParticlesBgComponent } from '../../shared/components/particles-bg/particles-bg.component';

@Component({
  selector: 'app-home',
  imports: [NgOptimizedImage, ParticlesBgComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
