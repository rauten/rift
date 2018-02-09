import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers} from "@angular/http";
import {Observable} from "rxjs";
import {AuthHttp} from "angular2-jwt";
import {UserRating} from "../../models/userrating";
import {UserRatingData} from "./user-rating-data-model";


@Injectable()
export class UserRatingService {
  private userRatingData: UserRatingData = new UserRatingData();
  private isValid: boolean = false;


  constructor(private http: Http, private authHttp: AuthHttp) {
  }

  getUserRatingData(): UserRating {
    var rating: UserRating = new UserRating();
    rating.rating = this.userRatingData.rating;
    rating.review = this.userRatingData.review;
    rating.account_type = this.userRatingData.account_type;
    return rating;
  }

  setUserRatingData(data: UserRating) {
    this.isValid = true;
    this.userRatingData.rating = data.rating;
    this.userRatingData.review = data.review;
    this.userRatingData.account_type = data.account_type;
  }

  getFormData(): UserRatingData {
    return this.userRatingData;
  }


}
