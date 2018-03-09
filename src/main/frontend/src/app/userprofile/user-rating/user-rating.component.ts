import {Component, OnInit, Input, Inject} from '@angular/core';
import {UserRating} from "../../models/userrating";
import {UserRatingService} from "./data/user-rating.service";
import {UserprofileService} from "../userprofile.service";
import {ActivatedRoute} from "@angular/router";
import {MAT_DIALOG_DATA} from "@angular/material";

@Component({
  selector: 'app-user-rating',
  templateUrl: './user-rating.component.html',
  styleUrls: ['./user-rating.component.scss']
})
export class UserRatingComponent implements OnInit {
  title = "Rate this User";
  @Input() userRatingData;
  currentUserRating: UserRating = new UserRating();
  profile: any;
  sub: any;
  ratedUserId: number;
  loggedInUserId: number;
  ratedUserRiftTag: string;
  account_type_str: string;
  account_type: boolean;
  constructor(private userRatingService: UserRatingService, private userProfileService: UserprofileService,
  private route: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data) {
    this.ratedUserRiftTag = data.ratedUserRiftTag;
    this.ratedUserId = data.rateeId;
    this.loggedInUserId = data.raterId;
  }

  ngOnInit() {

    this.currentUserRating = this.userRatingService.getUserRatingData();
    this.userRatingData = this.userRatingService.getFormData();
  }

  save() {
    this.userRatingService.setUserRatingData(this.currentUserRating);
    this.account_type = this.account_type_str == "true";
    let data = {
      "rating" : this.userRatingData.rating,
      "review" : this.userRatingData.review,
      "createdTime" : UserRatingComponent.getCurrentTimeMS(),
      "riftId" : this.ratedUserId,
      // "reviewerId" : JSON.parse(localStorage.getItem("loggedInUserID")),
      "reviewerId" : this.loggedInUserId,
      "accountType" : this.account_type,
      "reviewTitle" : this.userRatingData.reviewTitle
    };
    console.log(data);
    // this.userRatingService.createUserRating(data);
  }

  // getUserId(riftTag: string) {
  //   this.userProfileService.getUserId(riftTag).subscribe(
  //     resBody => {
  //       this.ratedUserId = resBody.id;
  //     }
  //   );
  //   this.userProfileService.getUserId(this.profile.nickname).subscribe(
  //     resBody => {
  //       this.loggedInUserId = resBody.id;
  //     }
  //   )
  // }

  static getCurrentTimeMS() {
    var currentDate = new Date();
    return currentDate.getTime();
  }
}
