import { Component, OnInit } from '@angular/core';
import {Userprofile} from "../models/userprofile";
import {UsersessionsService} from "./usersessions.service";
import {Session} from "../models/session";

@Component({
  selector: 'app-usersessions',
  templateUrl: './usersessions.component.html',
  styleUrls: ['./usersessions.component.css']
})
export class UsersessionsComponent implements OnInit {
  currentUser: Userprofile = new Userprofile;
  constructor(private userSessionsService: UsersessionsService) { }

  ngOnInit() {
    var loggedInUser = JSON.parse(localStorage.getItem("profile"));
    var riftTag = loggedInUser.nickname;
    this.getUserSessions(riftTag);
    this.getUserRifteeSessions(riftTag);
  }

  getUserSessions(riftTag: string) {
    this.currentUser.rifterSessions = [];
    this.userSessionsService.getUserRifterSessions(riftTag).subscribe(
      resBody => {
        for (var i = 0; i < resBody.rifterSessions.length; i++) {
          var currDateMS = resBody.rifterSessions[i].sessionTime;
          var date = new Date(currDateMS);
          var currSession = new Session();
          currSession.firstName = resBody.firstName;
          currSession.lastName = resBody.lastName;
          currSession.riftTag = resBody.riftTag;
          currSession.rifterRating = resBody.rifterRating;
          currSession.hostId = resBody.rifterSessions[i].hostId;
          currSession.sessionCost = resBody.rifterSessions[i].sessionCost;
          currSession.methodOfContact = resBody.rifterSessions[i].methodOfContact;
          currSession.sessionDuration = resBody.rifterSessions[i].sessionDuration;
          currSession.title = resBody.rifterSessions[i].title;
          currSession.sessionTime = date;
          currSession.id = resBody.rifterSessions[i].id;
          currSession.game = resBody.rifterSessions[i].game;
          currSession.console = resBody.rifterSessions[i].game;
          currSession.numSlots = resBody.rifterSessions[i].slotsRemaining;
          this.currentUser.rifterSessions.push(currSession);
        }
      },
      err => {
        console.log(err);
      }
    );
    console.log(this.currentUser.rifterSessions);
  }

  getUserRifteeSessions(riftTag: string) {
    this.currentUser.rifteeSessions = [];
    this.userSessionsService.getUserRifteeSessions(riftTag).subscribe(
      resBody => {
        var sessions = resBody;
        for (var i = 0; i < sessions.length; i++) {
          var currSession = new Session();
          var session = sessions[i];
          currSession.hostId = session.hostId;
          currSession.id = session.id;
          currSession.sessionCost = session.sessionCost;
          currSession.title = session.title;
          currSession.sessionTime = session.sessionTime;
          currSession.game = session.game;
          currSession.console = session.console;
          currSession.firstName = session.usertable.firstName;
          currSession.lastName = session.usertable.lastName;
          currSession.riftTag = session.usertable.riftTag;
          currSession.numSlots = session.slotsRemaining;
          currSession.rifterRating = session.rifterRating;
          this.currentUser.rifteeSessions.push(currSession);
        }
        console.log(this.currentUser.rifteeSessions);
      }
    )

  }

}
