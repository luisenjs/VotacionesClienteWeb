import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviousuarioComponent } from './enviousuario.component';

describe('EnviousuarioComponent', () => {
  let component: EnviousuarioComponent;
  let fixture: ComponentFixture<EnviousuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnviousuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnviousuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
