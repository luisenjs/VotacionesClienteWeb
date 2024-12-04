import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverycodeComponent } from './recoverycode.component';

describe('RecoverycodeComponent', () => {
  let component: RecoverycodeComponent;
  let fixture: ComponentFixture<RecoverycodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecoverycodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecoverycodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
