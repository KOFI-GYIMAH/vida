import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="overflow-hidden rounded-lg shadow-sm border border-gray-200">
      @if (hasHeader) {
      <div class="bg-gray-50 border-b border-gray-200">
        <div class="grid gap-4 p-4" [style.grid-template-columns]="gridColumns">
          @for (col of columnArray(); track $index) {
          <div class="h-6 bg-gray-200 rounded skeleton-animation"></div>
          }
        </div>
      </div>
      }

      <div class="bg-white divide-y divide-gray-200">
        @for (row of rowArray(); track row; let rowIndex = $index) {
        <div class="grid gap-4 p-4" [style.grid-template-columns]="gridColumns">
          @for (col of columnArray(); track col; let colIndex = $index) {
          <div
            class="skeleton-animation"
            [ngClass]="{
              'h-4 bg-gray-100 rounded': true,
              'w-1/2': colIndex === 0,
              'w-full': colIndex !== 0,
              'animation-delay-1': (rowIndex + colIndex) % 3 === 1,
              'animation-delay-2': (rowIndex + colIndex) % 3 === 2
            }"
          ></div>
          }
        </div>
        }
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .skeleton-animation {
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }

      .animation-delay-1 {
        animation-delay: 0.2s;
      }

      .animation-delay-2 {
        animation-delay: 0.4s;
      }

      @keyframes pulse {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0.5;
        }
      }

      .w-1/2 {
        width: 50%;
      }

      .w-full {
        width: 100%;
      }
    `,
  ],
})
export class TableSkeletonComponent implements OnInit {
  @Input() rows: number = 5;
  @Input() columns: number = 4;
  @Input() hasHeader: boolean = true;
  @Input() columnWidths: string[] = [];

  private _rowArray: number[] = [];
  private _columnArray: number[] = [];

  ngOnInit() {
    this.updateArrays();
  }

  ngOnChanges() {
    this.updateArrays();
  }

  private updateArrays() {
    this._rowArray = Array(this.rows)
      .fill(0)
      .map((_, i) => i);
    this._columnArray = Array(this.columns)
      .fill(0)
      .map((_, i) => i);
  }

  rowArray() {
    return this._rowArray;
  }

  columnArray() {
    return this._columnArray;
  }

  get gridColumns(): string {
    if (this.columnWidths.length === this.columns) {
      return this.columnWidths.join(' ');
    }
    return `repeat(${this.columns}, 1fr)`;
  }
}
