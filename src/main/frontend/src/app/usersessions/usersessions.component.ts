import { Component, OnInit } from '@angular/core';
import {Userprofile} from "../models/userprofile";
import {UsersessionsService} from "./usersessions.service";
import {Session} from "../models/session";
import {UserprofileService} from "../userprofile/userprofile.service";
import {SessionRequest} from "../models/session-request";
import {MatDialog} from "@angular/material";
import {SessionformComponent} from "./sessionform/sessionform.component";
import {CreateSessionComponent} from "./create-session/create-session.component";
import {GAMES} from "../constants/games";
import {CONSOLES} from "../constants/consoles";

@Component({
  selector: 'app-usersessions',
  templateUrl: './usersessions.component.html',
  styleUrls: ['./usersessions.component.css']
})
export class UsersessionsComponent implements OnInit {
  loggedInUser: Userprofile = new Userprofile();
  currentUser: Userprofile = new Userprofile();
  games: any;
  consoles: any;
  profile: any;
  constructor(private userSessionsService: UsersessionsService, private userProfileService: UserprofileService,
              public dialog: MatDialog) {
    this.profile = JSON.parse(localStorage.getItem("profile"));
  }

  ngOnInit() {
    this.games = GAMES;
    this.consoles = CONSOLES;
    var riftTag = this.profile.nickname;
    this.getUserRifterAndRifteeSessions(riftTag);
    this.getUserSessionRequests(riftTag);
  }

  getUserRifterAndRifteeSessions(riftTag: string) {
    this.currentUser.sessions = [];
    this.userSessionsService.getUserRifterAndRifteeSessions(riftTag).subscribe(
      resBody => {
        var sessions = resBody;
        console.log(sessions);
        for (var i = 0; i < sessions.length; i++) {
          var currSession = new Session();
          var session = sessions[i];
          currSession.hostId = session.hostId;
          currSession.id = session.id;
          currSession.sessionCost = session.sessionCost;
          currSession.title = session.title;
          currSession.sessionTime = session.sessionTime;
          currSession.gameId = session.gameId;
          currSession.console = session.console;
          if (session.usertable) {
            currSession.firstName = session.usertable.firstName;
            currSession.lastName = session.usertable.lastName;
            currSession.riftTag = session.usertable.riftTag;
            currSession.rifterRating = session.usertable.rifterRating;
            currSession.type = false;
          } else {
            currSession.firstName = this.profile["http://riftgaming:auth0:com/user_metadata"].firstName;
            currSession.lastName = this.profile["http://riftgaming:auth0:com/user_metadata"].lastName;
            currSession.riftTag = riftTag;
            currSession.type = true;
          }
          currSession.numSlots = session.slotsRemaining;
          this.currentUser.sessions.push(currSession);
        }
      }
    )
  }

  getUserSessionRequests(riftTag: string) {
    this.loggedInUser.sessionRequests = new Map<number, SessionRequest>();
    this.userSessionsService.getSessionRequests(riftTag).subscribe(
      resBody => {
        //noinspection TypeScriptUnresolvedVariable
        for (var i = 0; i < resBody.length; i++) {
          var request = new SessionRequest();
          request.accepted = resBody[i].accepted;
          request.hostId = resBody[i].hostId;
          request.rifteeId = resBody[i].rifteeId;
          request.sessionId = resBody[i].sessionId;
          this.loggedInUser.sessionRequests.set(request.sessionId, request);
        }
      }
    )
  }

  openDialog() {
    //noinspection TypeScriptUnresolvedFunction
    this.dialog.open(CreateSessionComponent, {

    });

  }

  get selectedGames() {
    return this.games.reduce((games, game) => {
      if (game.selected) {
        games.push(game.id);
      }
      return games;
    }, [])
  }

  get selectedConsoles() {
    return this.consoles.reduce((consoles, console) => {
      if (console.selected) {
        consoles.push(console.name);
      }
      return consoles;
    }, [])
  }
}
