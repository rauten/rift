import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers} from "@angular/http";
import {Observable} from "rxjs";
import {CreateSessionData} from "./create-session.model";
import {SessionDateTime} from "./sessionDateTime";
import {Session} from "../../../models/session";


@Injectable()
export class CreateSessionService {
  private updateSessionData: CreateSessionData = new CreateSessionData();
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
    session.description = this.updateSessionData.description
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
    this.updateSessionData.description = data.description;
  }

  getFormData(): CreateSessionData {
    return this.updateSessionData;
  }
}
