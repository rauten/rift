import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {SearchBarService} from "../components/search-bar/search-bar.service";
import {Userprofile} from "../models/userprofile";
import {UserprofileService} from "../userprofile/userprofile.service";
import {Notification} from "../models/notification";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  searchQuery: string = "";
  currentUser: Userprofile = new Userprofile();

  constructor(public auth: AuthService, private searchBarService: SearchBarService,
  private userProfileService: UserprofileService) {
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('profile'));
  }

  ngOnInit() {
    this.getUserNotifications(JSON.parse(localStorage.getItem('profile')).nickname);
  }

  getUserSearchResults(searchQuery: string) {
    this.searchBarService.getSearchResults(searchQuery).subscribe(
      resBody => {
        console.log(resBody[0]);
        localStorage.setItem('userSearchResults', resBody[0]);
      }
    );
  }

  getUserNotifications(riftTag: string) {
    this.currentUser.notifications = [];
    this.userProfileService.getUser(riftTag).subscribe(
      resBody => {
        for (var i = 0; i < resBody.notificationList.length; i++) {
          var notification = new Notification();
          notification.id = resBody.notificationList[i].id;
          notification.createdTime = resBody.notificationList[i].createdTime;
          notification.creatorId = resBody.notificationList[i].creatorId;
          notification.notificationType = resBody.notificationList[i].notificationType;
          notification.notificationContent = resBody.notificationList[i].notificationContent;
          notification.sessionId = resBody.notificationList[i].sessionId;
          notification.userId = resBody.notificationList[i].userId;
          this.currentUser.notifications.push(notification);
        }
        console.log(this.currentUser.notifications);
      }
    )
  }

}
