import {Activity} from "./activity";
import {Session} from "../../components/session-card/session";
import {UserRating} from "./userrating";

export class Userprofile {
  id: number;
  firstName: string;
  lastName: string;
  bio: string;
  riftTag: string;
  gender: boolean;
  rifterRating: number;
  rifteeRating: number;
  twitchAccount: string;
  youtubeAccount: string;
  creatorActivityList: Activity[];
  rifterSessions: Session[];
  feed: Activity[];
  followers: Userprofile[] = [];
  followings: Userprofile[] = [];
  email: string;
  ratings: UserRating[] = [];

  followerUsertable: any;
  followingUsertable: any;
  broadcastNotificationList: any;
  activities: Activity[] = [];
  creatorUsertable: any;

  constructor() {

  }
}
