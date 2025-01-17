import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarterritorioComponent } from './modificarterritorio.component';

describe('ModificarterritorioComponent', () => {
  let component: ModificarterritorioComponent;
  let fixture: ComponentFixture<ModificarterritorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarterritorioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarterritorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
