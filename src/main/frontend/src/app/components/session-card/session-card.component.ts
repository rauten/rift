import { Component, OnInit, Input } from '@angular/core';
import {SESSION_ICONS} from "../../constants/session-icon-variables";
import {Session} from "./session";
import {UsersessionsService} from "../../usersessions/usersessions.service";

@Component({
  selector: 'app-session-card',
  templateUrl: 'session-card.component.html',
  styleUrls: ['session-card.component.scss']
})
export class SessionCardComponent implements OnInit {
  sessionIcon: string;
  @Input() session: Session;

  constructor(private userSessionsService: UsersessionsService) { }

  ngOnInit() {
    if(this.session.game == "League of Legends") {
      this.sessionIcon=SESSION_ICONS.leagueOfLegends;
    }
  }

  joinUserSession() {
    var loggedInUserId = JSON.parse(localStorage.getItem("loggedInUserID"));
    let data = {
      "rifteeId": loggedInUserId,
      "hostId": this.session.hostId,
      "sessionId": this.session.id,
      "accepted": false
    };
    console.log(this.session.hostId);
    // this.userSessionsService.joinUserSession(data);
    alert("Sent request");
  }

}
