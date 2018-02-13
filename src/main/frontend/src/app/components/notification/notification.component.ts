import { Component, OnInit, Input } from '@angular/core';
import {UsersessionsService} from "../../usersessions/usersessions.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  @Input() notification;
  constructor(private userSessionService: UsersessionsService) {
  }

  ngOnInit() {
    // console.log(this.notification);
  }

  acceptRequest() {
    let data = {
      "accepted": 2,
      "hostId": this.notification.userId,
      "sessionId": this.notification.sessionId,
      "rifteeId": this.notification.creatorId
    };
    this.userSessionService.updateSessionRequest(data);
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
    console.log("Rejected request");
  }

}
