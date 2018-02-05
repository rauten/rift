import { Injectable } from '@angular/core';
import { Session } from "./models/session-card/session";
import { Http, RequestOptions, Response, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";



@Injectable()
export class UsersessionsService {
  private apiUrl = "/api/user/1/rifterSessions";
  private createUserSessionURL = "/api/rifterSession/createGame";

  constructor(private http: Http) {
  }

  getUserSessions(): Observable<Session> {
    console.log("running getUserSessions");
    return this.http.get(this.apiUrl)
      .map(
        (response: Response) => {
          return response.json();
        }
      )
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  createUserSession(data) : void {
    console.log("running createUserSession")
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.put(this.createUserSessionURL, data, options)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Serve error'))
      .subscribe();
  }

}
