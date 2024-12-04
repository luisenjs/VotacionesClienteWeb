import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlelectoralComponent } from './controlelectoral.component';

describe('ControlelectoralComponent', () => {
  let component: ControlelectoralComponent;
  let fixture: ComponentFixture<ControlelectoralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlelectoralComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlelectoralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
