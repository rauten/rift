import { Injectable } from '@angular/core';
import { Userprofile } from "./models/userprofile";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";



@Injectable()
export class UserprofileService {
  private userURL = "/api/user/activity/1";
  private followerAndFollowingURL = "/api/user/1/followingsandfollowers/userInfo";
  private broadcastNotificationsURL = "http://localhost:5000/api/user/2/broadcast_notifications";
  private createUserURL = "/user/createUser";

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

  createUser(firstName: string, lastName: string, riftTag: string, auth0Id: string): void {
    console.log("running createUser");
    let data = {
      "firstName": firstName,
      "lastName": lastName,
      "riftTag": riftTag,
      "auth0Id": auth0Id
    };
    let body = JSON.stringify(data);
    let head = new Headers({
      'Content-Type': 'application/json'
    });
    this.http.post(this.createUserURL, body, {headers : head})
      .map(res =>  res.json())
      .subscribe(
        data => {console.log(data);},
        err => console.log(err),
        () => console.log('Created user')
      );
  }

}
