import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sessionTime'
})
export class SessionTimePipe implements PipeTransform {

  transform(sessions: any, upcoming: any, past: any): any {
    if (!upcoming && !past || upcoming && past) {
      return sessions;
    }
    var currentTime = new Date();
    var currentTimeMS = currentTime.getTime();
    if (upcoming && !past) {
      return sessions.filter(function(session) {
        return session.sessionTime > currentTimeMS;
      });
    }
    if (past && !upcoming) {
      return sessions.filter(function(session) {
        return session.sessionTime < currentTimeMS;
      });
    }
  }
}
