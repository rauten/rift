import { Injectable } from '@angular/core';
import {Userprofile} from "../models/userprofile";

@Injectable()
export class Globals {
  role: string = 'test';
  loggedInUser: Userprofile = new Userprofile();
  unseenNotifications: number = 0;
  previousNumNotifications: number = 0;
  began: boolean = false;
}
