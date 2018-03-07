import { Component, OnInit, Input, Inject } from '@angular/core';
import {Userprofile} from "../../models/userprofile";
import {UpdateInfoService} from "./data/update-info.service";
import {UserprofileService} from "../userprofile.service";
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material";

@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.component.html',
  styleUrls: ['./update-info.component.scss']
})
export class UpdateInfoComponent implements OnInit {
  title = "Update your Profile Information";
  currentUser: Userprofile = new Userprofile();
  loggedInUser: Userprofile = new Userprofile();
  profile: any;
  @Input() updateInfoData;
  profilePic: any;
  coverPhoto: any;

  //noinspection JSAnnotator
  constructor(private updateInfoService: UpdateInfoService, private userProfileService: UserprofileService,
              private dialogRef: MatDialogRef<UpdateInfoComponent>, @Inject(MAT_DIALOG_DATA) public data) {
    this.profile = JSON.parse(localStorage.getItem('profile'));
  }

  ngOnInit() {
    this.getCurrentLoggedInUser();
    this.currentUser = this.updateInfoService.getUserData();
    this.updateInfoData = this.updateInfoService.getFormData();
    console.log("Current user info loaded to Update Profile");
  }

  getCurrentLoggedInUser() {
    this.userProfileService.getUser(this.profile.nickname).subscribe(
      resBody => {
        this.loggedInUser.firstName = resBody.firstName;
        this.loggedInUser.lastName = resBody.lastName;
        this.loggedInUser.riftTag = resBody.riftTag;
        this.loggedInUser.id = resBody.id;
      }
    )
  }

  uploadProfilePic() {
    let base64 = this.profilePic;
    let riftTag = this.loggedInUser.riftTag;
    this.userProfileService.uploadProfilePicture(riftTag, base64);
  }

  uploadCoverPhoto() {
    let base64 = this.profilePic;
    let riftTag = this.loggedInUser.riftTag;
    this.userProfileService.uploadCoverPhoto(riftTag, base64);
  }

  save() {
    this.updateInfoService.setUserData(this.currentUser);
    let data = {
      "firstName" : this.updateInfoData.firstName,
      "lastName" : this.updateInfoData.lastName,
      "riftTag" : this.updateInfoData.riftTag,
      "id" : this.loggedInUser.id,
      "bio" : this.updateInfoData.bio,
      "email": this.updateInfoData.email
    };
    let auth0data = {
      'firstName': this.updateInfoData.firstName,
      'lastName':this.updateInfoData.lastName,
      'riftTag': this.updateInfoData.riftTag,
      'email':this.updateInfoData.email
    };
    this.updateInfoService.updateUser(data);
    this.updateInfoService.updateAuth0User(auth0data, this.profile.sub);
    if(this.profilePic) {
      this.uploadProfilePic();
    }
    if(this.coverPhoto) {
      this.uploadCoverPhoto();
    }

    window.location.reload();
  }

  cancel(): void {
    //noinspection TypeScriptUnresolvedFunction
    this.dialogRef.close();
  }
}
