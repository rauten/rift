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

  pollNotifications(riftId, notifications) {
    this.startUrl = "/api/matchupdate/begin/";
    this.pollUrl = "/api/matchupdate/deferred";
    this.start(this.startUrl, this.pollUrl, riftId, notifications);
  }

  start(start, poll, riftId, notifications) {
    console.log("Starting poll");
    this.startUrl = start;
    this.pollUrl = poll;
    this.http.get(this.startUrl + riftId).subscribe(
      success => {
        console.log("Game on...");
        setInterval(this.getUpdate(notifications),500);
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
        console.log(data.notification_type);
        let notification = getNotification(data);
        notifications.unshift(notification);
        this.getUpdate(notifications);
      },
      error => {
        console.log("error, trying again");
        this.getUpdate(notifications);
      }
    );

    function getNotification(notification) {
      let currNotification = new Notification();
      currNotification.notificationContent = NOTIFICATION_CONTENT[notification.notification_type];
      currNotification.creatorId = notification.creator_id;
      currNotification.userId = notification.user_id;
      currNotification.createdTime = notification.created_time;
      currNotification.notificationType = notification.notification_type;
      return currNotification;
    }
  }
}


