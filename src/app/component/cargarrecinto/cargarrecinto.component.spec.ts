import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarrecintoComponent } from './cargarrecinto.component';

describe('CargarrecintoComponent', () => {
  let component: CargarrecintoComponent;
  let fixture: ComponentFixture<CargarrecintoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargarrecintoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargarrecintoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
