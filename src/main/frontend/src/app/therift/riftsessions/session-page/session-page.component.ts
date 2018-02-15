import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SessionPageService} from "./session-page.service";
import {Session} from "../../../models/session";
import {UserprofileService} from "../../../userprofile/userprofile.service";
import {UsersessionsService} from "../../../usersessions/usersessions.service";
import {SESSION_ICONS} from "../../../constants/session-icon-variables";
import {Userprofile} from "../../../models/userprofile";
import {MatDialog} from "@angular/material";
import {UpdateSessionComponent} from "./update-session/update-session.component";



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
  sessionIcon: string;

  constructor(private route: ActivatedRoute, private sessionPageService: SessionPageService,
              private userProfileService: UserprofileService, private userSessionsService: UsersessionsService,
              public dialog: MatDialog) {
    this.profile = JSON.parse(localStorage.getItem('profile'));
    if (this.profile != null) {
      this.isLoggedIn = true;
    }
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (this.isLoggedIn) {
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
        this.session.game = this.response.game;
        if (this.session.game == "League of Legends") {
          this.sessionIcon = SESSION_ICONS.leagueOfLegends;
        } else if (this.session.game == "Fortnite") {
          this.sessionIcon = SESSION_ICONS.fortnite;
        }
        this.getSessionRiftees(this.response.players);
      }
    )
  }

  getSessionRiftees(players: any) {
    this.session.riftees = [];
    for (var i = 0; i < players.length; i++) {
      var riftee = new Userprofile();
      var player = players[i];
      riftee.firstName = player.firstName;
      riftee.lastName = player.lastName;
      riftee.riftTag = player.riftTag;
      riftee.rifteeRating = player.rifteeRating;
      this.session.riftees.push(riftee);
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

  getLoggedInUserId(riftTag: string) {
    if (JSON.parse(localStorage.getItem("loggedInUserID")) != null) {
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

  openDialog() {
    //noinspection TypeScriptUnresolvedFunction
    this.dialog.open(UpdateSessionComponent, {
      data: {
        sessionTime: this.session.sessionTime,
        sessionId: this.session.id
      }
    });

  }

}

  @Component({
    selector: 'dialog-content-example-dialog',
    templateUrl: 'dialog-content-example-dialog.html',
  })

  export class DialogContentExampleDialog {}

