import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalBankAccountInfoComponent } from './legal-bank-account-info.component';

describe('LegalBankAccountInfoComponent', () => {
  let component: LegalBankAccountInfoComponent;
  let fixture: ComponentFixture<LegalBankAccountInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegalBankAccountInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalBankAccountInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
