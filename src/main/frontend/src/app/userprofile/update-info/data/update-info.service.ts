import { Injectable } from '@angular/core';
import {UpdateInfoData} from "./update-info-model";
import {Userprofile} from "../../models/userprofile";
import {Http, RequestOptions, Headers} from "@angular/http";
import {HttpHeaders, HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthHttp} from "angular2-jwt";
import {error} from "util";


@Injectable()
export class UpdateInfoService {
  updateUserURL = "/api/user/updateUser";
  updateUserAuth0 = '/api/user/updateAuth0';
  updateAuth0UserURL = "http://riftgaming.auth0.com/api/v2/users/";
  userData : string;
  private updateInfoData: UpdateInfoData = new UpdateInfoData();
  private isValid: boolean = false;


  constructor(private http: HttpClient, private authHttp: AuthHttp) {
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
    let headers = new HttpHeaders({'Accept' : 'application/json', 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: headers });
    this.http.put(this.updateUserURL, data, {headers: headers})
      .catch((error:any) => Observable.throw(error.json().error || 'Serve error'))
      .subscribe();
  }

  updateAuth0User(auth0data) {

    let header = new HttpHeaders();
    const token = localStorage.getItem("access_token");
    if (token) {
      const auth = 'Bearer ' + token;
      header = new HttpHeaders(({"Authorization": auth}));
    }
    header.append("Metadata", auth0data);
    this.http.get(this.updateUserAuth0, {headers: header})
      .subscribe(
        data => console.log(data),
        error => console.log(error)
      )
    //header.append('Content-Type', 'application/json');

    /*
    var token = localStorage.getItem("access_token");
    header.append("Authorization", "Bearer " + token);

    this.http.patch(this.updateAuth0UserURL + auth0Id,  auth0data, {headers: header})
      .map(res => res.json())
      .subscribe(data => this.userData = data,
        err => console.log(err),
        () => console.log('Request Complete'));
    /*
    this.authHttp.patch(this.updateAuth0UserURL + auth0Id, auth0data, {headers : myHeader})
      .map(res => res.json())
      .subscribe(data => this.userData = data,
        err => console.log(err),
        () => console.log('Request Complete'));
        */
  }


}
