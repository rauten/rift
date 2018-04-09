import { Component, OnInit, Input, Inject } from '@angular/core';
import {Userprofile} from "../../models/userprofile";
import {UpdateInfoService} from "./data/update-info.service";
import {UserprofileService} from "../userprofile.service";
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from "@angular/material";
import {AddGameAccountComponent} from "../game-account/add-game-account/add-game-account.component";

@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.component.html',
  styleUrls: ['./update-info.component.scss']
})
export class UpdateInfoComponent implements OnInit {
  title = "Update your Profile Information";
  currentUser: Userprofile = new Userprofile();
  profile: any;
  @Input() updateInfoData;
  profilePic: any;
  coverPhoto: any;

  //noinspection JSAnnotator
  constructor(private updateInfoService: UpdateInfoService, private userProfileService: UserprofileService,
              private dialogRef: MatDialogRef<UpdateInfoComponent>, @Inject(MAT_DIALOG_DATA) public data,
              public dialog: MatDialog) {
    this.profile = JSON.parse(localStorage.getItem('profile'));
  }

  ngOnInit() {
    this.currentUser = this.updateInfoService.getUserData();
    this.updateInfoData = this.updateInfoService.getFormData();
    console.log("Current user info loaded to Update Profile");
  }

  uploadProfilePic() {
    let base64 = this.profilePic;
    let riftTag = this.data.loggedInUser.riftTag;
    this.userProfileService.uploadProfilePicture(riftTag, base64);
  }

  uploadCoverPhoto() {
    let base64 = this.profilePic;
    let riftTag = this.data.loggedInUser.riftTag;
    this.userProfileService.uploadCoverPhoto(riftTag, base64);
  }

  save() {
    this.updateInfoService.setUserData(this.currentUser);
    let data = {
      "firstName" : this.updateInfoData.firstName,
      "lastName" : this.updateInfoData.lastName,
      "riftTag" : this.updateInfoData.riftTag,
      "id" : this.data.loggedInUser.id,
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

  verifyWithTwitch() {
    window.location.href = 'https://api.twitch.tv/kraken/oauth2/authorize?response_type=code' +
      '&client_id=aoxhv1qbec0v2fqalc68euxkn4c66e' +
      '&redirect_uri=http://localhost:4200/twitch' +
      '&scope=openid';
  }


  verifyWithYouTube() {
    window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth?' +
      'scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.readonly' +
      '&access_type=offline' +
      '&include_granted_scopes=true' +
      '&redirect_uri=https://localhost:4200/youtube' +
      '&response_type=code&client_id=196736615110-2n7j9c9helma43g2779m66f50p2i6kij.apps.googleusercontent.com';
  }

  addGameAccount() {
    this.dialog.open(AddGameAccountComponent, {
      height: '450px',
      width: '600px',
      data: {
        "loggedInUserId": this.data.loggedInUser.id
      }
    });
  }

  cancel(): void {
    //noinspection TypeScriptUnresolvedFunction
    this.dialogRef.close();
  }
}
