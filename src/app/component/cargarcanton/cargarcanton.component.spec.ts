import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarcantonComponent } from './cargarcanton.component';

describe('CargarcantonComponent', () => {
  let component: CargarcantonComponent;
  let fixture: ComponentFixture<CargarcantonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargarcantonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargarcantonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
