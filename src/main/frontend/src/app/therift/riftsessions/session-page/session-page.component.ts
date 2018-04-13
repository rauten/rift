import {Component, OnInit, TemplateRef} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SessionPageService} from "./session-page.service";
import {Session} from "../../../models/session";
import {UserprofileService} from "../../../userprofile/userprofile.service";
import {UsersessionsService} from "../../../usersessions/usersessions.service";
import {SESSION_ICONS} from "../../../constants/session-icon-variables";
import {Userprofile} from "../../../models/userprofile";
import {MatDialog} from "@angular/material";
import {UpdateSessionComponent} from "./update-session/update-session.component";
import {CONSOLE_ICONS} from "../../../constants/console-icon-variables";
import {BsModalService, BsModalRef} from "ngx-bootstrap";
import {SharedFunctions} from "../../../shared/shared-functions";



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
  request: any;
  modalRef: BsModalRef;

  sessionIcon: string;
  consoleIcon: string;

  constructor(private route: ActivatedRoute, private sessionPageService: SessionPageService,
              private userProfileService: UserprofileService, private userSessionsService: UsersessionsService,
              public dialog: MatDialog, private modalService: BsModalService, private sharedFunc: SharedFunctions) {
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
        this.response = resBody;
        this.session.id = this.response.id;
        this.session.hostId = this.response.hostId;
        this.session.riftTag = this.response.usertable.riftTag;
        this.session.rifterRating = this.response.usertable.rifterRating;
        this.session.firstName = this.response.usertable.firstName;
        this.session.lastName = this.response.usertable.lastName;
        this.session.methodOfContact = this.response.methodOfContact;
        this.session.title = this.response.title;
        this.session.description = this.response.description;
        this.session.hits = this.response.hits;
        this.session.sessionTime = this.response.sessionTime;
        this.session.sessionCost = this.response.sessionCost;
        this.session.numSlots = this.response.numSlots;
        this.session.gameId = this.response.gameId;
        this.session.console = this.response.console;
        this.sessionIcon = SESSION_ICONS[this.session.gameId];
        this.consoleIcon = CONSOLE_ICONS[this.session.console];
        this.getSessionRiftees(this.response.players);
        this.checkRifteeStatus(this.session.id);
      }
    )
  }

  checkRifteeStatus(sessionId: number){
    this.sessionPageService.checkRifteeStatus(sessionId, this.loggedInUserId).subscribe(
      resBody => {
        this.request = resBody;
      }
    )
  }

  getSessionRiftees(players: any) {
    this.session.riftees = [];
    for (let i = 0; i < players.length; i++) {
      let riftee = new Userprofile();
      let player = players[i];
      riftee.firstName = player.firstName;
      riftee.lastName = player.lastName;
      riftee.riftTag = player.riftTag;
      riftee.rifteeRating = player.rifteeRating;
      riftee.id = player.id;
      this.sharedFunc.getUserProfilePicture(riftee.riftTag, riftee);
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
    this.userProfileService.getUserId(riftTag).subscribe(
      resBody => {
        this.loggedInUserId = resBody.id;
      }
    )
  }

  openUpdateSessionDialog() {
    this.dialog.open(UpdateSessionComponent, {
      data: {
        sessionTime: this.session.sessionTime,
        sessionId: this.session.id,
      }
    });

  }

  changeStatus(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  remove(item) {
    this.session.riftees.splice(this.session.riftees.indexOf(item),1);
  }

  cancelSessionRequest() {
    this.sessionPageService.cancelSessionRequest(this.session.id, this.loggedInUserId);
  }

}
