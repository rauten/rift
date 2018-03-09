import { Component, OnInit, Input } from '@angular/core';
import {UsersessionsService} from "../../usersessions/usersessions.service";
import {Http} from "@angular/http";
import {UserprofileService} from "../../userprofile/userprofile.service";
import {Notification} from "../../models/notification";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  @Input() notification;
  hasProfilePic = true;
  status: number;
  creatorRiftTag: string;
  creatorProfilePic: string;
  constructor(private userSessionService: UsersessionsService, private userProfileService: UserprofileService) {
  }

  ngOnInit() {
    this.getRiftTagById(this.notification.creatorId);
    this.getNotificationProfilePicture(this.creatorRiftTag, this.notification);
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

  getRiftTagById(id) {
    this.userProfileService.getUserRiftTag(this.notification.creatorId).subscribe(
      resBody => {
        //noinspection TypeScriptUnresolvedVariable
        this.creatorRiftTag = resBody.riftTag;
      })
  }

  getNotificationProfilePicture(riftTag: string, notification: Notification) {
    this.userProfileService.getProfilePicture(riftTag).subscribe(
      resBody => {
        if (resBody.image == "") {
          notification.creatorProfilePic = "https://www.vccircle.com/wp-content/uploads/2017/03/default-profile.png"
        } else {
          notification.creatorProfilePic = resBody.image;
        }
      }
    );
  }

}
