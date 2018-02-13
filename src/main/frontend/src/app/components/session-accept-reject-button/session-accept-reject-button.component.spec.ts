import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionAcceptRejectButtonComponent } from './session-accept-reject-button.component';

describe('SessionAcceptRejectButtonComponent', () => {
  let component: SessionAcceptRejectButtonComponent;
  let fixture: ComponentFixture<SessionAcceptRejectButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionAcceptRejectButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionAcceptRejectButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
