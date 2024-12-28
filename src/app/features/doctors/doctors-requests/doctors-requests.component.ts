import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DoctorsService } from '@services/doctors.service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-doctors-requests',
  standalone: true,
  imports: [CardModule, ButtonModule, CommonModule, TooltipModule],
  templateUrl: './doctors-requests.component.html',
  styleUrl: './doctors-requests.component.css',
})
export class DoctorsRequestsComponent implements OnInit {
  loading: boolean = false;
  tooltipOptions = {
    showDelay: 150,
    autoHide: false,
    tooltipEvent: 'hover',
    tooltipPosition: 'left',
  };

  constructor(
    private doctorService: DoctorsService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  onSubmit(status: string) {
    console.log(status);
    if (status === '') return;
    this.loading = true;
    console.log(status);

    // this.doctorService.updateDoctorRequests({ status: status }).subscribe({
    //   next: (res) => {
    //     this.loading = false;
    //     this.messageService.add({
    //       severity: 'success',
    //       summary: 'Success',
    //       detail: 'Request updated successful',
    //     });
    //   },
    //   error: (err) => {
    //     this.loading = false;
    //     this.messageService.add({
    //       severity: 'error',
    //       summary: 'Error',
    //       detail: 'Oops.. something went wrong',
    //     });
    //   },
    // });
  }
}
