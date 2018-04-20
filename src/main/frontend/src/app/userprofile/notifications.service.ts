import { Injectable } from '@angular/core';
import { Userprofile } from "../models/userprofile";
import {Http, RequestOptions, Response, Headers} from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";
import {Notification} from "../models/notification";
import {NOTIFICATION_CONTENT} from "../constants/notification-content";
import {UserprofileService} from "./userprofile.service";
import {Globals} from "../global/globals";
import { Component, HostListener } from '@angular/core';

@Injectable()
export class NotificationsService {
  startUrl: string;
  pollUrl: string;
  allow = true;

  constructor(private http: Http, private globals: Globals) {
  }

  pollNotifications(riftId, notifications, login) {
    this.startUrl = "/api/matchupdate/begin/";
    this.pollUrl = "/api/matchupdate/deferred";
    //this.start(this.startUrl, this.pollUrl, riftId, notifications, login);
  }

  start(start, poll, riftId, notifications, login) {
    this.globals.stopPolling = false;
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
        let sessionId = JSON.parse(success["_body"]).result;
        localStorage.setItem("sessionId", sessionId);
        console.log("Game on...");
        if(this.allow) {
          console.log("in if statemnet");
          this.allow = false;
          setInterval(this.getUpdate(notifications, sessionId),6000);
        }
      },
      error => {
        console.log("error");
      }
    )
  }

  getUpdate(notifications, sessionId) {
    console.log("Okay let's go...");
    this.http.get(this.pollUrl + "/" + sessionId).subscribe(
      success => {
        console.log("Stop polling: " + this.globals.stopPolling);
        console.log("Received a new notification");
        console.log(success);
        console.log(JSON.parse(success["_body"]).data);
        let data = JSON.parse(success["_body"]).data;
        let notification = getNotification(data);
        notifications.unshift(notification);
        this.globals.unseenNotifications += 1;
        if(!this.globals.stopPolling) {
          setInterval(this.getUpdate(notifications, sessionId), 6000);
        }
      },
      error => {
        console.log("error, trying again");
        if(!this.globals.stopPolling) {
          setInterval(this.getUpdate(notifications, sessionId), 6000);
        }
      }
    );

    function getNotification(notification) {
      let currNotification = new Notification();
      currNotification.notificationContent = NOTIFICATION_CONTENT.get(notification.notification_type);
      currNotification.creatorId = notification.creator_id;
      currNotification.userId = notification.user_id;
      currNotification.createdTime = notification.created_time;
      currNotification.notificationType = notification.notification_type;
      currNotification.seen = notification.seen;
      return currNotification;
    }
  }

  stopPolling(riftId) {
    this.globals.stopPolling = true;
    this.http.get("/api/stop/" + riftId + "/" + localStorage.getItem("sessionId")).subscribe(
      success => {
        console.log("Stopped polling");
        console.log(success);
      },
      error => {
        console.log(error)
      }
    )
  }

  clearUnseen(riftId) {
    this.http.get("/api/notifications/" + riftId + "/clearUnseen").subscribe(
      success => {
        console.log("Clearing unseen");
      },
      error => {
        console.log("Error when stopping polling")
      }
    )
  }

}


