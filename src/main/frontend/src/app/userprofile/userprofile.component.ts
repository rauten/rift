import { Component, OnInit } from '@angular/core';
import {Userprofile} from "./models/userprofile"
import {UserprofileService} from "./userprofile.service";
import {Activity} from "./models/activity";

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css'],
})
export class UserprofileComponent implements OnInit {
  userprofile: Userprofile = new Userprofile();
  activities: Activity[] = [];

  constructor(private userProfileService: UserprofileService) {
  }

  ngOnInit() {
    this.getUserById()
  }

  getUserById() {
    this.userProfileService.getUser().subscribe(
      resBody => {
        this.userprofile.firstName = resBody.firstName;
        this.userprofile.firstName = resBody.firstName;
        this.userprofile.lastName = resBody.lastName;
        this.userprofile.rifterRating = resBody.rifterRating;
        this.userprofile.rifteeRating = resBody.rifteeRating;
        this.userprofile.id = resBody.id;
        this.userprofile.gender = resBody.gender;
        this.userprofile.riftTag = resBody.riftTag;
        this.userprofile.twitchAccount = resBody.twitchAccount;
        this.userprofile.youtubeAccount = resBody.youtubeAccount;
        for (var i = 0; i < resBody.creatorActivityList.length; i++) {
          //noinspection TypeScriptUnresolvedVariable
          this.activities.push(new Activity(resBody.creatorActivityList[i].notificationContent,
            resBody.creatorActivityList[i].createdTime))
        }
      },
      err => {
        console.log(err);
      }
    )
  }
}
