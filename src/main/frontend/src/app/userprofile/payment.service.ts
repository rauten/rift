import { Injectable } from '@angular/core';
import { Userprofile } from "../models/userprofile";
import {Http, RequestOptions, Response, Headers} from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";



@Injectable()
export class PaymentService {
  private createBraintreeUserURL = "/api/braintree/createCustomer";
  private updateBraintreeUserURL = "/api/braintree/updateCustomer";

  constructor(private http: Http) {
  }

  getTransactionData(riftId: number, sessionId: number) {
    console.log("running getTransactionData");
    return this.http.get("/api/user/" + riftId + "/session/" + sessionId)
      .map(
        (response: Response) => {
          return response.json();
        }
      )
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  doTransaction(customerId: string, amount: number) {
    console.log("running doTransaction");
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.put("/api/braintree/transaction/" + customerId + "/" + amount, headers)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Serve error'))
      .subscribe();
  }

  createBraintreeUser(data): Observable<Userprofile> {
    console.log("running createBraintreeUser");
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.createBraintreeUserURL, data, options)
      .map((response: Response) =>
        {
          return response.json();
        }
      )
      .catch((error:any) => Observable.throw(error.json().error || 'Serve error'));
  }

  updateBraintreeUser(data): Observable<Userprofile> {
    console.log("running createBraintreeUser");
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.updateBraintreeUserURL, data, options)
      .map((response: Response) =>
        {
          return response.json();
        }
      )
      .catch((error:any) => Observable.throw(error.json().error || 'Serve error'));
  }
}
