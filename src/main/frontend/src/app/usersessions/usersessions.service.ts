import { Injectable } from '@angular/core';
import { Session } from "../models/session";
import { Http, RequestOptions, Response, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";
import {Userprofile} from "../models/userprofile";



@Injectable()
export class UsersessionsService {
  private createUserSessionURL = "/api/rifterSession/createGame";
  private joinUserSessionURL = "/api/sessionRequest/create";
  private updateSessionRequestURL = "/api/sessionRequest/update";
  private getSessionRequestsURL = "/api/sessionRequest/";

  constructor(private http: Http) {
  }

  getUserRifterAndRifteeSessions(riftTag: string): Observable<Userprofile> {
    console.log("running getUserRifterAndRifteeSessions");
    return this.http.get("/api/rifterSession/" + riftTag + "/rifterAndRifteeSessions")
      .map(
        (response: Response) => {
          return response.json();
        }
      )
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getUserSessionsByGameAccountId(id): Observable<Userprofile> {
    console.log("Getting user's game accounts");
    return this.http.get("/api/rifterSession/" + id + "/gameAccountId")
      .map(
        (response: Response) => {
          return response.json();
        }
      )
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  createUserSession(data) : void {
    console.log("running createUserSession");
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.put(this.createUserSessionURL, data, options)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Serve error'))
      .subscribe(
        data => {console.log(data);},
        err => console.log(err),
        () => console.log('Created session')
      );
  }

  joinUserSession(data) {
    console.log("running joinUserSession");
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.put(this.joinUserSessionURL, data, options)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Serve error'))
      .subscribe(
        data => {console.log(data);},
        err => console.log(err),
        () => console.log('Joined session')
      );
  }

  updateSessionRequest(data) {
    console.log("running updateSessionRequest");
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.put(this.updateSessionRequestURL, data, options)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Serve error'))
      .subscribe(
        data => {console.log(data);},
        err => console.log(err),
        () => console.log('Updated session')
      );
  }

  getSessionRequests(riftTag: string) {
    // console.log("running getSessionRequest");
    return this.http.get(this.getSessionRequestsURL + riftTag)
      .map(
        (response: Response) => {
          return response.json();
        }
      )
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getSessionStatus(rifteeId: number, sessionId: number) {
    console.log("running getSessionStatus");
    return this.http.get("/api/sessionRequest/" + sessionId + "/status/" + rifteeId)
      .map(
        (response: Response) => {
          return response.json();
        }
      )
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  kickRifteeFromSession() {
    console.log("Kicking riftee from session");

  }
}
