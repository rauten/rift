import { Component, OnInit, Input } from '@angular/core';
import {Userprofile} from "../models/userprofile";
import {UpdateInfoService} from "./data/update-info.service";

@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.component.html',
  styleUrls: ['./update-info.component.scss']
})
export class UpdateInfoComponent implements OnInit {
  title = "Update your Profile Information";
  currentUser: Userprofile;
  @Input() updateInfoData;

  constructor(private updateInfoService: UpdateInfoService) {
  }

  ngOnInit() {
    this.currentUser = this.updateInfoService.getUserData();
    this.updateInfoData = this.updateInfoService.getFormData();
    console.log("Current user info loaded to Update Profile");
  }


  save() {
    this.updateInfoService.setUserData(this.currentUser);
  }
}
