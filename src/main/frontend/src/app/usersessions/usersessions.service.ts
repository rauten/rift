import { Injectable } from '@angular/core';
import { Session } from "./models/session-card/session";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";



@Injectable()
export class UsersessionsService {
  private apiUrl = "/api/user/1/rifterSessions";

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
}
