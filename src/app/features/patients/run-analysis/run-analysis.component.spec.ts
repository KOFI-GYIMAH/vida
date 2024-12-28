import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunAnalysisComponent } from './run-analysis.component';

describe('RunAnalysisComponent', () => {
  let component: RunAnalysisComponent;
  let fixture: ComponentFixture<RunAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RunAnalysisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RunAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
