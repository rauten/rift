import { Injectable } from '@angular/core';
import { Session } from "../components/session-card/session";
import { Http, RequestOptions, Response, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";
import {Userprofile} from "../userprofile/models/userprofile";



@Injectable()
export class UsersessionsService {
  private createUserSessionURL = "/api/rifterSession/createGame";

  constructor(private http: Http) {
  }

  getUserRifterSessions(riftTag: string): Observable<Userprofile> {
    console.log("running getUserRifterSessions");
    return this.http.get("/api/user/" + riftTag + "/rifterSessions")
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

}
