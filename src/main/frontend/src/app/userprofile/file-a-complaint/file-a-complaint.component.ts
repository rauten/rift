import {Component, Inject, Input, OnInit} from '@angular/core';
import {COMPLAINT_TYPE} from "../../constants/complaint-type";
import {FileAComplaintService} from "./data/file-a-complaint-service";
import {MAT_DIALOG_DATA} from "@angular/material";

@Component({
  selector: 'app-file-a-complaint',
  templateUrl: './file-a-complaint.component.html',
  styleUrls: ['./file-a-complaint.component.scss']
})
export class FileAComplaintComponent implements OnInit {
  title = "Leave a Complaint";
  complaintContent: string = "";
  complaintType: string= "";
  complaintTypes = COMPLAINT_TYPE;
  @Input() submitterId;
  @Input() riftId;

  constructor(private complaintService: FileAComplaintService, @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
  }

  save() {
    let complaintData = {
      "complaint": this.complaintContent,
      "type": this.complaintType
    };
    console.log(complaintData);
    console.log("Submitter ID: " + this.data.submitterId);
    console.log("Rift ID: " + this.data.riftId);

    // this.fileAComplaint(data);
  }

  fileAComplaint(data) {
    this.complaintService.fileAComplaint(this.submitterId, this.riftId, data);
  }

}
