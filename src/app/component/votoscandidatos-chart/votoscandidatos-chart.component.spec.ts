import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotoscandidatosChartComponent } from './votoscandidatos-chart.component';

describe('VotoscandidatosChartComponent', () => {
  let component: VotoscandidatosChartComponent;
  let fixture: ComponentFixture<VotoscandidatosChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VotoscandidatosChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VotoscandidatosChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
