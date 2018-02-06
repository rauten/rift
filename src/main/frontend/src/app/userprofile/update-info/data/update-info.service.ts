import { Injectable } from '@angular/core';
import {UpdateInfoData} from "./update-info-model";
import {Userprofile} from "../../models/userprofile";
import {Http, RequestOptions, Headers} from "@angular/http";
import {Observable} from "rxjs";
import {AuthHttp} from "angular2-jwt";


@Injectable()
export class UpdateInfoService {
  updateUserURL = "/api/user/updateUser";
  updateAuth0UserURL = "http://riftgaming.auth0.com/api/v2/users/";
  updateAuth0UserURL2 = "/api/v2/users/";
  userData : string;
  private updateInfoData: UpdateInfoData = new UpdateInfoData();
  private isValid: boolean = false;


  constructor(private http: Http, private authHttp: AuthHttp) {
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

  updateUser(data): void {
    console.log("running updateUser");
    let headers = new Headers({'Accept' : 'application/json', 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.put(this.updateUserURL, data, options)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Serve error'))
      .subscribe();
  }

  updateAuth0User(auth0data, auth0Id) {
    let headers = new Headers({'Accept' : 'application/json', 'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT'});
    headers.set("Authorization", `Bearer ${localStorage.getItem('access_token')}`);
    headers.set("Access-Control-Expose-Headers", ["Authorization", "Access-Control-Allow-Origin", "Access-Control-AllowMethods"]);
    let options = new RequestOptions({ headers: headers });
    console.log(options);
    this.http.put(this.updateAuth0UserURL + auth0Id, auth0data, options)
      .map(res => res.json())
      .subscribe(data => this.userData = data,
        err => console.log(err),
        () => console.log('Request Complete'));
  }


}
