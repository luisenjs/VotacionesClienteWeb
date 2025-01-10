import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerpapeletaComponent } from './verpapeleta.component';

describe('VerpapeletaComponent', () => {
  let component: VerpapeletaComponent;
  let fixture: ComponentFixture<VerpapeletaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerpapeletaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerpapeletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
