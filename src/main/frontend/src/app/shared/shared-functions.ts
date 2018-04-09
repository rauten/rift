import {UserprofileService} from "../userprofile/userprofile.service";
import {Userprofile} from "../models/userprofile";
import {Injectable} from "@angular/core";

@Injectable()
export class SharedFunctions {
  constructor(private userProfileService: UserprofileService){

  }

  getLoggedInUserId(riftTag: string, loggedInUserId) {
    this.userProfileService.getUserId(riftTag).subscribe(
      resBody => {
        loggedInUserId = resBody.id;
      }
    )
  }

  getUserProfilePicture(riftTag: string, user: Userprofile) {
    this.userProfileService.getProfilePicture(riftTag).subscribe(
      resBody => {
        if (resBody.image == "") {
          user.profilePic = "https://www.vccircle.com/wp-content/uploads/2017/03/default-profile.png"
        } else {
          user.profilePic = resBody.image;
        }
      }
    );
  }
}
