import { Component, OnInit, Input } from '@angular/core';
import {Userprofile} from "../../userprofile/models/userprofile";
import {UserRating} from "../../userprofile/models/userrating";

@Component({
  selector: 'app-user-review',
  templateUrl: './user-review.component.html',
  styleUrls: ['./user-review.component.scss']
})
export class UserReviewComponent implements OnInit {
  @Input() rating: UserRating;
  accountType: string = "";
  constructor() { }

  ngOnInit() {
    if(this.rating.account_type == true) {
      this.accountType = "Rifter";
    } else {
      this.accountType = "Riftee";
    }
  }

}
