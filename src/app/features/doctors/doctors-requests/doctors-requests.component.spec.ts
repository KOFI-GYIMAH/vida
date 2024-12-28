import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsRequestsComponent } from './doctors-requests.component';

describe('DoctorsRequestsComponent', () => {
  let component: DoctorsRequestsComponent;
  let fixture: ComponentFixture<DoctorsRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorsRequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorsRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
