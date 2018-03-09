import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileAComplaintComponent } from './file-a-complaint.component';

describe('FileAComplaintComponent', () => {
  let component: FileAComplaintComponent;
  let fixture: ComponentFixture<FileAComplaintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileAComplaintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileAComplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
