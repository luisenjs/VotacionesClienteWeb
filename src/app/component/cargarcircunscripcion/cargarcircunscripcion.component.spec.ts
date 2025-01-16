import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarcircunscripcionComponent } from './cargarcircunscripcion.component';

describe('CargarcircunscripcionComponent', () => {
  let component: CargarcircunscripcionComponent;
  let fixture: ComponentFixture<CargarcircunscripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargarcircunscripcionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargarcircunscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
