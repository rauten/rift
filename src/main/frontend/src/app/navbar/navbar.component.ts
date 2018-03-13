import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {SearchBarService} from "../components/search-bar/search-bar.service";
import {Userprofile} from "../models/userprofile";
import {UserprofileService} from "../userprofile/userprofile.service";
import {Notification} from "../models/notification";
import {NOTIFICATION_CONTENT} from "../constants/notification-content";
import {Globals} from "../global/globals";
import {NotificationsService} from "../userprofile/notifications.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser: Userprofile = new Userprofile();
  loggedInUserId: number;
  profile: any;
  testbegan: any;
  @Input() notificationsList;

  test: String[] = [];

  constructor(public auth: AuthService, private userProfileService: UserprofileService,
  private notificationService: NotificationsService, private globals: Globals) {
    this.profile = JSON.parse(localStorage.getItem('profile'));
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('profile'));
  }

  clearUnseen() {
    this.globals.unseenNotifications = 0;
    this.notificationService.clearUnseen(this.profile.nickname);
  }

  ngOnInit() {
    if(JSON.parse(localStorage.getItem('profile'))) {
    //   this.getUserNotifications(JSON.parse(localStorage.getItem('profile')).nickname);
    //     this.pollNotifications(this.profile.nickname);
    }
  }

  pollNotifications(riftTag) {
    console.log(localStorage.getItem("beganPolling"));
    this.userProfileService.getUserId(riftTag).subscribe(
      resBody => {
        // this.notificationService.pollNotifications(this.currentUser.notifications);
      }
    )
  }

  getUserNotifications(riftTag: string) {
    console.log("Getting user notifications");
    this.userProfileService.getUserNotifications(riftTag).subscribe(
      resBody => {
        console.log(resBody);
        this.currentUser.notifications = [];
        if(resBody.length > 0) {
          for (var i = resBody.length-1; i > -1; i--) {
            var notification = new Notification();
            notification.createdTime = resBody[i].createdTime;
            notification.creatorRiftTag = resBody[i].creatorUsertable.riftTag;
            notification.creatorEmail = resBody[i].creatorUsertable.email;
            notification.creatorId = resBody[i].creatorUsertable.id;
            this.getNotificationProfilePicture(notification.creatorRiftTag, notification);
            notification.notificationType = resBody[i].notificationType;
            notification.notificationContent = NOTIFICATION_CONTENT[notification.notificationType];
            notification.sessionId = resBody[i].sessionId;
            notification.seen = resBody[i].seen;
            if(notification.sessionId > 0) {
              notification.sessionTitle = resBody[i].rifterSession.title;
            }
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
