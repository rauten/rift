import { Component, OnInit, Input } from '@angular/core';
import {SESSION_ICONS} from "../../constants/session-icon-variables";
import {Session} from "../../models/session";
import {UsersessionsService} from "../../usersessions/usersessions.service";
import {UserprofileService} from "../../userprofile/userprofile.service";
import {SessionRequest} from "../../models/session-request";
import {CONSOLE_ICONS} from "../../constants/console-icon-variables";

@Component({
  selector: 'app-session-card',
  templateUrl: 'session-card.component.html',
  styleUrls: ['session-card.component.scss']
})
export class SessionCardComponent implements OnInit {
  sessionIcon: string;
  consoleIcon: string;

  @Input() session: Session;
  @Input() request: SessionRequest;
  @Input() isLoggedIn: boolean;
  @Input() type: boolean;
  profile: any;
  loggedInUserId: number;

  constructor(private userSessionsService: UsersessionsService, private userProfileService: UserprofileService) {
  }

  getLoggedInUserId(riftTag: string) {
    if(JSON.parse(localStorage.getItem("loggedInUserID")) != null) {
      this.loggedInUserId = JSON.parse(localStorage.getItem("loggedInUserID"));
    } else {
      this.userProfileService.getUserId(riftTag).subscribe(
        resBody => {
          this.loggedInUserId = resBody.id;
        }
      )
    }
  }

  ngOnInit() {
    if(this.isLoggedIn) {
      this.getLoggedInUserId(JSON.parse(localStorage.getItem("profile")).nickname);
    }
    this.sessionIcon=SESSION_ICONS[this.session.gameId];
    this.consoleIcon=CONSOLE_ICONS[this.session.console];
  }

  joinUserSession() {
    let data = {
      "rifteeId": this.loggedInUserId,
      "hostId": this.session.hostId,
      "sessionId": this.session.id,
      "accepted": 1
    };
    console.log(data);
    this.userSessionsService.joinUserSession(data);
    alert("Sent request");
  }
}
