import { Injectable } from '@angular/core';
import {UpdateInfoData} from "./update-info-model";
import {Userprofile} from "../../models/userprofile";
import {Http, RequestOptions, Response, Headers} from "@angular/http";
import {Observable} from "rxjs";
import {AuthHttp} from "angular2-jwt";

declare var require:any;

@Injectable()
export class UpdateInfoService {
  updateUserURL = "/api/user/updateUser";
  updateAuth0UserURL = "http://riftgaming.auth0.com/api/v2/users/";
  private updateInfoData: UpdateInfoData = new UpdateInfoData();
  private isValid: boolean = false;


  constructor(private http: Http, private authHttp: AuthHttp) {
    /*
    var request = require("request");

    var options = { method: 'POST',
      url: 'https://riftgaming.auth0.com/oauth/token',
      headers: { 'content-type': 'application/json' },
      body:
        { grant_type: 'client_credentials',
          client_id: 'YOUR_CLIENT_ID',
          client_secret: 'YOUR_CLIENT_SECRET',
          audience: 'https://api.example.com/api/v2/users' },
      json: true };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      console.log(body);
    });
    */
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
    let options = new RequestOptions({ headers: headers });
    this.authHttp.patch(this.updateAuth0UserURL + auth0Id, auth0data, options)
      .map(res => res.json())
      .subscribe();
  }


}
