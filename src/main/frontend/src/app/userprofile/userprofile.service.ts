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
    // console.log("running followUser");
    return this.http.get("/api/user/" + riftTag + "/follow=" + id)
      .map(
        (response: Response) => {
          return response.json();
        }
      )
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  unfollowUser(riftTag: string, id: number) {
    // console.log("running unfollowUser");
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

}
