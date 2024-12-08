import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPapeletaComponent } from './crear-papeleta.component';

describe('CrearPapeletaComponent', () => {
  let component: CrearPapeletaComponent;
  let fixture: ComponentFixture<CrearPapeletaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearPapeletaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearPapeletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
