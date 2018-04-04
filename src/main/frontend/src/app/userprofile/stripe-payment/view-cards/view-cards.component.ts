import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material";
import {StripePaymentService} from "../stripe-payment.service";
import {CreditCard} from "../../../models/credit-card";

@Component({
  selector: 'app-view-cards',
  templateUrl: './view-cards.component.html',
  styleUrls: ['./view-cards.component.scss']
})
export class ViewCardsComponent implements OnInit {
  creditCards: CreditCard[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data, private stripeService: StripePaymentService) { }

  ngOnInit() {
    this.getAllCustomerCards();
    this.getDefaultCustomerCard();
  }

  getAllCustomerCards() {
    this.stripeService.getAllCustomerCards(this.data.customerId).subscribe(
      resBody => {
        console.log(resBody);
        for (let i = 0; i < resBody.length; i++) {
          let currentCard = new CreditCard();
          currentCard.id = resBody[i].id;
          currentCard.brand = resBody[i].brand;
          currentCard.country = resBody[i].country;
          currentCard.expMonth = resBody[i].expMonth;
          currentCard.expYear = resBody[i].expYear;
          currentCard.last4 = resBody[i].last4;
          this.creditCards.push(currentCard);
        }
        console.log(this.creditCards);

      }
    )
  }

  getDefaultCustomerCard() {
    this.stripeService.getCustomerDefaultCard(this.data.customerId).subscribe(
      resBody => {
        console.log("Default credit card");
        console.log(resBody);
      }
    )
  }

}
