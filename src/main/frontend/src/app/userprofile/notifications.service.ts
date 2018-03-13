import { Injectable } from '@angular/core';
import { Userprofile } from "../models/userprofile";
import {Http, RequestOptions, Response, Headers} from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";
import {Notification} from "../models/notification";
import {NOTIFICATION_CONTENT} from "../constants/notification-content";
import {UserprofileService} from "./userprofile.service";


@Injectable()
export class NotificationsService {
  startUrl: string;
  pollUrl: string;
  allow = true;

  constructor(private http: Http) {
  }

  pollNotifications(riftId, notifications, login) {
    this.startUrl = "/api/matchupdate/begin/";
    this.pollUrl = "/api/matchupdate/deferred";
    this.start(this.startUrl, this.pollUrl, riftId, notifications, login);
  }

  start(start, poll, riftId, notifications, login) {
    if (login) {
      console.log("Starting poll");
    } else {
      console.log("Already logged in, not starting");
    }
    this.startUrl = start;
    this.pollUrl = poll;
    this.allow = true;
    this.http.get(this.startUrl + riftId + "/" + login).subscribe(
      success => {
        console.log("Game on...");
        if(this.allow) {
          console.log("in if statemnet");
          this.allow = false;
          setInterval(this.getUpdate(notifications),6000);
        }
      },
      error => {
        console.log("error");
      }
    )
  }

  test() {
    console.log("this is a test");
  }

  startAfterLoggedIn(notifications) {
    this.http.get("/api/startdefer").subscribe(
      success => {
        console.log("Game on...");
        if(this.allow) {
          console.log("in if statemnet");
          this.allow = false;
          setInterval(this.getUpdate(notifications),6000);
        }
      },
      error => {
        console.log("error");
      }
    )
  }

  getUpdate(notifications) {
    console.log("Okay let's go...");
    this.http.get(this.pollUrl).subscribe(
      success => {
        console.log("Received a new notification");
        console.log(JSON.parse(success["_body"]).data);
        let data = JSON.parse(success["_body"]).data;
        let notification = getNotification(data);
        notifications.unshift(notification);
        setInterval(this.getUpdate(notifications), 6000);
      },
      error => {
        console.log("error, trying again");
        setInterval(this.getUpdate(notifications), 500);
      }
    );

    function getNotification(notification) {
      let currNotification = new Notification();
      currNotification.notificationContent = NOTIFICATION_CONTENT[notification.notification_type];
      currNotification.creatorId = notification.creator_id;
      currNotification.userId = notification.user_id;
      currNotification.createdTime = notification.created_time;
      currNotification.notificationType = notification.notification_type;
      currNotification.seen = notification.seen;
      this.globals.unseenNotifications += 1;
      console.log("Incrementing unseen");
      return currNotification;
    }
  }

  stopPolling(riftId) {
    // let xhr = new XMLHttpRequest();
    // xhr.open("GET","/api/stop/" + riftId);
    // xhr.send()
    this.http.get("/api/stop/" + riftId).subscribe(
      success => {
        console.log("Stopped polling");
      },
      error => {
        console.log("Error when stopping polling")
      }
    )
  }

  // clearUnseen(riftId) {
  //   this.http.get("/api/notifications/" + riftId + "/clearUnseen").subscribe(
  //     success => {
  //       console.log("Stopped polling");
  //     },
  //     error => {
  //       console.log("Error when stopping polling")
  //     }
  //   )
  // }
}


