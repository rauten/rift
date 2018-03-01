import { Component, OnInit } from '@angular/core';
import {Userprofile} from "../models/userprofile";
import {UserprofileService} from "../userprofile/userprofile.service";
import {Activity} from "../models/activity";

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
          currNotification.notificationType = resBody.broadcastNotificationList[i].notificationType;
          currNotification.notificationContent = resBody.broadcastNotificationList[i].notificationContent;
          currNotification.createdTime = resBody.broadcastNotificationList[i].createdTime;
          currNotification.rifterSession = resBody.broadcastNotificationList[i].rifterSession;
          currNotification.riftTag = resBody.riftTag;
          this.currentUser.feed.push(currNotification);
        }
      }
    );
    return true;
  }


}
