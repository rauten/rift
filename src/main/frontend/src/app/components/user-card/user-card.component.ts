import { Component, OnInit, Input } from '@angular/core';
import {Userprofile} from "../../userprofile/models/userprofile";
import {UserprofileService} from "../../userprofile/userprofile.service";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input() user: any;
  loggedInUser: Userprofile = new Userprofile();
  profile: any;

  constructor(private userProfileService: UserprofileService) {
    this.profile = JSON.parse(localStorage.getItem('profile'));
  }

  ngOnInit() {
    this.getCurrentLoggedInUser();
  }

  isFollowing(riftTag: string): boolean {
    for (var i = 0; i < this.loggedInUser.followings.length; i++) {
      var currFollowing = this.loggedInUser.followings[i].riftTag;
      if (currFollowing == riftTag) {
        return true;
      }
    }
    return false;
  }

  getCurrentLoggedInUser():any {
    this.userProfileService.getUser(this.profile['http://riftgaming:auth0:com/user_metadata'].riftTag).subscribe(
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
      }
    )
  }

}