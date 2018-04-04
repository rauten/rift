import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material";
import {StripePaymentService} from "../stripe-payment.service";

@Component({
  selector: 'app-view-cards',
  templateUrl: './view-cards.component.html',
  styleUrls: ['./view-cards.component.scss']
})
export class ViewCardsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data, private stripeService: StripePaymentService) { }

  ngOnInit() {
    this.getAllCustomerCards();
  }

  getAllCustomerCards() {
    this.stripeService.getAllCustomerCards(this.data.customerId).subscribe(
      resBody => {
        console.log(resBody);
      }
    )
  }

  getDefaultCustomerCard() {
    this.stripeService.getCustomerDefaultCard(this.data.customerId).subscribe(
      resBody => {
        console.log(resBody);
      }
    )
  }

}
