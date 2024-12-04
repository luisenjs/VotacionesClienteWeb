import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DignidadesConsultasComponent } from './dignidades-consultas.component';

describe('DignidadesConsultasComponent', () => {
  let component: DignidadesConsultasComponent;
  let fixture: ComponentFixture<DignidadesConsultasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DignidadesConsultasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DignidadesConsultasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
