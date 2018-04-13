import { Component, OnInit, Input } from '@angular/core';
import {Userprofile} from "../../models/userprofile";
import {UserprofileService} from "../../userprofile/userprofile.service";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input() user: any;
  @Input() isLoggedIn: boolean;
  @Input() loggedInUser: any;
  profile: any;

  constructor() {
    this.profile = JSON.parse(localStorage.getItem('profile'));
  }

  ngOnInit() {
  }

  isFollowing(riftTag: string): boolean {
    for (let i = 0; i < this.loggedInUser.followings.length; i++) {
      let currFollowing = this.loggedInUser.followings[i].riftTag;
      if (currFollowing == riftTag) {
        return true;
      }
    }
    return false;
  }
}
