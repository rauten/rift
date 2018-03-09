import { Injectable } from '@angular/core';
import { Userprofile } from "../models/userprofile";
import {Http, RequestOptions, Response, Headers} from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";

@Injectable()
export class NotificationsService {
  startUrl: string;
  pollUrl: string;
  allow = true;

  constructor(private http: Http) {
  }

  pollNotifications() {
    this.startUrl = "/api/matchupdate/begin";
    this.pollUrl = "/api/matchupdate/deferred";
    this.start(this.startUrl, this.pollUrl);
  }

  start(start, poll) {
    console.log("Starting poll");
    this.startUrl = start;
    this.pollUrl = poll;
    this.http.get(this.startUrl).subscribe(
      success => {
        console.log("Game on...");
        setInterval(this.getUpdate(),500);
      },
      error => {
        console.log("error");
      }
    )
  }

  getUpdate() {
    console.log("Okay let's go...");
    this.http.get(this.pollUrl).subscribe(
      success => {
        console.log(success);
        console.log("Received a new notification");
        let update = getUpdate(success);
        console.log(update);
      },
      error => {
        console.log("error, trying again");
        this.getUpdate();
      }
    );

    // .map(
      //   (response: Response) => {
      //     console.log("Received a new notification");
      //     let update = getUpdate(response);
      //     console.log(update);
      //   }
      // )
      // .catch((error: any) => Observable.throw(error.json().error || "Server Error"))

    function getUpdate(notification) {
      console.log(notification);
      return notification;
    }
  }
}


