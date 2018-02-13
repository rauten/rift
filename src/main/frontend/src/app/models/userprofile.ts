import {Activity} from "./activity";
import {Session} from "./session";
import {UserRating} from "./userrating";
import {Notification} from "./notification";
import {SessionRequest} from "./session-request";

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
  rifteeSessions: Session[];
  feed: Activity[];
  followers: Userprofile[] = [];
  followings: Userprofile[] = [];
  email: string;
  ratings: UserRating[] = [];
  notifications: Notification[] = [];
  sessionRequests: Map = new Map<number, SessionRequest>();

  followerUsertable: any;
  followingUsertable: any;
  broadcastNotificationList: any;
  notificationList: any;
  activities: Activity[] = [];
  creatorUsertable: any;


  constructor() {

  }
}
