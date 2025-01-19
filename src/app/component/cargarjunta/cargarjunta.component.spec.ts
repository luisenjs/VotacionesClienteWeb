import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarjuntaComponent } from './cargarjunta.component';

describe('CargarjuntaComponent', () => {
  let component: CargarjuntaComponent;
  let fixture: ComponentFixture<CargarjuntaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargarjuntaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargarjuntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
