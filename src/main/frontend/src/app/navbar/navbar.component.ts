import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Userprofile} from "../models/userprofile";
import {UserprofileService} from "../userprofile/userprofile.service";
import {Notification} from "../models/notification";
import {Globals} from "../global/globals";
import {NotificationsService} from "../userprofile/notifications.service";
import {SharedFunctions} from "../shared/shared-functions";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser: Userprofile = new Userprofile();
  loggedInUserId: number;
  profile: any;
  loggedInUser: Userprofile = new Userprofile();
  @Input() notificationsList;


  constructor(public auth: AuthService, private userProfileService: UserprofileService,
  private notificationService: NotificationsService, private globals: Globals, private sharedFunc: SharedFunctions) {
    console.log("Setting this.profile in navbar constructor");
    this.profile = JSON.parse(localStorage.getItem('profile'));
    console.log("Local storage profile in navbar constructor: " + localStorage.getItem('profile'));
    if(this.profile) {
      this.loggedInUser.firstName = this.profile["http://riftgaming:auth0:com/user_metadata"].firstName;
      this.loggedInUser.lastName  = this.profile["http://riftgaming:auth0:com/user_metadata"].lastName;
      this.sharedFunc.getUserProfilePicture(this.profile.nickname, this.loggedInUser);
    }
  }

  clearUnseen() {
    this.globals.unseenNotifications = 0;
    this.notificationService.clearUnseen(this.profile.nickname);
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
