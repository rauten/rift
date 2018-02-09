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
    return this.http.get(this.getSessionURL + id + "/host")
      .map(
        (response: Response) => {
          console.log(response.json());
          return response.json();
        }
      )
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

}
