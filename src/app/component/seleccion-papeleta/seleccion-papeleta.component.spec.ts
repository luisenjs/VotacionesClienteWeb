import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionPapeletaComponent } from './seleccion-papeleta.component';

describe('SeleccionPapeletaComponent', () => {
  let component: SeleccionPapeletaComponent;
  let fixture: ComponentFixture<SeleccionPapeletaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeleccionPapeletaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionPapeletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
