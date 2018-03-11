import { Component, OnInit } from '@angular/core';
import {AuthService} from "./auth/auth.service";
import {Http} from "@angular/http";
import {UserprofileService} from "./userprofile/userprofile.service";
import {Userprofile} from "./models/userprofile";
import {PaymentService} from "./userprofile/payment.service";
import {Globals} from "./global/globals";
import {Notification} from "./models/notification";
import {NotificationsService} from "./userprofile/notifications.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  notifications: String[] =["hello", "there", "ha"];
  notificationList: Notification[] = [];
  profile: any;

  ngOnInit() {
    this.profile = JSON.parse(localStorage.getItem("profile"));
    if(this.profile) {
      this.userprofileService.getUser(this.profile.nickname).subscribe(
        resBody => {
          let id = resBody.id;
          this.notificationsService.pollNotifications(id, this.notificationList, false);
        });
    }
  }


  constructor(public auth: AuthService, private userprofileService: UserprofileService,
  private paymentService: PaymentService, private http: Http, private globals: Globals, private notificationsService: NotificationsService) {
    let notifications = this.notificationList;
    function pollNotifications(id) {
      console.log("inside pollnotifications");
      console.log(notifications);
      notificationsService.pollNotifications(id, notifications, true)
    }


    auth.handleAuthentication(function (data, createUser) {
      let profile = JSON.parse(localStorage.getItem("profile"));
      userprofileService.getUser(profile.nickname).subscribe(
        resBody => {
          let id = resBody.id;
          pollNotifications(id);
        });

      if (createUser) {
        let btData = {
          "firstName": data.firstName,
          "lastName": data.lastName
        };
        paymentService.createBraintreeUser(btData).subscribe(
          resBody => {
            var braintreeId = resBody.customerId;
            let riftData = {
              "firstName": data.firstName,
              "lastName": data.lastName,
              "riftTag": data.riftTag,
              "auth0Token": data.auth0Token,
              "braintreeId": braintreeId,
              "email": data.email
            };
            userprofileService.createUser(riftData);
          }
        );
      } else {
        userprofileService.getUser(profile.nickname).subscribe(
          resBody => {
            localStorage.setItem("loggedInUserID", resBody.id.toString());
          })
      }
    });
  }
}

