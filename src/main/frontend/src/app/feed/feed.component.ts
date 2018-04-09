import { Component, OnInit } from '@angular/core';
import {Userprofile} from "../models/userprofile";
import {UserprofileService} from "../userprofile/userprofile.service";
import {Activity} from "../models/activity";
import {ACTIVITY_CONTENT} from "../constants/activity-content";
import {Session} from "../models/session";
import {NOTIFICATION_CONTENT} from "../constants/notification-content";
import {SharedFunctions} from "../shared/shared-functions";

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
    this.userProfileService.getUserBroadcastNotifications(riftTag).subscribe(
      resBody => {
        for (let i = 0; i < resBody.length; i++) {
          let currFeed = resBody[i];
          let currNotification = new Activity();
          currNotification.notificationType = currFeed.notificationType;
          currNotification.notificationContent = NOTIFICATION_CONTENT.get(currNotification.notificationType);
          currNotification.createdTime = currFeed.createdTime;
          currNotification.riftTag = currFeed.creatorUsertable.riftTag;
          currNotification.firstName = currFeed.creatorUsertable.firstName;
          currNotification.lastName = currFeed.creatorUsertable.lastName;
          this.getActivityProfilePicture(currNotification.riftTag, currNotification);

          let session = new Session();
          let currSession = currFeed.rifterSession;
          session.id = currSession.id;
          session.gameId = currSession.gameId;
          session.console = currSession.console;
          session.title = currSession.title;
          session.sessionTime = currSession.sessionTime;
          session.slotsRemaining = currSession.slotsRemaining;
          session.riftTag = currNotification.riftTag;
          currNotification.rifterSession = session;
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
