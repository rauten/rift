import { Injectable } from '@angular/core';
import { Session } from "./models/session";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";



@Injectable()
export class UsersessionsService {
  private apiUrl = "/api/user/activity/1";

  constructor(private http: Http) {
  }

  getUser(): Observable<Session> {
    console.log("running getSession");
    return this.http.get(this.apiUrl)
      .map(
        (response: Response) => {
          return response.json();
        }
      )
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
