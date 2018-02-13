import { Component, OnInit, Input } from '@angular/core';
import {SESSION_ICONS} from "../../constants/session-icon-variables";
import {Session} from "../../models/session";
import {UsersessionsService} from "../../usersessions/usersessions.service";
import {UserprofileService} from "../../userprofile/userprofile.service";

@Component({
  selector: 'app-session-card',
  templateUrl: 'session-card.component.html',
  styleUrls: ['session-card.component.scss']
})
export class SessionCardComponent implements OnInit {
  sessionIcon: string;
  @Input() session: Session;
  @Input() request: boolean;
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
      console.log("test: " + JSON.parse(localStorage.getItem("loggedInUserID")));
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
      "accepted": 1
    };
    console.log(data);
    this.userSessionsService.joinUserSession(data);
    alert("Sent request");
  }
}
