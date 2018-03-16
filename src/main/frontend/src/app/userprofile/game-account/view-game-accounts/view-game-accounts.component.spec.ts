import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGameAccountsComponent } from './view-game-accounts.component';

describe('ViewGameAccountsComponent', () => {
  let component: ViewGameAccountsComponent;
  let fixture: ComponentFixture<ViewGameAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewGameAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGameAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
