import {Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";

var allow = true;
var startUrl;
var pollUrl;

function Poll() {
  this.start = function start(start, poll) {
    startUrl = start;
    pollUrl = poll;

    let request = this.http.get(startUrl)
      .map(
        (response: Response) => {
          console.log("Game on..." + response);
        }
      )
      .catch((error: any) => Observable.throw(error.json().error || "Server Error"));

    if (request) {
      request.unsubscribe();
    }
  };

  function getUpdate() {
    console.log("Okay let's go...");
    let request = this.http.get(pollUrl)
      .map(
        (response: Response) => {
          console.log("Received a new notification");
          var update = getUpdate(response);
          console.log(update);
        }
      )
      .catch((error: any) => Observable.throw(error.json().error || "Server Error"))

    function getUpdate(notification) {
      console.log(notification);
      return notification;
    }

    if (request) {
      request.unsubscribe();
    }

    request.always(function() {
      allow = true;
    })
  }
}
