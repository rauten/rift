import { Injectable } from '@angular/core';
import { Userprofile } from "../models/userprofile";
import {Http, RequestOptions, Response, Headers} from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";



@Injectable()
export class PaymentService {
  private createBraintreeUserURL = "/api/braintree/createUser";

  constructor(private http: Http) {
  }

  createBraintreeUser(data): Observable<Userprofile> {
    console.log("running createBraintreeUser");
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.createBraintreeUserURL, data, options)
      .map((res: Response) => {
        console.log(res);
        return res.json();
      })
      .catch((error:any) => Observable.throw(error.json().error || 'Serve error'));
  }
}
