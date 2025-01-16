import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarparroquiaComponent } from './cargarparroquia.component';

describe('CargarparroquiaComponent', () => {
  let component: CargarparroquiaComponent;
  let fixture: ComponentFixture<CargarparroquiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargarparroquiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargarparroquiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
