import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarElementoComponent } from './agregar-elemento.component';

describe('AgregarElementoComponent', () => {
  let component: AgregarElementoComponent;
  let fixture: ComponentFixture<AgregarElementoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarElementoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarElementoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
