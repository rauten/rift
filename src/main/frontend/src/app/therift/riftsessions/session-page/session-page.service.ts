import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import "rxjs/Rx";
import {Observable} from "rxjs";



@Injectable()
export class SessionPageService {
  private getSessionURL = "/api/rifterSession/";

  constructor(private http: Http) {

  }

  getSessionById(id: number) {
    console.log("running getSessionById");
    return this.http.get(this.getSessionURL + id)
      .map(
        (response: Response) => {
          return response.json();
        }
      )
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  checkRifteeStatus(sessionId: number, riftId: number) {
    console.log("running checkRifteeStatus");
    return this.http.get("/api/sessionRequest/" + sessionId + "/status/" + riftId)
      .map(
        (response: Response) => {
          return response.json();
        }
      )
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

}
