import { Injectable } from '@angular/core';
import {UpdateInfoData} from "./update-info-model";
import {Userprofile} from "../../../models/userprofile";
import {Http, RequestOptions, Headers} from "@angular/http";
import {Observable} from "rxjs";
import {AuthHttp} from "angular2-jwt";


@Injectable()
export class UpdateInfoService {
  updateUserURL = "/api/user/updateUser";
  updateUserAuth0 = "/api/user/updateAuth";
  updateUserAuth = "/api/user/updateAuth0";
  updateUserAuthTwo = "/api/user/updateAuthTwo";
  updateAuth0UserURL = "http://riftgaming.auth0.com/api/v2/users/";
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
    user.email = this.updateInfoData.email;
    user.bio = this.updateInfoData.bio;
    return user;
  }

  setUserData(data: Userprofile) {
    this.isValid = true;
    this.updateInfoData.riftTag = data.riftTag;
    this.updateInfoData.lastName = data.lastName;
    this.updateInfoData.firstName = data.firstName;
    this.updateInfoData.email = data.email;
    this.updateInfoData.bio = data.bio;
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
    let header = new Headers();
    const token = localStorage.getItem("access_token");
    console.log("access token: " + token);
    const auth = 'Bearer ' + token;
    header.append("Authorization", auth);
    header.append("FirstName", auth0data["firstName"]);
    header.append("LastName", auth0data["lastName"]);
    header.append("Email", auth0data["email"]);
    header.append("Username", auth0data["userName"]);
    header.append("Auth0Id", auth0Id);
    console.log("Hello");
    console.log(auth0data);
    // this.getUserInfoAuth0(auth0Id);
    this.http.patch(this.updateUserAuth0, auth0data, {headers: header})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Serve error'))
      .subscribe();
  }

  // getUserInfoAuth0(id: number) {
  //   let url = "https://riftgaming.auth0.com/api/v2/users/" + id;
  //   const token = localStorage.getItem("access_token");
  //   const auth = 'Bearer ' + token;
  //   let headers = new Headers();
  //   headers.append("Authorization", auth);
  //   return this.http.get(url, {headers})
  //     .map((res: Response) => res.json())
  //     .subscribe(res => console.log(res));
  // }


}
