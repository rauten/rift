import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameAccountCardComponent } from './game-account-card.component';

describe('GameAccountCardComponent', () => {
  let component: GameAccountCardComponent;
  let fixture: ComponentFixture<GameAccountCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameAccountCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameAccountCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
