import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TheriftComponent } from './therift.component';

describe('TheriftComponent', () => {
  let component: TheriftComponent;
  let fixture: ComponentFixture<TheriftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheriftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheriftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
