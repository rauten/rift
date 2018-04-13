import { Component, OnInit, Input } from '@angular/core';
import {UsersessionsService} from "../../usersessions/usersessions.service";
import {UserprofileService} from "../../userprofile/userprofile.service";

@Component({
  selector: 'app-session-accept-reject-button',
  templateUrl: './session-accept-reject-button.component.html',
  styleUrls: ['./session-accept-reject-button.component.scss']
})
export class SessionAcceptRejectButtonComponent implements OnInit {
  @Input() status: number;
  @Input() notification;
  profile: any;
  constructor(private userSessionService: UsersessionsService, private userProfileService: UserprofileService) {
    this.profile = JSON.parse(localStorage.getItem('profile'));
  }

  ngOnInit() {
  }

  sendConfirmationEmail() {
    let rifterEmail = {
      "to": this.profile.email,
      "subject": "To the rifter",
      "message": "rifter"
    };
    let rifteeEmail = {
      "to": this.notification.creatorEmail,
      "subject": "To the riftee",
      "message": "hello there im in the message of the user profile"
    };
    console.log("Sent confirmation to " + rifterEmail.to);
    console.log("Sent confirmation to " + rifteeEmail.to);
    this.userProfileService.sendConfirmationEmail(rifterEmail);
    this.userProfileService.sendConfirmationEmail(rifteeEmail);
  }

  acceptRequest() {
    let data = {
      "accepted": 2,
      "hostId": this.notification.userId,
      "sessionId": this.notification.sessionId,
      "rifteeId": this.notification.creatorId
    };
    this.userSessionService.updateSessionRequest(data);
    this.status = 2;
    this.sendConfirmationEmail();
    console.log("Accepted request");
  }

  rejectRequest() {
    let data = {
      "accepted": 0,
      "hostId": this.notification.userId,
      "sessionId": this.notification.sessionId,
      "rifteeId": this.notification.creatorId
    };
    this.userSessionService.updateSessionRequest(data);
    this.status = 0;
    console.log("Rejected request");
  }
}
