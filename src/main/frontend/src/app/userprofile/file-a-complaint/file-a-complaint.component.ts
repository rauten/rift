import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-a-complaint',
  templateUrl: './file-a-complaint.component.html',
  styleUrls: ['./file-a-complaint.component.scss']
})
export class FileAComplaintComponent implements OnInit {
  title = "Leave a Complaint";
  complaintContent: string = "";

  constructor() { }

  ngOnInit() {
  }

}
