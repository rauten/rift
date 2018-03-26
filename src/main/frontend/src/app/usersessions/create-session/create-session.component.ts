import { Component, OnInit, Input, Inject } from '@angular/core';
import {SessionDateTime} from "./data/sessionDateTime";
import {ActivatedRoute} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {CreateSessionService} from "./data/create-session.service";
import {Session} from "../../models/session";
import {CONSOLES} from "../../constants/consoles";
import {GAMES} from "../../constants/games";
import {LANGUAGES} from "../../constants/languages";
import {UsersessionsService} from "../usersessions.service";
import {Globals} from "../../global/globals";
import {UserprofileService} from "../../userprofile/userprofile.service";
import {GameAccountService} from "../../userprofile/game-account/game-account.service";
import {GameAccount} from "../../models/game-account";
import {SESSION_ICONS} from "../../constants/session-icon-variables";

@Component({
  selector: 'app-create-session',
  templateUrl: 'create-session.component.html',
  styleUrls: ['create-session.component.scss']
})
export class CreateSessionComponent implements OnInit {
  title = "Create this session";
  currentSession: Session = new Session();
  currentSessionDateTime: SessionDateTime = new SessionDateTime();
  sub: any;
  @Input() createSessionData;
  games: any;
  languages: any;
  consoles: any;
  gameId: any;
  platform: any;
  loggedInUserId: number;
  profile: any;
  gameAccounts: GameAccount[] = [];
  accountId: any;

  //noinspection JSAnnotator
  constructor(private createSessionService: CreateSessionService, private route: ActivatedRoute,
              private userSessionService: UsersessionsService, private globals: Globals,
              private userProfileService: UserprofileService, private gameAccountService: GameAccountService,
              private dialogRef: MatDialogRef<CreateSessionComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.games = GAMES;
    this.consoles = CONSOLES;
    this.languages = LANGUAGES;
    this.profile = JSON.parse(localStorage.getItem('profile'));

  }

  ngOnInit() {
    this.getLoggedInUserId(this.profile.nickname);
    this.currentSession = this.createSessionService.getSessionData();
    this.createSessionData = this.createSessionService.getFormData();
  }

  getLoggedInUserId(riftTag: string) {
    if(JSON.parse(localStorage.getItem("loggedInUserID")) != null) {
      this.loggedInUserId = parseInt(JSON.parse(localStorage.getItem("loggedInUserID")));
    } else {
      this.userProfileService.getUserId(riftTag).subscribe(
        resBody => {
          this.loggedInUserId = resBody.id;
        }
      )
    }
  }

  save() {
  this.createSessionService.setSessionData(this.currentSession, this.currentSessionDateTime);
  let timeMS = this.timeToMilliseconds(this.currentSessionDateTime.sessionTime) + this.currentSessionDateTime.sessionDate.getTime();
    let data = {
      "hostId": this.loggedInUserId,
      "title": this.createSessionData.title,
      "description": this.createSessionData.description,
      "gameId": this.gameId,
      "console": this.platform.name,
      "numSlots": this.createSessionData.numSlots,
      "sessionCost": this.createSessionData.sessionCost,
      "sessionTime": timeMS,
      "sessionDuration": "1:00:00",
      "gameAccountId": this.accountId
    };
    console.log(data);
    this.userSessionService.createUserSession(data);
    // window.location.reload();
  }

  cancel(): void {
    //noinspection TypeScriptUnresolvedFunction
    this.dialogRef.close();
  }

  timeToMilliseconds(time: string) {
    let list = time.split(":");
    let hour = (+list[0]);
    let minute = (+list[1]);
    let seconds = (hour * 60 * 60) + (minute * 60);
    return seconds * 1000;
  }

  getUserGameAccountsByGameId(gameId, riftId) {
    this.gameAccountService.getUserGameAccountsByGameID(gameId, riftId).subscribe(
      resBody => {
        console.log(resBody);
        for(let i = 0; i < resBody.length; i++) {
          let currAccount = resBody[i];
          let account: GameAccount = new GameAccount();
          account.gameName = currAccount.game.game;
          account.gameId = currAccount.gameId;
          account.ign = currAccount.ign;
          account.id = currAccount.id;
          account.gameIcon = SESSION_ICONS[account.gameId];
          this.gameAccounts.push(account);
        }
      }
    )
  }
}

// this.sub = this.route.parent.params.subscribe(params => {
//   this.sessionId = params["sessionId"];
// });
