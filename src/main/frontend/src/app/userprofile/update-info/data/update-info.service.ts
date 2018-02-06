import { Injectable } from '@angular/core';
import {UpdateInfoData} from "./update-info-model";
import {Userprofile} from "../../models/userprofile";

@Injectable()
export class UpdateInfoService {

  private updateInfoData: UpdateInfoData = new UpdateInfoData();
  private isValid: boolean = false;

  constructor() {
  }

  getUserData(): Userprofile {
    var user: Userprofile = new Userprofile();
    user.riftTag = this.updateInfoData.riftTag;
    user.firstName = this.updateInfoData.firstName;
    user.lastName = this.updateInfoData.lastName;
    return user;
  }

  setUserData(data: Userprofile) {
    this.isValid = true;
    this.updateInfoData.riftTag = data.riftTag;
    this.updateInfoData.lastName = data.lastName;
    this.updateInfoData.firstName = data.firstName;
  }

  getFormData(): UpdateInfoData {
    return this.updateInfoData;
  }
}
