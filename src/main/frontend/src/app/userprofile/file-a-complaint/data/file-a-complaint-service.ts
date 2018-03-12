import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs/Rx";

@Injectable()
export class FileAComplaintService {

  constructor(private http: Http) {}

  fileAComplaint(submitterId, riftId, data) {
    console.log("Filing a complaint against " + riftId);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.put("/api/userComplaint/" + submitterId + "/" + riftId, data, options)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Serve error'))
      .subscribe();;
  }
}
