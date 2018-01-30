import { Injectable } from '@angular/core';
import { Userprofile } from "./models/userprofile";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";



@Injectable()
export class UserprofileService {
  private apiUrl = "/api/user/activity/1";

  constructor(private http: Http) {
  }

  getUser(): Observable<Userprofile> {
    console.log("running getUser");
    return this.http.get(this.apiUrl)
      .map(
        (response: Response) => {
          return response.json();
        }
      )
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
