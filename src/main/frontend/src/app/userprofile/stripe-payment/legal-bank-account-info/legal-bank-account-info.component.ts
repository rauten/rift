import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material";
import {StripePaymentService} from "../stripe-payment.service";
import {UserprofileService} from "../../userprofile.service";
import {AddBankAccountComponent} from "./add-bank-account/add-bank-account.component";
import {SharedFunctions} from "../../../shared/shared-functions";

@Component({
  selector: 'app-legal-bank-account-info',
  templateUrl: './legal-bank-account-info.component.html',
  styleUrls: ['./legal-bank-account-info.component.scss']
})
export class LegalBankAccountInfoComponent implements OnInit {
  message: string;

  country: string;
  city: string;
  addressLine1: string;
  addressLine2: string;
  zipCode: string;
  state: string;
  dobDay: string;
  dobMonth: string;
  dobYear: string;
  firstName: string;
  lastName: string;
  profile: any;
  type: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data, private stripeService: StripePaymentService,
              private userProfileService: UserprofileService, private dialog: MatDialog) {
    this.profile = JSON.parse(localStorage.getItem("profile"));
  }

  ngOnInit() {
    console.log(this.profile.nickname);
    console.log(this.data.riftId);

  }

  getToken() {
    if(this.addressLine2 == "") {
      this.addressLine2 = null;
    }
    let data = {
      "country": this.country,
      "city": this.city,
      "addressLine1": this.addressLine1,
      "addressLine2": this.addressLine2,
      "zipCode": this.zipCode,
      "state": this.state,
      "dobDay": this.dobDay,
      "dobMonth": this.dobMonth,
      "dobYear": this.dobYear,
      "firstName": this.firstName,
      "lastName": this.lastName,
      "type": this.type
    };
    this.stripeService.getAccountId(data, this.data.riftId).subscribe(
      resBody => {
        let accountId = resBody.accountId;
        console.log(accountId);
        this.dialog.open(AddBankAccountComponent, {
          height: '450px',
          width: '600px',
          data: {
            "accountId": accountId,
            "riftId": this.data.riftId
          }
        });
      }
    )
  }
}
