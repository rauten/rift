import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {SearchBarService} from "../components/search-bar/search-bar.service";
import {Userprofile} from "../models/userprofile";
import {UserprofileService} from "../userprofile/userprofile.service";
import {Notification} from "../models/notification";
import {NOTIFICATION_CONTENT} from "../constants/notification-content";
import {Globals} from "../global/globals";
import {NotificationsService} from "../userprofile/notifications.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser: Userprofile = new Userprofile();
  loggedInUserId: number;
  profile: any;
  @Input() notificationsList;


  constructor(public auth: AuthService, private userProfileService: UserprofileService,
  private notificationService: NotificationsService, private globals: Globals) {
    this.profile = JSON.parse(localStorage.getItem('profile'));
  }

  clearUnseen() {
    this.globals.unseenNotifications = 0;
    let profile = JSON.parse(localStorage.getItem('profile'));
    this.notificationService.clearUnseen(profile.nickname);
  }

  ngOnInit() {
  }

  getNotificationProfilePicture(riftTag: string, notification: Notification): string {
    this.userProfileService.getProfilePicture(riftTag).subscribe(
      resBody => {
        if (resBody.image == "") {
          notification.creatorProfilePic = "https://www.vccircle.com/wp-content/uploads/2017/03/default-profile.png"
        } else {
          notification.creatorProfilePic = resBody.image;
        }
      }
    );
    return;
  }

}
