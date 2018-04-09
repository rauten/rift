import {UserprofileService} from "../userprofile/userprofile.service";
import {Userprofile} from "../models/userprofile";
import {Injectable} from "@angular/core";

@Injectable()
export class SharedFunctions {
  constructor(private userProfileService: UserprofileService){

  }

  getLoggedInUserId(riftTag, loggedInUser){
    this.userProfileService.getUserId(riftTag).subscribe(
      resBody => {
        loggedInUser.id = resBody.id;
        console.log(loggedInUser.id);
      }
    )
  }

  getUserProfilePicture(riftTag, user) {
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

  timeToMilliseconds(time: string) {
    let list = time.split(":");
    let hour = (+list[0]);
    let minute = (+list[1]);
    let seconds = (hour * 60 * 60) + (minute * 60);
    return seconds * 1000;
  }
}
