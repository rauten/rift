import {Component, Input, OnInit} from '@angular/core';
import {Activity} from "../../models/activity";
import {Userprofile} from "../../models/userprofile";
import {SessionPageService} from "../../therift/riftsessions/session-page/session-page.service";
import {CONSOLE_ICONS} from "../../constants/console-icon-variables";
import {SESSION_ICONS} from "../../constants/session-icon-variables";
import {Session} from "../../models/session";
import {SessionRequest} from "../../models/session-request";

@Component({
  selector: 'app-activity-card',
  templateUrl: './activity-card.component.html',
  styleUrls: ['./activity-card.component.scss']
})
export class ActivityCardComponent implements OnInit {
  @Input() activity: Activity;
  @Input() currentUser: Userprofile;

  // For the session card
  @Input() request: SessionRequest;
  @Input() isLoggedIn: boolean;
  @Input() loggedInUserId: number;
  response: any;
  session: Session = new Session();

  isDataAvailable:boolean = false;


  constructor(private sessionPageService: SessionPageService) {
  }

  ngOnInit() {
    this.getSessionById();
  }

  getSessionById() {
    this.sessionPageService.getSessionById(this.activity.sessionId).subscribe(
      resBody => {
        this.response = resBody;
        this.session.id = this.response.id;
        this.session.hostId = this.response.hostId;
        this.session.riftTag = this.response.usertable.riftTag;
        this.session.rifterRating = this.response.usertable.rifterRating;
        this.session.firstName = this.response.usertable.firstName;
        this.session.lastName = this.response.usertable.lastName;
        this.session.title = this.response.title;
        this.session.sessionTime = this.response.sessionTime;
        this.session.gameId = this.response.gameId;
        this.session.console = this.response.console;
        if(this.session.hostId == this.loggedInUserId) {
          this.session.type = true;
        } else {
          this.session.type = false;
        }
        this.isDataAvailable = true;
      }
    )
  }

}
