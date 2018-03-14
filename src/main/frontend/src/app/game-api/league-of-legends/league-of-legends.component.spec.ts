import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueOfLegendsComponent } from './league-of-legends.component';

describe('LeagueOfLegendsComponent', () => {
  let component: LeagueOfLegendsComponent;
  let fixture: ComponentFixture<LeagueOfLegendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeagueOfLegendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeagueOfLegendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
