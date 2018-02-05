import {Component, OnInit, Input} from '@angular/core';
import {Userprofile} from "../../userprofile/models/userprofile";
import {UserprofileService} from "../../userprofile/userprofile.service";

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.scss']
})
export class FollowButtonComponent implements OnInit {
  @Input() following: boolean;
  @Input() currentUser: Userprofile;
  @Input() loggedInUser: Userprofile;

  constructor(private userProfileService: UserprofileService) {
  }

  ngOnInit() {
  }

  followUser() {
    this.userProfileService.followUser(this.loggedInUser.riftTag, this.currentUser.id).subscribe(
      resBody => {
        this.following = true;
      }
    );
  }

  unfollowUser() {
    this.userProfileService.unfollowUser(this.loggedInUser.riftTag, this.currentUser.id).subscribe(
      resBody => {
        this.following = false;
      }
    );
  }
}