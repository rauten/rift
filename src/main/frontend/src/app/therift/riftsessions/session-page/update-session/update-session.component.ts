import { Component, OnInit, Input, Inject } from '@angular/core';
import {Session} from "../../../../models/session";
import {SessionDateTime} from "./data/sessionDateTime";
import {UpdateSessionService} from "./data/update-session.service";
import {ActivatedRoute} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {GAMES} from "../../../../constants/games";
import {CONSOLES} from "../../../../constants/consoles";
import {GameAccount} from "../../../../models/game-account";
import {SESSION_ICONS} from "../../../../constants/session-icon-variables";
import {GameAccountService} from "../../../../userprofile/game-account/game-account.service";
import {UserprofileService} from "../../../../userprofile/userprofile.service";

@Component({
  selector: 'app-update-session',
  templateUrl: './update-session.component.html',
  styleUrls: ['./update-session.component.scss']
})
export class UpdateSessionComponent implements OnInit {
  title = "Update this session";
  currentSession: Session = new Session();
  currentSessionDateTime: SessionDateTime = new SessionDateTime();
  sub: any;
  @Input() updateSessionData;
  games: any;
  consoles: any;
  gameId: any;
  platform: any;
  gameAccounts: GameAccount[] = [];
  accountId: any;
  loggedInUserId: any;
  profile: any;

  //noinspection JSAnnotator
  constructor(private updateSessionService: UpdateSessionService, private route: ActivatedRoute,
  @Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<UpdateSessionComponent>,
  private gameAccountService: GameAccountService, private userProfileService: UserprofileService) {
    this.games = GAMES;
    this.consoles = CONSOLES;
    this.profile = JSON.parse(localStorage.getItem("profile"));
    this.getLoggedInUserId(this.profile.nickname);

  }

  ngOnInit() {
    this.currentSession = this.updateSessionService.getSessionData();
    this.updateSessionData = this.updateSessionService.getFormData();
  }

  save() {
    this.updateSessionService.setSessionData(this.currentSession, this.currentSessionDateTime);
    var d = new Date(this.data.sessionTime);
    var currDate = d.toLocaleDateString();
    var currTime = d.toLocaleTimeString("en-Us", {hour12: false, hour: '2-digit', minute:'2-digit'});
    if (this.updateSessionData.sessionDate) {
      var newD = this.updateSessionData.sessionDate;
      currDate = newD.toLocaleDateString();
    }
    if (this.updateSessionData.sessionTime) {
      currTime = this.updateSessionData.sessionTime;
    }
    var date = new Date(currDate);
    var timeMS = this.timeToMilliseconds(currTime) + date.getTime();
    let data = {
      "id": this.data.sessionId,
      "title": this.updateSessionData.title,
      "description": this.updateSessionData.description,
      "gameId": this.gameId,
      "console": this.platform,
      "numSlots": this.updateSessionData.numSlots,
      "sessionCost": this.updateSessionData.sessionCost,
      "sessionTime": timeMS,
      "sessionDuration": "1:00:00",
      "gameAccountId": this.accountId
    };
    console.log(data);
    this.updateSessionService.updateUserSession(data);
    //noinspection TypeScriptUnresolvedFunction
    this.dialogRef.close();
    window.location.reload();
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

  timeToMilliseconds(time: string) {
    var list = time.split(":");
    var hour = (+list[0]);
    var minute = (+list[1]);
    var seconds = (hour * 60 * 60) + (minute * 60);
    return seconds * 1000;
  }

  cancelSession() {
    this.updateSessionService.cancelSession(this.data.sessionId);
  }

  cancel(): void {
    //noinspection TypeScriptUnresolvedFunction
    this.dialogRef.close();
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
