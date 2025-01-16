import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarterritorioComponent } from './cargarterritorio.component';

describe('CargarterritorioComponent', () => {
  let component: CargarterritorioComponent;
  let fixture: ComponentFixture<CargarterritorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargarterritorioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargarterritorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
