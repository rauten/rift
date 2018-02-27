import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sessionType'
})
export class SessionTypePipe implements PipeTransform {

  transform(sessions: any, rifter: any, riftee: any): any {
    if (rifter && riftee || !rifter && !riftee) {
      return sessions;
    }
    if (rifter && !riftee) {
      return sessions.filter(function(session) {
        return session.type == true;
      });
    }
    if (riftee && !rifter) {
      return sessions.filter(function(session) {
        return session.type == false;
      });
    }
  }
  // transform(fabrics: any[], fabricTypes: string[]): any[] {
  //   if (!fabricTypes || fabricTypes.length === 0) return fabrics;
  //   return fabrics.filter(fabric => fabricTypes.includes(fabric.type));
  // }
}
