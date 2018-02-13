import { Component, OnInit, Input } from '@angular/core';
import {UsersessionsService} from "../../usersessions/usersessions.service";

@Component({
  selector: 'app-session-accept-reject-button',
  templateUrl: './session-accept-reject-button.component.html',
  styleUrls: ['./session-accept-reject-button.component.scss']
})
export class SessionAcceptRejectButtonComponent implements OnInit {
  @Input() status: number;
  @Input() notification;

  constructor(private userSessionService: UsersessionsService) { }

  ngOnInit() {
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
