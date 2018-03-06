import { Component, OnInit } from '@angular/core';
import {Userprofile} from "../models/userprofile";
import {UserprofileService} from "../userprofile/userprofile.service";
import {Activity} from "../models/activity";
import {ACTIVITY_CONTENT} from "../constants/activity-content";
import {Session} from "../models/session";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  currentUser: Userprofile = new Userprofile();
  profile: any;

  constructor(private userProfileService: UserprofileService) {
    this.profile = JSON.parse(localStorage.getItem('profile'));
  }

  ngOnInit() {
    this.getBroadcastNotifications(this.profile.nickname);
  }

  getBroadcastNotifications(riftTag: string):any {
    this.currentUser.feed = [];
    this.userProfileService.getUser(riftTag).subscribe(
      resBody => {
        for (var i = 0; i < resBody.broadcastNotificationList.length; i++) {
          var currNotification = new Activity();
          console.log(resBody);
          currNotification.notificationType = resBody.broadcastNotificationList[i].notificationType;
          currNotification.notificationContent = ACTIVITY_CONTENT[currNotification.notificationType];
          currNotification.createdTime = resBody.broadcastNotificationList[i].createdTime;
          currNotification.riftTag = resBody.riftTag;

          var rifterSession = new Session();
          currNotification.rifterSession = resBody.broadcastNotificationList[i].rifterSession;


          this.getActivityProfilePicture(currNotification.riftTag, currNotification);
          this.currentUser.feed.push(currNotification);
        }
      }
    );
    return true;
  }

  getActivityProfilePicture(riftTag: string, activity: Activity): string {
    console.log("Getting user's profile picture");
    this.userProfileService.getProfilePicture(riftTag).subscribe(
      resBody => {
        if (resBody.image == "") {
          activity.creatorProfilePic = "https://www.vccircle.com/wp-content/uploads/2017/03/default-profile.png"
        } else {
          activity.creatorProfilePic = resBody.image;
        }
      }
    );
    return;
  }


}
