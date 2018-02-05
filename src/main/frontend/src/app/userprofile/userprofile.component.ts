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
})
export class UserprofileComponent implements OnInit {
  currentUser: Userprofile = new Userprofile();
  followerUserprofiles: Userprofile[] = [];
  followingUserprofiles: Userprofile[] = [];
  loggedInUser: Userprofile = new Userprofile();
  loggedInFollowing: Userprofile[] = [];
  sessions: Session[] = [];
  broadcastNotificationList: Userprofile[] = [];
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
      this.getUserProfileInformation(params['rifttag']);
      this.getUserFollowersAndFollowing(params['rifttag']);
      this.getBroadcastNotifications(params['rifttag']);
      this.getUserSessions(params['rifttag']);
      this.getCurrentLoggedInUser();
    });
  }

  getCurrentLoggedInUser() {
    this.userProfileService.getUser(this.profile.nickname).subscribe(
      resBody => {
        this.loggedInUser.firstName = resBody.firstName;
        this.loggedInUser.lastName = resBody.lastName;
        this.loggedInUser.riftTag = resBody.riftTag;
        this.loggedInUser.gender = resBody.gender;
        this.loggedInUser.bio = resBody.bio;
        this.loggedInUser.id = resBody.id;
        this.loggedInUser.followers = resBody.followers.length;
        this.loggedInUser.followings = resBody.followings.length;
        for (var i = 0; i < this.loggedInUser.followings; i++) {
          var currFollowing = new Userprofile();
          currFollowing.firstName = resBody.followings[i].followingUsertable.firstName;
          currFollowing.lastName = resBody.followings[i].followingUsertable.lastName;
          currFollowing.riftTag = resBody.followings[i].followingUsertable.riftTag;
          this.loggedInFollowing.push(currFollowing);
        }
      }
    )
  }

  getUserProfileInformation(riftTag: string) {
    this.userProfileService.getUser(riftTag).subscribe(
        resBody => {
          this.currentUser.firstName = resBody.firstName;
          this.currentUser.lastName = resBody.lastName;
          this.currentUser.riftTag = resBody.riftTag;
          this.currentUser.gender = resBody.gender;
          this.currentUser.bio = resBody.bio;
          this.currentUser.id = resBody.id;
          this.currentUser.creatorActivityList = resBody.creatorActivityList;
          for (var i = 0; i < this.currentUser.creatorActivityList.length; i++) {
            this.currentUser.activities.push(new Activity(this.currentUser.creatorActivityList[i].notificationContent,
              this.currentUser.creatorActivityList[i].createdTime))
          }
      }
    )
  }

  isFollowing(riftTag: string): boolean {
    for (var i = 0; i < this.loggedInFollowing.length; i++) {
      var currFollowing = this.loggedInFollowing[i].riftTag;
      if (currFollowing == riftTag) {
        return true;
      }
    }
    return false;
  }

  // getUserSocialMedia(riftTag: string) {
  //   this.userProfileService.getUser(riftTag).subscribe(
  //     resBody => {
  //       this.currentUser.twitchAccount =
  //     }
  //   )
  // }

  getUserFollowersAndFollowing(riftTag: string) {
    this.userProfileService.getUser(riftTag).subscribe(
      resBody => {
        this.currentUser.followers = resBody.followers.length;
        this.currentUser.followings = resBody.followings.length;
        for (var i = 0; i < this.currentUser.followers; i++) {
          var currFollower = new Userprofile();
          currFollower.firstName = resBody.followers[i].followerUsertable.firstName;
          currFollower.lastName = resBody.followers[i].followerUsertable.lastName;
          currFollower.riftTag = resBody.followers[i].followerUsertable.riftTag;
          currFollower.id = resBody.followers[i].followerUsertable.id;
          this.followerUserprofiles.push(currFollower);
        }
        for (var i = 0; i < this.currentUser.followings; i++) {
          var currFollowing = new Userprofile();
          currFollowing.firstName = resBody.followings[i].followingUsertable.firstName;
          currFollowing.lastName = resBody.followings[i].followingUsertable.lastName;
          currFollowing.riftTag = resBody.followings[i].followingUsertable.riftTag;
          currFollowing.id = resBody.followings[i].followingUsertable.id;
          this.followingUserprofiles.push(currFollowing);
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  getBroadcastNotifications(riftTag: string) {
    this.userProfileService.getUser(riftTag).subscribe(
      resBody => {
        for (var i = 0; i < resBody.broadcastNotificationList.length; i++) {
          var currUser = new Userprofile();
          currUser.firstName = resBody.broadcastNotificationList[i].creatorUsertable.firstName;
          currUser.lastName = resBody.broadcastNotificationList[i].creatorUsertable.lastName;
          currUser.riftTag = resBody.broadcastNotificationList[i].creatorUsertable.riftTag;
          var currNotification = new Activity(resBody.broadcastNotificationList[i].notificationContent,
          resBody.broadcastNotificationList[i].createdTime);
          currUser.activities.push(currNotification);
          this.broadcastNotificationList.push(currUser);
        }
      }
    )
  }

  getUserSessions(riftTag: string) {
    this.userSessionsService.getUserRifterSessions(riftTag).subscribe(
      resBody => {
        this.currentUser.rifterSessions = resBody.rifterSessions;
        for (var i = 0; i < this.currentUser.rifterSessions.length; i++) {
          var currDateMS = this.currentUser.rifterSessions[i].sessionTime;
          var date = new Date(currDateMS);
          var currSession = new Session(
            resBody.firstName,
            resBody.lastName,
            resBody.riftTag,
            resBody.rifterRating,
            this.currentUser.rifterSessions[i].hostId,
            this.currentUser.rifterSessions[i].sessionCost,
            this.currentUser.rifterSessions[i].methodOfContact,
            this.currentUser.rifterSessions[i].sessionDuration,
            this.currentUser.rifterSessions[i].title,
            this.currentUser.rifterSessions[i].hits,
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
