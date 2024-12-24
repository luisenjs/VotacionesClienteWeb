import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotostotalesChartComponent } from './votostotales-chart.component';

describe('VotostotalesChartComponent', () => {
  let component: VotostotalesChartComponent;
  let fixture: ComponentFixture<VotostotalesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VotostotalesChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VotostotalesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
