import {Component, OnInit} from '@angular/core';
import {Userprofile} from "../models/userprofile"

import {UserprofileService} from "./userprofile.service";

import {Activity} from "../models/activity";
import {Session} from "../models/session";
import {AuthService} from "../auth/auth.service";
import {ActivatedRoute} from "@angular/router";
import {UserRatingService} from "./user-rating/data/user-rating.service";
import {UserRating} from "../models/userrating";
import {Notification} from "../models/notification";
import {UsersessionsService} from "../usersessions/usersessions.service";
import {SessionRequest} from "../models/session-request";
import {Globals} from "../global/globals";
import {MatDialog} from "@angular/material";
import {UpdateInfoComponent} from "./update-info/update-info.component";
import {UserRatingComponent} from "./user-rating/user-rating.component";
import {PaymentService} from "./payment.service";
import {ACTIVITY_CONTENT} from "../constants/activity-content";

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
  isLoggedIn: boolean = false;
  ratingStatus: number;
  updateBraintreeUserURL = '/api/braintree/updateCustomer/';


  constructor(private userProfileService: UserprofileService,
  public auth: AuthService, private route: ActivatedRoute, private userRatingService: UserRatingService,
  private userSessionsService: UsersessionsService, public dialog: MatDialog) {
    this.profile = JSON.parse(localStorage.getItem('profile'));
    if(this.profile != null) {
      this.isLoggedIn = true;
    }
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.currUser = params['rifttag'];
      this.isDataAvailable = true;
      this.getUserProfileInformation(params['rifttag']);
      if(this.isLoggedIn) {
        this.getCurrentLoggedInUser();
      }
    });
  }

  getCurrentLoggedInUser():any {
    console.log("Getting currently logged in user");
    this.userProfileService.getUser(this.profile.nickname).subscribe(
      resBody => {
        console.log(resBody);
        this.loggedInUser.firstName = resBody.firstName;
        this.loggedInUser.lastName = resBody.lastName;
        this.loggedInUser.riftTag = this.profile.nickname;
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
        console.log("after for loop for followings");
      }
    )
  }

  getUserProfileInformation(riftTag: string) {
    console.log("Getting user's profile information");
    this.userProfileService.getUser(riftTag).subscribe(
        resBody => {
          this.currentUser.firstName = resBody.firstName;
          this.currentUser.lastName = resBody.lastName;
          this.currentUser.riftTag = resBody.riftTag;
          this.currentUser.gender = resBody.gender;
          this.currentUser.bio = resBody.bio;
          this.currentUser.id = resBody.id;
          this.currentUser.rifterRating = resBody.rifterRating;
          this.currentUser.rifteeRating = resBody.rifteeRating;
          this.currentUser.braintreeId = resBody.braintreeId;
          this.updateBraintreeUserURL = this.updateBraintreeUserURL + resBody.braintreeId;
          this.getUserProfilePicture(riftTag);
          this.getUserCoverPhoto(riftTag);
          this.getUserRatings(this.currentUser.id);
          this.getUserNotifications(riftTag);
          this.getUserActivities(riftTag);
          this.getUserRifterSessions(riftTag);
          this.getUserFollowersAndFollowing(riftTag);
          this.getUserSessionRequests(this.profile.nickname);
          // this.getBroadcastNotifications(this.profile.nickname);
        }
    );
  }

  getUserFollowersAndFollowing(riftTag: string) {
    console.log("Getting user's followers and followings");
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
          // this.getUserProfilePicture(currFollower.riftTag);
          this.currentUser.followers.push(currFollower);
        }
        for (var i = 0; i < resBody.followings.length; i++) {
          var currFollowing = new Userprofile();
          currFollowing.firstName = resBody.followings[i].followingUsertable.firstName;
          currFollowing.lastName = resBody.followings[i].followingUsertable.lastName;
          currFollowing.riftTag = resBody.followings[i].followingUsertable.riftTag;
          currFollowing.id = resBody.followings[i].followingUsertable.id;
          // this.getUserProfilePicture(currFollower.riftTag);
          this.currentUser.followings.push(currFollowing);
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  getUserRatings(id: number) {
    console.log("Getting user's ratings");
    this.currentUser.ratings = [];
    this.userRatingService.getUserRating(id).subscribe(
      resBody => {
        //noinspection TypeScriptUnresolvedVariable
        for (var i = 0; i < resBody.length; i++) {
          var userRating = new UserRating();
          userRating.review = resBody[i].review;
          userRating.createdTime = resBody[i].createdTime;
          userRating.rating = resBody[i].rating;
          userRating.account_type = resBody[i].accountType;
          var reviewer = new Userprofile();
          reviewer.firstName = resBody[i].reviewerUsertable.firstName;
          reviewer.lastName = resBody[i].reviewerUsertable.lastName;
          reviewer.riftTag = resBody[i].reviewerUsertable.riftTag;
          userRating.reviewerUsertable = reviewer;
          this.currentUser.ratings.push(userRating);
        }
      }
    );
  }

  getUserNotifications(riftTag: string) {
    console.log("Getting user's notifications");
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
      }
    )
  }

  getUserActivities(riftTag: string) {
    console.log("Getting user's activities");
    this.currentUser.activities = [];
    this.userProfileService.getUser(riftTag).subscribe(
      resBody => {
        this.currentUser.creatorActivityList = resBody.creatorActivityList;
        for (var i = 0; i < this.currentUser.creatorActivityList.length; i++) {
          var currActivity = new Activity();
          currActivity.notificationType = this.currentUser.creatorActivityList[i].notificationType;
          if(currActivity.notificationType == "0") {
            currActivity.notificationContent = ACTIVITY_CONTENT[parseInt(currActivity.notificationType)] +
                this.currentUser.creatorActivityList[i].rifterSession.title;
          } else {
            currActivity.notificationContent = this.currentUser.creatorActivityList[i].notificationContent;
          }
          currActivity.createdTime = this.currentUser.creatorActivityList[i].createdTime;
          this.currentUser.activities.push(currActivity);
        }
      }
    );
  }

  getUserRifterSessions(riftTag: string) {
    console.log("Getting user's rifter sessions");
    this.currentUser.rifterSessions = [];
    this.userProfileService.getUser(riftTag).subscribe(
      resBody => {
        for (var i = 0; i < resBody.rifterSessions.length; i++) {
          var currDateMS = resBody.rifterSessions[i].sessionTime;
          var date = new Date(currDateMS);
          var currSession = new Session();
          currSession.firstName = resBody.firstName;
          currSession.lastName = resBody.lastName;
          currSession.riftTag = resBody.riftTag;
          currSession.rifterRating = resBody.rifterRating;
          currSession.hostId = resBody.rifterSessions[i].hostId;
          currSession.sessionCost = resBody.rifterSessions[i].sessionCost;
          currSession.methodOfContact = resBody.rifterSessions[i].methodOfContact;
          currSession.sessionDuration = resBody.rifterSessions[i].sessionDuration;
          currSession.title = resBody.rifterSessions[i].title;
          currSession.sessionTime = date;
          currSession.id = resBody.rifterSessions[i].id;
          currSession.numSlots = resBody.rifterSessions[i].numSlots;
          currSession.gameId = resBody.rifterSessions[i].gameId;
          currSession.console = resBody.rifterSessions[i].console;
          if(currSession.hostId == this.loggedInUser.id) {
            currSession.type = true;
          } else {
            currSession.type = false;
          }
          this.currentUser.rifterSessions.push(currSession);
        }
      }
    );
  }

  getUserSessionRequests(riftTag: string) {
    console.log("Getting user's session requests");
    this.loggedInUser.sessionRequests = new Map<number, SessionRequest>()
    this.userSessionsService.getSessionRequests(riftTag).subscribe(
      resBody => {
        //noinspection TypeScriptUnresolvedVariable
        for (var i = 0; i < resBody.length; i++) {
          var request = new SessionRequest();
          request.accepted = resBody[i].accepted;
          request.hostId = resBody[i].hostId;
          request.rifteeId = resBody[i].rifteeId;
          request.sessionId = resBody[i].sessionId;
          this.loggedInUser.sessionRequests.set(request.sessionId, request);
        }
        // console.log(this.currentUser.sessionRequests);
      }
    )
  }

  getUserProfilePicture(riftTag: string) {
    console.log("Getting user's profile picture");
    this.userProfileService.getProfilePicture(riftTag).subscribe(
      resBody => {
        this.currentUser.profilePic = resBody.profilePic;
      },
      error => {
        console.log(error + ": Using default picture instead");
        this.currentUser.profilePic = "https://www.vccircle.com/wp-content/uploads/2017/03/default-profile.png";

      },
    );
    // this.currentUser.profilePic = "https://s3.us-east-2.amazonaws.com/rift-profilepictures/" + riftTag +"profile-picture"
  }

  getUserCoverPhoto(riftTag: string) {
    console.log("Getting user's cover photo");
    this.userProfileService.getCoverPhoto(riftTag).subscribe(
      resBody => {
        this.currentUser.coverPhoto = resBody.profilePic;
      },
      error => {
        console.log(error + ": Using default picture instead");
        this.currentUser.coverPhoto = "https://atiinc.org/wp-content/uploads/2017/01/cover-default.jpg";
      },
    );
    // this.currentUser.profilePic = "https://s3.us-east-2.amazonaws.com/rift-profilepictures/" + riftTag +"profile-picture"
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

  openDialog() {
    //noinspection TypeScriptUnresolvedFunction
    this.dialog.open(UpdateInfoComponent, {
      height: '450px',
      width: '600px',
      data: {
        "updateBraintreeUserURL": this.updateBraintreeUserURL
      }
    });

  }

  openRatingDialog() {
    var raterId = this.loggedInUser.id;
    console.log(raterId);
    var rateeId = this.currentUser.id;
    console.log(rateeId);
    this.userRatingService.isAllowedToRate(raterId, rateeId).subscribe(
      resBody => {
        this.ratingStatus = resBody.result;
        if (this.ratingStatus == 0) {
          console.log("Haven't played with " + this.currentUser.riftTag + " in the past 30 days");
        } else if (this.ratingStatus == 1) {
          console.log("Already rated " + this.currentUser.riftTag + " in the past 30 days");
        } else {
          //noinspection TypeScriptUnresolvedFunction
          this.dialog.open(UserRatingComponent, {
            height: '600px',
            width: 'px',
            data: {
              ratedUserRiftTag: this.currentUser.riftTag,
              raterId: this.loggedInUser.id,
              rateeId: this.currentUser.id
            }
          });
        }
      }
    )


  }
}
