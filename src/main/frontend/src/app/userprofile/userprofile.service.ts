import { Injectable } from '@angular/core';
import { Userprofile } from "./models/userprofile";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";
import {Router, ActivatedRoute, Params} from "@angular/router";

@Injectable()
export class UserprofileService {
  private userURL = "/api/user/activity/1";
  private followerAndFollowingURL = "/api/user/1/followingsandfollowers/userInfo";
  private broadcastNotificationsURL = "http://localhost:5000/api/user/2/broadcast_notifications";

  constructor(private http: Http) {
  }

  getUser(): Observable<Userprofile> {
    console.log("running getUser");
    return this.http.get(this.userURL)
      .map(
        (response: Response) => {
          return response.json();
        }
      )
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getUserFollowersAndFollowing(): Observable<Userprofile> {
    console.log("running getUserFollowersAndFollowing");
    return this.http.get(this.followerAndFollowingURL)
      .map(
        (response: Response) => {
          return response.json();
        }
      )
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getBroadcastNotifications(): Observable<Userprofile> {
    console.log("running getBroadcastNotifications");
    return this.http.get(this.broadcastNotificationsURL)
      .map(
        (response: Response) => {
          return response.json();
        }
      )
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
