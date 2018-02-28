import {Userprofile} from "./userprofile";
export class UserRating {
  rating: number;
  review: string;
  createdTime: any;
  account_type: boolean;
  reviewTitle: string;

  reviewerUsertable: Userprofile = new Userprofile();
  result;

  constructor(){}
}
