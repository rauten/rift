import { Component, OnInit, Input } from '@angular/core';
import {Userprofile} from "../models/userprofile";
import {UpdateInfoService} from "./data/update-info.service";
import {UserprofileService} from "../userprofile.service";

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

  constructor(private updateInfoService: UpdateInfoService, private userProfileService: UserprofileService) {
    this.profile = JSON.parse(localStorage.getItem('profile'));
  }

  ngOnInit() {
    this.getCurrentLoggedInUser();
    this.currentUser = this.updateInfoService.getUserData();
    this.updateInfoData = this.updateInfoService.getFormData();
    console.log("Current user info loaded to Update Profile");
    console.log(this.profile);
    console.log("id_token: " + localStorage.getItem('id_token'));
    console.log("access_token: " + localStorage.getItem('access_token'));

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

  save() {
    this.updateInfoService.setUserData(this.currentUser);
    let data = {
      "firstName" : this.updateInfoData.firstName,
      "lastName" : this.updateInfoData.lastName,
      "riftTag" : this.updateInfoData.riftTag,
      "email" : this.updateInfoData.email,
      "id" : this.loggedInUser.id
    };

    /*
    let auth0data = {
      'user_metadata': {
        'firstName': this.updateInfoData.firstName,
        'lastName': this.updateInfoData.riftTag
      },
      'username' : this.updateInfoData.riftTag
    };
    */
    let auth0data = {'firstName': this.updateInfoData.firstName, 'lastName':this.updateInfoData.lastName, 'riftTag': this.updateInfoData.riftTag, 'email':this.updateInfoData.email};
    console.log("Herro");
    console.log("Data: " + auth0data);
    this.updateInfoService.updateUser(data);
    this.updateInfoService.updateAuth0User(auth0data, this.profile.sub);
    window.location.reload();
  }
}
