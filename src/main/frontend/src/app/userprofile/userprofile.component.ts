import { Component, OnInit } from '@angular/core';
import {Userprofile} from "./models/userprofile"

import {UserprofileService} from "./userprofile.service";
import {UsersessionsService} from "../usersessions/usersessions.service";

import {Activity} from "./models/activity";
import {Session} from "../usersessions/models/session-card/session";
import {AuthService} from "../auth/auth.service";
import {CapitalizePipe} from "../pipes/capitalize.pipe";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css'],
  pipes: [CapitalizePipe]
})
export class UserprofileComponent implements OnInit {
  userprofile: Userprofile = new Userprofile();
  followerUserprofiles: Userprofile[] = [];
  followingUserprofiles: Userprofile[] = [];
  sessions: Session[] = [];
  broadcastNotifications: Userprofile[] = [];
  profile: any;
  sub: any;
  currUser: any;

  constructor(private userProfileService: UserprofileService,
  private userSessionsService: UsersessionsService,
  public auth: AuthService, private route: ActivatedRoute) {
    this.profile = JSON.parse(localStorage.getItem('profile'));
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.currUser = params['rifttag'];
      console.log("rifttag: " + params['rifttag']);
    });

    this.getUserById();
    this.getUserFollowersAndFollowing();
    this.getBroadcastNotifications();
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
          this.userprofile.activities.push(new Activity(this.userprofile.creatorActivityList[i].notificationContent,
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
        for (var i = 0; i < this.userprofile.followers; i++) {
          var currFollower = new Userprofile();
          currFollower.firstName = resBody.followers[i].followerUsertable.firstName;
          currFollower.lastName = resBody.followers[i].followerUsertable.lastName;
          currFollower.riftTag = resBody.followers[i].followerUsertable.riftTag;
          this.followerUserprofiles.push(currFollower);
        }
        for (var i = 0; i < this.userprofile.followings; i++) {
          var currFollowing = new Userprofile();
          currFollowing.firstName = resBody.followings[i].followingUsertable.firstName;
          currFollowing.lastName = resBody.followings[i].followingUsertable.lastName;
          currFollowing.riftTag = resBody.followings[i].followingUsertable.riftTag;
          this.followingUserprofiles.push(currFollowing);
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  getBroadcastNotifications() {
    this.userProfileService.getBroadcastNotifications().subscribe(
      resBody => {
        for (var i = 0; i < resBody.broadcastNotifications.length; i++) {
          console.log(resBody.broadcastNotifications[i]);
          var currUser = new Userprofile();
          currUser.firstName = resBody.broadcastNotifications[i].creatorUsertable.firstName;
          currUser.lastName = resBody.broadcastNotifications[i].creatorUsertable.lastName;
          currUser.riftTag = resBody.broadcastNotifications[i].creatorUsertable.riftTag;
          var currNotification = new Activity(resBody.broadcastNotifications[i].notificationContent,
          resBody.broadcastNotifications[i].createdTime);
          currUser.activities.push(currNotification);
          this.broadcastNotifications.push(currUser);
        }
        console.log(this.broadcastNotifications);
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
      },
      err => {
        console.log(err);
      }
    );
  }
}
