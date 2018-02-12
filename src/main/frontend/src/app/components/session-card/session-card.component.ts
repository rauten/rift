import { Component, OnInit, Input } from '@angular/core';
import {SESSION_ICONS} from "../../constants/session-icon-variables";
import {Session} from "../../models/session";
import {UsersessionsService} from "../../usersessions/usersessions.service";

@Component({
  selector: 'app-session-card',
  templateUrl: 'session-card.component.html',
  styleUrls: ['session-card.component.scss']
})
export class SessionCardComponent implements OnInit {
  sessionIcon: string;
  @Input() session: Session;
  profile: any;
  loggedInUserId: number;

  constructor(private userSessionsService: UsersessionsService) {
    this.loggedInUserId = JSON.parse(localStorage.getItem("loggedInUserID"));
  }

  ngOnInit() {
    if(this.session.game == "League of Legends") {
      this.sessionIcon=SESSION_ICONS.leagueOfLegends;
    } else if (this.session.game == "Fortnite") {
      this.sessionIcon=SESSION_ICONS.fortnite;
    }
  }

  joinUserSession() {
    let data = {
      "rifteeId": this.loggedInUserId,
      "hostId": this.session.hostId,
      "sessionId": this.session.id,
      "accepted": false
    };
    this.userSessionsService.joinUserSession(data);
    alert("Sent request");
  }

}
