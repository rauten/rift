import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {SearchBarService} from "../components/search-bar/search-bar.service";
import {Userprofile} from "../models/userprofile";
import {UserprofileService} from "../userprofile/userprofile.service";
import {Notification} from "../models/notification";
import {NOTIFICATION_CONTENT} from "../constants/notification-content";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser: Userprofile = new Userprofile();

  constructor(public auth: AuthService, private userProfileService: UserprofileService) {
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('profile'));
  }

  ngOnInit() {
    if(JSON.parse(localStorage.getItem('profile'))) {
      this.getUserNotifications(JSON.parse(localStorage.getItem('profile')).nickname);
    }
  }

  getUserNotifications(riftTag: string) {
    console.log("Getting user notifications");
    this.currentUser.notifications = [];
    this.userProfileService.getUser(riftTag).subscribe(
      resBody => {
        if(resBody.notificationList.length > 0) {
          for (var i = 0; i < resBody.notificationList.length; i++) {
            var notification = new Notification();
            notification.createdTime = resBody.notificationList[i].createdTime;
            notification.creatorRiftTag = resBody.notificationList[i].creatorUsertable.riftTag;
            this.getNotificationProfilePicture(notification.creatorRiftTag, notification);

            notification.notificationType = resBody.notificationList[i].notificationType;
            notification.notificationContent = NOTIFICATION_CONTENT[notification.notificationType];
            notification.sessionId = resBody.notificationList[i].sessionId;
            this.currentUser.notifications.push(notification);
          }
        } else {
          var notification = new Notification();
          notification.notificationContent = "No notifications";
          notification.creatorProfilePic = "";
          notification.createdTime = -1;
          this.currentUser.notifications.push(notification);
        }
      }
    )
  }

  getNotificationProfilePicture(riftTag: string, notification: Notification): string {
    console.log("Getting user's profile picture");
    this.userProfileService.getProfilePicture(riftTag).subscribe(
      resBody => {
        if (resBody.image == "") {
          notification.creatorProfilePic = "https://www.vccircle.com/wp-content/uploads/2017/03/default-profile.png"
        } else {
          notification.creatorProfilePic = resBody.image;
        }
      }
    );
    return;
  }

}
