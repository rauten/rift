import {Activity} from "./activity";
export class Userprofile {
  id: number;
  firstName: string;
  lastName: string;
  riftTag: string;
  gender: boolean;
  rifterRating: number;
  rifteeRating: number;
  twitchAccount: string;
  youtubeAccount: string;
  creatorActivityList: Activity[];

  constructor() {

  }
}
