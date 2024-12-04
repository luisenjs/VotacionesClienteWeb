import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PapeletasComponent } from './papeletas.component';

describe('PapeletasComponent', () => {
  let component: PapeletasComponent;
  let fixture: ComponentFixture<PapeletasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PapeletasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PapeletasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
