import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalvotosComponent } from './totalvotos.component';

describe('TotalvotosComponent', () => {
  let component: TotalvotosComponent;
  let fixture: ComponentFixture<TotalvotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalvotosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalvotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
