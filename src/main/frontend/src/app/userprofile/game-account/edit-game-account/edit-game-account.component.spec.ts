import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGameAccountComponent } from './edit-game-account.component';

describe('EditGameAccountComponent', () => {
  let component: EditGameAccountComponent;
  let fixture: ComponentFixture<EditGameAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditGameAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGameAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
