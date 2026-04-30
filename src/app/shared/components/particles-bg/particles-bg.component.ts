import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  OnInit,
  OnDestroy,
  viewChild,
  inject,
  PLATFORM_ID,
  AfterViewInit,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-particles-bg',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<canvas #canvas class="particles-canvas" aria-hidden="true"></canvas>`,
  styleUrl: './particles-bg.component.css',
})
export class ParticlesBgComponent implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  private animationId = 0;
  private resizeObserver?: ResizeObserver;

  private particles: Particle[] = [];
  private ctx!: CanvasRenderingContext2D;
  private w = 0;
  private h = 0;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const canvas = this.canvasRef().nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.resize(canvas);
    this.initParticles();
    this.animate();

    this.resizeObserver = new ResizeObserver(() => {
      this.resize(canvas);
      this.initParticles();
    });
    this.resizeObserver.observe(canvas.parentElement!);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);
    this.resizeObserver?.disconnect();
  }

  private resize(canvas: HTMLCanvasElement): void {
    const parent = canvas.parentElement!;
    this.w = canvas.width = parent.offsetWidth;
    this.h = canvas.height = parent.offsetHeight;
  }

  private initParticles(): void {
    const count = Math.floor((this.w * this.h) / 15000);
    this.particles = Array.from({ length: Math.min(count, 80) }, () =>
      this.createParticle()
    );
  }

  private createParticle(): Particle {
    return {
      x: Math.random() * this.w,
      y: Math.random() * this.h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.2,
      color: Math.random() > 0.6 ? '#7c3aed' : Math.random() > 0.5 ? '#22d3ee' : '#94a3b8',
    };
  }

  private animate(): void {
    this.ctx.clearRect(0, 0, this.w, this.h);

    // Draw connections
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(124, 58, 237, ${0.15 * (1 - dist / 120)})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    }

    // Draw particles
    for (const p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > this.w) p.vx *= -1;
      if (p.y < 0 || p.y > this.h) p.vy *= -1;

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = p.alpha;
      this.ctx.fill();
      this.ctx.globalAlpha = 1;
    }

    this.animationId = requestAnimationFrame(() => this.animate());
  }
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
  color: string;
}
