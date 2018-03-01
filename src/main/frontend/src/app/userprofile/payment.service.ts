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
