import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregardignidadComponent } from './agregardignidad.component';

describe('AgregardignidadComponent', () => {
  let component: AgregardignidadComponent;
  let fixture: ComponentFixture<AgregardignidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregardignidadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregardignidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
