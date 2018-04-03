import {Component, NgZone, OnInit} from '@angular/core';

@Component({
  selector: 'app-add-bank-account',
  templateUrl: './add-bank-account.component.html',
  styleUrls: ['./add-bank-account.component.scss']
})
export class AddBankAccountComponent implements OnInit {
  message: string;
  country: string;
  currency: string;
  routing_number: string;
  account_number: string;
  account_holder_name: string;
  account_holder_type: string;

  ngOnInit() {
  }

  constructor(private _zone: NgZone) {}

  getToken() {
    this.message = 'Loading...';

    (<any>window).Stripe.bankAccount.createToken({
      country: this.country,
      currency: this.currency,
      routing_number: this.routing_number,
      account_number: this.account_number,
      account_holder_name: this.account_holder_name,
      account_holder_type: this.account_holder_type
    }, (status: number, response: any) => {

      // Wrapping inside the Angular zone
      this._zone.run(() => {
        if (status === 200) {
          this.message = `Success! Bank Account token ${response.id}.`;
        } else {
          this.message = response.error.message;
        }
      });
    });
    console.log("hello got token");
  }

}
