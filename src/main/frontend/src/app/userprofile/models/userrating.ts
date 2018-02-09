import {Userprofile} from "./userprofile";
export class UserRating {
  rating: number;
  review: string;
  createdTime: any;
  account_type: boolean;

  reviewerUsertable: Userprofile = new Userprofile();

  constructor(){}
}
