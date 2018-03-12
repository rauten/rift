import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KickRifteeButtonComponent } from './kick-riftee-button.component';

describe('KickRifteeButtonComponent', () => {
  let component: KickRifteeButtonComponent;
  let fixture: ComponentFixture<KickRifteeButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KickRifteeButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KickRifteeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
