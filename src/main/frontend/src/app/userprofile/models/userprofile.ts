import {Activity} from "./activity";
import {Session} from "../../usersessions/models/session-card/session";
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
  followers: any;
  followings: any;

  constructor() {

  }
}