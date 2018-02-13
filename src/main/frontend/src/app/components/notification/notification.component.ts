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
  constructor(private userSessionService: UsersessionsService) {
  }

  ngOnInit() {
    // console.log(this.notification);
  }

  getSessionStatus(rifteeId: number, sessionId: number) {
    this.userSessionService.getSessionStatus(rifteeId, sessionId);
  }
}
