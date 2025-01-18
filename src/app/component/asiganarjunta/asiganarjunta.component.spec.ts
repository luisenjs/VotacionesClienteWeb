import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsiganarjuntaComponent } from './asiganarjunta.component';

describe('AsiganarjuntaComponent', () => {
  let component: AsiganarjuntaComponent;
  let fixture: ComponentFixture<AsiganarjuntaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsiganarjuntaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsiganarjuntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
