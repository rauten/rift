import { Injectable } from '@angular/core';
import { Userprofile } from "../models/userprofile";
import {Http, RequestOptions, Response, Headers} from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";

@Injectable()
export class UserprofileService {
  private createUserURL = "/api/user/createUser";
  private uploadPictureURL = "/api/user/putPicture/";
  private getPictureURL = "/api/user/getPicture/";

  constructor(private http: Http) {
  }

  getUser(riftTag: string): Observable<Userprofile> {
    // console.log("running getUser: " + riftTag);
    return this.http.get("/api/user/" + riftTag + "/profilePage")
      .map(
          (response: Response) => {
            return response.json();
          }
        )
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getUserRiftTag(id: number): Observable<Userprofile> {
    return this.http.get("/api/user/" + id +"/riftTag")
      .map(
      (response: Response) => {
        return response.json();
      }
    )
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getUserId(riftTag: string): Observable<Userprofile> {
    // console.log("running getUserId");
    return this.http.get("/api/user/" + riftTag + "/id")
      .map(
        (response: Response) => {
          return response.json();
        }
      )
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getUserNotifications(riftTag: string): Observable<Userprofile> {
    return this.http.get("/api/notification/" + riftTag + "/notifications")
      .map(
        (response: Response) => {
          return response.json();
        }
      )
      .catch((error: any) => Observable.throw(error.json().error || "Server Error"))
  }

  //**
  //This one is the polling that will check every 2 seconds for backend changes
  //**
  // getUserNotifications(riftTag: string): Observable<Userprofile> {
  //   console.log("Getting user's notifications");
  //   let url = "/api/notification/" + riftTag + "/notifications";
  //   return Observable.interval(2000)
  //     .switchMap(() => this.http.get(url))
  //     .map((res:Response) => res.json());
  // }

  getUserBroadcastNotifications(riftTag: string): Observable<Userprofile> {
    return this.http.get("/api/notification/" + riftTag + "/broadcastNotifications")
      .map(
        (response: Response) => {
          return response.json();
        }
      )
      .catch((error: any) => Observable.throw(error.json().error || "Server Error"))
  }

  createUser(data): void {
    console.log("running createUser");
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.put(this.createUserURL, data, options)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Serve error'))
      .subscribe();
  }

  followUser(riftTag: string, id: number) {
    console.log("Followed " + riftTag);
    return this.http.get("/api/user/" + riftTag + "/follow=" + id)
      .map(
        (response: Response) => {
          return response.json();
        }
      )
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  unfollowUser(riftTag: string, id: number) {
    console.log("Unfollowed " + riftTag);
    return this.http.get("/api/user/" + riftTag + "/unfollow=" + id)
      .map(
        (response: Response) => {
          return response.json();
        }
      )
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  uploadProfilePicture(riftTag: string, base64: string) {
    // console.log("running uploadProfilePicture");
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.put(this.uploadPictureURL + riftTag + "/profile-pic", base64, options)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Serve error'))
      .subscribe();
  }

  uploadCoverPhoto(riftTag: string, base64: string) {
    // console.log("running uploadProfilePicture");
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.put(this.uploadPictureURL + riftTag + "/profile-pic", base64, options)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Serve error'))
      .subscribe();
  }

  getProfilePicture(riftTag: string): Observable<Userprofile> {
    // console.log("running getProfilePicture");
    return this.http.get(this.getPictureURL + riftTag + "/rift-profilepictures")
      .map(
        (response: Response) => {
          return response.json();
        }
      )
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getCoverPhoto(riftTag: string): Observable<Userprofile> {
    // console.log("running getProfilePicture");
    return this.http.get(this.getPictureURL + riftTag + "/rift-coverphotos")
      .map(
        (response: Response) => {
          return response.json();
        }
      )
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  sendConfirmationEmail(email) {
    return this.http.put("/api/email/", email)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Serve error'))
      .subscribe();
  }
}
