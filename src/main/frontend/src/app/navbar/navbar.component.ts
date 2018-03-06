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
            notification.id = resBody.notificationList[i].id;
            notification.createdTime = resBody.notificationList[i].createdTime;
            notification.creatorId = resBody.notificationList[i].creatorId;
            notification.notificationType = resBody.notificationList[i].notificationType;
            if (notification.notificationType == "2") {
              notification.notificationContent = notification.userId + NOTIFICATION_CONTENT[2]
            } else {
              notification.notificationContent = resBody.notificationList[i].notificationContent;
            }
            notification.sessionId = resBody.notificationList[i].sessionId;
            notification.userId = resBody.notificationList[i].userId;
            this.currentUser.notifications.push(notification);
          }
        } else {
          var notification = new Notification();
          notification.notificationContent = "No notifications";
          this.currentUser.notifications.push(notification);
        }
      }
    )
  }

}
