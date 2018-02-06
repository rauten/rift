import {Component, OnInit} from '@angular/core';
import {Userprofile} from "./models/userprofile"

import {UserprofileService} from "./userprofile.service";
import {UsersessionsService} from "../usersessions/usersessions.service";

import {Activity} from "./models/activity";
import {Session} from "../usersessions/models/session-card/session";
import {AuthService} from "../auth/auth.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css'],
})
export class UserprofileComponent implements OnInit {
  currentUser: Userprofile = new Userprofile();
  loggedInUser: Userprofile = new Userprofile();
  profile: any;
  sub: any;
  currUser: any;
  following = false;
  isDataAvailable:boolean = false;

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
      this.isDataAvailable = this.getBroadcastNotifications(params['rifttag']);
      this.getUserSessions(params['rifttag']);
      this.getCurrentLoggedInUser();
      console.log(this.isDataAvailable);
    });
  }


  getCurrentLoggedInUser():any {
    this.userProfileService.getUser(this.profile.nickname).subscribe(
      resBody => {
        this.loggedInUser.firstName = resBody.firstName;
        this.loggedInUser.lastName = resBody.lastName;
        this.loggedInUser.riftTag = resBody.riftTag;
        this.loggedInUser.gender = resBody.gender;
        this.loggedInUser.bio = resBody.bio;
        this.loggedInUser.id = resBody.id;
        for (var i = 0; i < resBody.followings.length; i++) {
          var currFollowing = new Userprofile();
          currFollowing.firstName = resBody.followings[i].followingUsertable.firstName;
          currFollowing.lastName = resBody.followings[i].followingUsertable.lastName;
          currFollowing.riftTag = resBody.followings[i].followingUsertable.riftTag;
          this.loggedInUser.followings.push(currFollowing);
        }
        console.log("5");
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
            var currActivity = new Activity();
            currActivity.notificationType = this.currentUser.creatorActivityList[i].notificationType;
            currActivity.notificationContent = this.currentUser.creatorActivityList[i].notificationContent;
            currActivity.createdTime = this.currentUser.creatorActivityList[i].createdTime;
            // currActivity.rifterSession= this.currentUser.creatorActivityList[i].rifterSession;
            this.currentUser.activities.push(currActivity);
          }
          console.log("1");
      }
    )
  }

  isFollowing(riftTag: string) {
    for (var i = 0; i < this.loggedInUser.followings.length; i++) {
      var currFollowing = this.loggedInUser.followings[i].riftTag;
      if (currFollowing == riftTag) {
        this.following = true;
        return true;
      }
    }
    this.following = false;

  }

  // getUserSocialMedia(riftTag: string) {
  //   this.userProfileService.getUser(riftTag).subscribe(
  //     resBody => {
  //       this.currentUser.twitchAccount =
  //     }
  //   )
  // }

  getUserFollowersAndFollowing(riftTag: string) {
    this.currentUser.followings = [];
    this.currentUser.followers = [];
    this.userProfileService.getUser(riftTag).subscribe(
      resBody => {
        for (var i = 0; i < resBody.followers.length; i++) {
          var currFollower = new Userprofile();
          currFollower.firstName = resBody.followers[i].followerUsertable.firstName;
          currFollower.lastName = resBody.followers[i].followerUsertable.lastName;
          currFollower.riftTag = resBody.followers[i].followerUsertable.riftTag;
          currFollower.id = resBody.followers[i].followerUsertable.id;
          this.currentUser.followers.push(currFollower);
        }
        for (var i = 0; i < resBody.followings.length; i++) {
          var currFollowing = new Userprofile();
          currFollowing.firstName = resBody.followings[i].followingUsertable.firstName;
          currFollowing.lastName = resBody.followings[i].followingUsertable.lastName;
          currFollowing.riftTag = resBody.followings[i].followingUsertable.riftTag;
          currFollowing.id = resBody.followings[i].followingUsertable.id;
          this.currentUser.followings.push(currFollowing);
        }
        console.log("2");
      },
      err => {
        console.log(err);
      }
    )
  }

  getBroadcastNotifications(riftTag: string):any {
    this.currentUser.feed = [];
    this.userProfileService.getUser(riftTag).subscribe(
      resBody => {
        for (var i = 0; i < resBody.broadcastNotificationList.length; i++) {
          var currNotification = new Activity();
          currNotification.notificationType = resBody.broadcastNotificationList[i].notificationType;
          currNotification.notificationContent = resBody.broadcastNotificationList[i].notificationContent;
          currNotification.createdTime = resBody.broadcastNotificationList[i].createdTime;
          currNotification.rifterSession = resBody.broadcastNotificationList[i].rifterSession;
          this.currentUser.feed.push(currNotification);
        }
        console.log("3");
      }
    );
    return true;
  }

  getUserSessions(riftTag: string) {
    this.currentUser.rifterSessions = [];
    this.userSessionsService.getUserRifterSessions(riftTag).subscribe(
      resBody => {
        for (var i = 0; i < resBody.rifterSessions.length; i++) {
          var currDateMS = resBody.rifterSessions[i].sessionTime;
          var date = new Date(currDateMS);
          var currSession = new Session(
            resBody.firstName,
            resBody.lastName,
            resBody.riftTag,
            resBody.rifterRating,
            resBody.rifterSessions[i].hostId,
            resBody.rifterSessions[i].sessionCost,
            resBody.rifterSessions[i].methodOfContact,
            resBody.rifterSessions[i].sessionDuration,
            resBody.rifterSessions[i].title,
            resBody.rifterSessions[i].hits,
            date
          );
          this.currentUser.rifterSessions.push(currSession);
        }
        console.log("4");
      },
      err => {
        console.log(err);
      }
    );
  }


}
