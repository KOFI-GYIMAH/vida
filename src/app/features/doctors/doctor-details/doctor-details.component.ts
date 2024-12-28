import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import type { DoctorRecord } from '@shared/models';
import { calculateAge } from '@utils/date.utils';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-doctor-details',
  standalone: true,
  imports: [SidebarModule, CommonModule],
  templateUrl: './doctor-details.component.html',
  styleUrl: './doctor-details.component.css',
})
export class DoctorDetailsComponent {
  @Input() doctor!: DoctorRecord;
  @Input() sidebarVisible: boolean = false;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  calculateAge = calculateAge;
}
