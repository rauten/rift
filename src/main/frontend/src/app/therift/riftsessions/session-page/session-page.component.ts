import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SessionPageService} from "./session-page.service";
import {Session} from "../../../models/session";
import {UserprofileService} from "../../../userprofile/userprofile.service";
import {UsersessionsService} from "../../../usersessions/usersessions.service";

@Component({
  selector: 'app-session-page',
  templateUrl: './session-page.component.html',
  styleUrls: ['./session-page.component.scss']
})
export class SessionPageComponent implements OnInit {
  sub: any;
  id: number;
  session: Session = new Session();
  response: any;
  isLoggedIn: boolean = false;
  profile: any;
  loggedInUserId: number;

  constructor(private route: ActivatedRoute, private sessionPageService: SessionPageService,
  private userProfileService: UserprofileService, private userSessionsService: UsersessionsService) {
    this.profile = JSON.parse(localStorage.getItem('profile'));
    if(this.profile != null) {
      this.isLoggedIn = true;
    }
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if(this.isLoggedIn) {
        this.getLoggedInUserId(JSON.parse(localStorage.getItem("profile")).nickname);
      }
      this.id = params['sessionId'];
      this.getSessionById();
    });
  }

  getSessionById() {
    this.sessionPageService.getSessionById(this.id).subscribe(
      resBody => {
        console.log(resBody);
        this.response = resBody;
        this.session.id = this.response.id;
        this.session.riftTag = this.response.usertable.riftTag;
        this.session.rifterRating = this.response.usertable.rifterRating;
        this.session.firstName = this.response.usertable.firstName;
        this.session.lastName = this.response.usertable.lastName;
        this.session.methodOfContact = this.response.methodOfContact;
        this.session.title = this.response.title;
        this.session.hits = this.response.hits;
        this.session.sessionTime = this.response.sessionTime;
        this.session.sessionCost = this.response.sessionCost;
        this.session.numSlots = this.response.numSlots;
      }
    )
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
}
