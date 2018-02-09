import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers, Response} from "@angular/http";
import {Observable} from "rxjs";
import {AuthHttp} from "angular2-jwt";
import {UserRating} from "../../models/userrating";
import {UserRatingData} from "./user-rating-data-model";


@Injectable()
export class UserRatingService {
  private userRatingData: UserRatingData = new UserRatingData();
  private isValid: boolean = false;
  createUserRatingURL = "/api/rating/createRating";
  getUserRatingURL = "/api/rating/userRatings/";


  constructor(private http: Http) {
  }

  getUserRatingData(): UserRating {
    var rating: UserRating = new UserRating();
    rating.rating = this.userRatingData.rating;
    rating.review = this.userRatingData.review;
    rating.account_type = this.userRatingData.account_type;
    rating.reviewTitle = this.userRatingData.reviewTitle;
    return rating;
  }

  setUserRatingData(data: UserRating) {
    this.isValid = true;
    this.userRatingData.rating = data.rating;
    this.userRatingData.review = data.review;
    this.userRatingData.account_type = data.account_type;
    this.userRatingData.reviewTitle = data.reviewTitle;
  }

  createUserRating(data) {
    console.log("running createUserRating");
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.put(this.createUserRatingURL, data, options)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Serve error'))
      .subscribe();
    window.location.reload();
  }

  getUserRating(id: number) {
    console.log("running getUserRating");
    return this.http.get(this.getUserRatingURL + id)
      .map(
        (response: Response) => {
          return response.json();
        }
      )
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getFormData(): UserRatingData {
    return this.userRatingData;
  }


}
