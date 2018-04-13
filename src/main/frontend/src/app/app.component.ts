import {Component, HostListener} from '@angular/core';
import {AuthService} from "./auth/auth.service";
import {Http} from "@angular/http";
import {UserprofileService} from "./userprofile/userprofile.service";
import {Globals} from "./global/globals";
import {Notification} from "./models/notification";
import {NotificationsService} from "./userprofile/notifications.service";
import {NOTIFICATION_CONTENT} from "./constants/notification-content";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  notifications: String[] =["hello", "there", "ha"];
  notificationList: Notification[] = [];
  profile: any;

  ngOnInit() {
    this.profile = JSON.parse(localStorage.getItem("profile"));
    if(this.profile) {
      this.userprofileService.getUser(this.profile.nickname).subscribe(
        resBody => {
          let id = resBody.id;
          // this.notificationsService.pollNotifications(id, this.notificationList, false);
        });
      // this.getUserNotifications(this.profile.nickname);
    }
  }

  @HostListener('window:beforeunload', [ '$event' ])
  beforeUnloadHandler(event) {
    this.userprofileService.getUser(this.profile.nickname).subscribe(
      resBody => {
        let id = resBody.id;
        this.notificationsService.stopPolling(id);
      });
  }


  constructor(public auth: AuthService, private userprofileService: UserprofileService,
  private http: Http, private globals: Globals, private notificationsService: NotificationsService) {
    this.profile = JSON.parse(localStorage.getItem("profile"));
    let notifications = this.notificationList;
    auth.handleAuthentication(function (data, createUser) {
      let profile = JSON.parse(localStorage.getItem("profile"));
      userprofileService.getUser(profile.nickname).subscribe(
        resBody => {
          let id = resBody.id;
          // pollNotifications(id);
          getUserNotifications(profile.nickname);
        });

      if (createUser) {
          let riftData = {
            "firstName": data.firstName,
            "lastName": data.lastName,
            "riftTag": data.riftTag,
            "auth0Token": data.auth0Token,
            "email": data.email
          };
          userprofileService.createUser(riftData);
      } else {
        userprofileService.getUser(profile.nickname).subscribe(
          resBody => {
            localStorage.setItem("loggedInUserID", resBody.id.toString());
          })
      }
    });

    function pollNotifications(id) {
      console.log("Polling notifications");
      notificationsService.pollNotifications(id, notifications, true)
    }

    function getUserNotifications(riftTag: string) {
      console.log("Getting user notifications");
      userprofileService.getUserNotifications(riftTag).subscribe(
        resBody => {
          if(resBody.length > 0) {
            for (let i = resBody.length-1; i > -1; i--) {
              let notification = new Notification();
              notification.createdTime = resBody[i].createdTime;
              notification.creatorRiftTag = resBody[i].creatorUsertable.riftTag;
              notification.creatorEmail = resBody[i].creatorUsertable.email;
              notification.creatorId = resBody[i].creatorUsertable.id;
              // this.getNotificationProfilePicture(notification.creatorRiftTag, notification);
              notification.notificationType = resBody[i].notificationType;
              notification.notificationContent = NOTIFICATION_CONTENT.get(notification.notificationType);
              notification.sessionId = resBody[i].sessionId;
              notification.seen = resBody[i].seen;
              if (!notification.seen) {
                globals.unseenNotifications += 1;
              }
              if(notification.sessionId > 0) {
                notification.sessionTitle = resBody[i].rifterSession.title;
              }
              notifications.push(notification);
            }
          } else {
            let notification = new Notification();
            notification.notificationContent = "No notifications";
            notification.creatorProfilePic = "";
            notification.createdTime = -1;
            notifications.push(notification);
          }
        }
      )
    }
  }

  getUserNotifications(riftTag: string) {
    console.log("Getting user notifications");
    this.userprofileService.getUserNotifications(riftTag).subscribe(
      resBody => {
        if(resBody.length > 0) {
          for (let i = resBody.length-1; i > -1; i--) {
            let notification = new Notification();
            notification.createdTime = resBody[i].createdTime;
            notification.creatorRiftTag = resBody[i].creatorUsertable.riftTag;
            notification.creatorEmail = resBody[i].creatorUsertable.email;
            notification.creatorId = resBody[i].creatorUsertable.id;
            // this.getNotificationProfilePicture(notification.creatorRiftTag, notification);
            notification.notificationType = resBody[i].notificationType;
            notification.notificationContent = NOTIFICATION_CONTENT.get(notification.notificationType);
            notification.sessionId = resBody[i].sessionId;
            notification.seen = resBody[i].seen;
            if (!notification.seen) {
              this.globals.unseenNotifications += 1;
            }
            if(notification.sessionId > 0) {
              notification.sessionTitle = resBody[i].rifterSession.title;
            }
            this.notificationList.push(notification);
          }
        } else {
          let notification = new Notification();
          notification.notificationContent = "No notifications";
          notification.creatorProfilePic = "";
          notification.createdTime = -1;
          this.notificationList.push(notification);
        }
      }
    )
  }
}

