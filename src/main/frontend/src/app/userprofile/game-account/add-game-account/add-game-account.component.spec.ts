import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGameAccountComponent } from './add-game-account.component';

describe('AddGameAccountComponent', () => {
  let component: AddGameAccountComponent;
  let fixture: ComponentFixture<AddGameAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGameAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGameAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
