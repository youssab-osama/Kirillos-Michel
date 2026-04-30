import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  viewChild,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-matrix-rain',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<canvas #canvas class="matrix-canvas" aria-hidden="true"></canvas>`,
  styleUrl: './matrix-rain.component.css',
})
export class MatrixRainComponent implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  private animationId = 0;
  private resizeObserver?: ResizeObserver;
  private drops: number[] = [];
  private ctx!: CanvasRenderingContext2D;
  private w = 0;
  private h = 0;
  private readonly fontSize = 14;
  private readonly chars = '0123456789ABCDEF<>{}[]|\\/*&^%$#!?@';
  private readonly commands = [
    'cd', 'pwd', 'echo', 'cat', 'sudo', 'ls', 'whoami', 'ssh', 'curl', 'grep',
    'grep', 'nmap', 'chmod', 'chown', 'rm -rf', 'ping', 'top', 'exit'
  ];

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const canvas = this.canvasRef().nativeElement;
    this.ctx = canvas.getContext('2d', { alpha: false })!;
    this.resize(canvas);
    this.initDrops();
    this.animate();

    this.resizeObserver = new ResizeObserver(() => {
      this.resize(canvas);
      this.initDrops();
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

  private initDrops(): void {
    const cols = Math.floor(this.w / this.fontSize);
    this.drops = Array.from({ length: cols }, () =>
      Math.floor(Math.random() * -(this.h / this.fontSize))
    );
  }

  private animate(): void {
    // Fading trail
    this.ctx.fillStyle = 'rgba(4, 4, 8, 0.1)';
    this.ctx.fillRect(0, 0, this.w, this.h);

    this.ctx.font = `${this.fontSize}px 'JetBrains Mono', monospace`;

    for (let i = 0; i < this.drops.length; i++) {
      // Decide whether to show a command or a character
      const isCommand = Math.random() > 0.98;
      const char = isCommand 
        ? this.commands[Math.floor(Math.random() * this.commands.length)]
        : this.chars[Math.floor(Math.random() * this.chars.length)];
        
      const y = this.drops[i] * this.fontSize;

      // Bright leading character/command
      if (this.drops[i] > 0) {
        // Leading edge
        this.ctx.fillStyle = 'rgba(124, 58, 237, 1)';
        this.ctx.fillText(char, i * this.fontSize, y);
        
        // Trail characters
        this.ctx.fillStyle = 'rgba(34, 211, 238, 0.35)';
        const trailChar = this.chars[Math.floor(Math.random() * this.chars.length)];
        this.ctx.fillText(trailChar, i * this.fontSize, y - this.fontSize);
      }

      // Reset when column reaches bottom
      if (y > this.h && Math.random() > 0.975) {
        this.drops[i] = 0;
      }
      this.drops[i]++;
    }

    this.animationId = requestAnimationFrame(() => this.animate());
  }
}
