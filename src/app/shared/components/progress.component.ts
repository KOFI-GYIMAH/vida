import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="w-full bg-gray-200 rounded-full h-4">
      <div
        class="h-4 rounded-full transition-all duration-300 ease-in-out text-center text-white text-xs font-medium p-0.5"
        [ngClass]="getProgressColor()"
        [style.width.%]="clampedProgress"
      >
        {{ clampedProgress }}%
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }
    `,
  ],
})
export class ProgressBarComponent {
  @Input() progress: number = 0;

  get clampedProgress(): number {
    return Math.min(Math.max(this.progress, 0), 100);
  }

  getProgressColor(): string {
    if (this.clampedProgress <= 60) {
      return 'bg-red-500';
    }
    if (this.clampedProgress <= 90) {
      return 'bg-blue-500';
    }
    return 'bg-green-500';
  }
}
