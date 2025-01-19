import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarconsultaComponent } from './agregarconsulta.component';

describe('AgregarconsultaComponent', () => {
  let component: AgregarconsultaComponent;
  let fixture: ComponentFixture<AgregarconsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarconsultaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarconsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
