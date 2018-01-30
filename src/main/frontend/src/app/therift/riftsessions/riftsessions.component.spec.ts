import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiftsessionsComponent } from './riftsessions.component';

describe('RiftsessionsComponent', () => {
  let component: RiftsessionsComponent;
  let fixture: ComponentFixture<RiftsessionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiftsessionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiftsessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
