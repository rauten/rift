import { Component, OnInit, Input } from '@angular/core';
import {UsersessionsService} from "../../usersessions/usersessions.service";
import {Http} from "@angular/http";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  @Input() notification;
  hasProfilePic = true;
  status: number;
  constructor(private userSessionService: UsersessionsService) {
  }

  ngOnInit() {
    if(this.notification.notificationType-2 != 0) {
      this.getSessionStatus(this.notification.creatorId, this.notification.sessionId);
    }
    if(this.notification.creatorProfilePic == "") {
      this.hasProfilePic = false;
    }
  }

  getSessionStatus(rifteeId: number, sessionId: number) {
    this.userSessionService.getSessionStatus(rifteeId, sessionId).subscribe(
      resBody => {
        //noinspection TypeScriptUnresolvedVariable
        this.status = resBody.status;
      }
    )
  }
}
