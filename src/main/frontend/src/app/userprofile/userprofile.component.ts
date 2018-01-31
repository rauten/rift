import { Component, OnInit } from '@angular/core';
import {Userprofile} from "./models/userprofile"

import {UserprofileService} from "./userprofile.service";
import {UsersessionsService} from "../usersessions/usersessions.service";

import {Activity} from "./models/activity";
import {Session} from "../usersessions/models/session-card/session";

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css'],
})
export class UserprofileComponent implements OnInit {
  userprofile: Userprofile = new Userprofile();
  activities: Activity[] = [];
  sessions: Session[] = [];

  constructor(private userProfileService: UserprofileService,
  private userSessionsService: UsersessionsService) {
  }

  ngOnInit() {
    this.getUserById();
    this.getUserFollowersAndFollowing();
    this.getUserSessions();
  }

  getUserById() {
    this.userProfileService.getUser().subscribe(
      resBody => {
        this.userprofile.firstName = resBody.firstName;
        this.userprofile.firstName = resBody.firstName;
        this.userprofile.lastName = resBody.lastName;
        this.userprofile.rifterRating = resBody.rifterRating;
        this.userprofile.rifteeRating = resBody.rifteeRating;
        this.userprofile.id = resBody.id;
        this.userprofile.gender = resBody.gender;
        this.userprofile.riftTag = resBody.riftTag;
        this.userprofile.twitchAccount = resBody.twitchAccount;
        this.userprofile.youtubeAccount = resBody.youtubeAccount;
        this.userprofile.creatorActivityList = resBody.creatorActivityList;
        this.userprofile.bio = resBody.bio;
        for (var i = 0; i < this.userprofile.creatorActivityList.length; i++) {
          this.activities.push(new Activity(this.userprofile.creatorActivityList[i].notificationContent,
            this.userprofile.creatorActivityList[i].createdTime))
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  getUserFollowersAndFollowing() {
    this.userProfileService.getUserFollowersAndFollowing().subscribe(
      resBody => {
        this.userprofile.followers = resBody.followers.length;
        this.userprofile.followings = resBody.followings.length;
      },
      err => {
        console.log(err);
      }
    )
  }

  getUserSessions() {
    this.userSessionsService.getUserSessions().subscribe(
      resBody => {
        this.userprofile.rifterSessions = resBody.rifterSessions;
        for (var i = 0; i < this.userprofile.rifterSessions.length; i++) {
          var currDateMS = this.userprofile.rifterSessions[i].sessionTime;
          var date = new Date(currDateMS);
          var currSession = new Session(
            resBody.firstName,
            resBody.lastName,
            resBody.riftTag,
            resBody.rifterRating,
            this.userprofile.rifterSessions[i].hostId,
            this.userprofile.rifterSessions[i].sessionCost,
            this.userprofile.rifterSessions[i].methodOfContact,
            this.userprofile.rifterSessions[i].sessionDuration,
            this.userprofile.rifterSessions[i].title,
            this.userprofile.rifterSessions[i].hits,
            date
          );
          this.sessions.push(currSession);
        }
        for(var i = 0; i < this.sessions.length; i++) {
          console.log(this.sessions[i]);
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}
