import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers} from "@angular/http";
import {Observable} from "rxjs";
import {UpdateSessionData} from "./update-session.model";
import {Session} from "../../../../../models/session";
import {SessionDateTime} from "./sessionDateTime";


@Injectable()
export class UpdateSessionService {
  private updateSessionData: UpdateSessionData = new UpdateSessionData();
  private isValid: boolean = false;
  private updateSessionURL = "/api/rifterSession/update";

  constructor(private http: Http) {
  }

  getSessionData(): Session {
    var session: Session = new Session();
    session.title = this.updateSessionData.title;
    session.gameId = this.updateSessionData.gameId;
    session.console = this.updateSessionData.console;
    session.numSlots = this.updateSessionData.numSlots;
    session.sessionCost = this.updateSessionData.sessionCost;
    return session;
  }

  setSessionData(data: Session, dateTime: SessionDateTime) {
    this.isValid = true;
    this.updateSessionData.title = data.title;
    this.updateSessionData.gameId = data.gameId;
    this.updateSessionData.console = data.console;
    this.updateSessionData.numSlots = data.numSlots;
    this.updateSessionData.sessionCost = data.sessionCost;
    this.updateSessionData.sessionDate = dateTime.sessionDate;
    this.updateSessionData.sessionTime = dateTime.sessionTime;
    this.updateSessionData.sessionDuration = dateTime.sessionDuration;
  }

  getFormData(): UpdateSessionData {
    return this.updateSessionData;
  }

  updateUserSession(data) {
    console.log("running updateUserSession");
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.put(this.updateSessionURL, data, options)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Serve error'))
      .subscribe(
        data => {console.log(data);},
        err => console.log(err),
        () => console.log('Updated session')
      );
  }

}
