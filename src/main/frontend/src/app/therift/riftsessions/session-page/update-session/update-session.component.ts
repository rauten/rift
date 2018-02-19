import { Component, OnInit, Input, Inject } from '@angular/core';
import {Session} from "../../../../models/session";
import {SessionDateTime} from "./data/sessionDateTime";
import {UpdateSessionService} from "./data/update-session.service";
import {ActivatedRoute} from "@angular/router";
import {MAT_DIALOG_DATA} from "@angular/material";
import {GAMES} from "../../../../constants/games";
import {CONSOLES} from "../../../../constants/consoles";

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

  constructor(private updateSessionService: UpdateSessionService, private route: ActivatedRoute,
  @Inject(MAT_DIALOG_DATA) public data: any) {
    this.games = GAMES;
    this.consoles = CONSOLES;
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
      "game_id": this.gameId,
      "console": this.platform,
      "numSlots": this.updateSessionData.numSlots,
      "sessionCost": this.updateSessionData.sessionCost,
      "sessionTime": timeMS,
      "sessionDuration": "1:00:00"
    };
    console.log(data);
    this.updateSessionService.updateUserSession(data);
  }

  timeToMilliseconds(time: string) {
    var list = time.split(":");
    var hour = (+list[0]);
    var minute = (+list[1]);
    var seconds = (hour * 60 * 60) + (minute * 60);
    return seconds * 1000;
  }
}

// this.sub = this.route.parent.params.subscribe(params => {
//   this.sessionId = params["sessionId"];
// });
