import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObrazecComponent } from './obrazec.component';

describe('ObrazecComponent', () => {
  let component: ObrazecComponent;
  let fixture: ComponentFixture<ObrazecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObrazecComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObrazecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
