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
          var currFeed = resBody.broadcastNotificationList[i];
          var currNotification = new Activity();
          currNotification.notificationType = currFeed.notificationType;
          currNotification.notificationContent = ACTIVITY_CONTENT[currNotification.notificationType];
          currNotification.createdTime = currFeed.createdTime;
          currNotification.riftTag = currFeed.creatorUsertable.riftTag;
          currNotification.firstName = currFeed.creatorUsertable.firstName;
          currNotification.lastName = currFeed.creatorUsertable.lastName;
          this.getActivityProfilePicture(currNotification.riftTag, currNotification);

          var session = new Session();
          var currSession = currFeed.rifterSession;
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
