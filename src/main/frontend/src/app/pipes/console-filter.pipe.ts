import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'consoleFilter'
})
export class ConsoleFilterPipe implements PipeTransform {

  transform(sessions: any[], consoles: string[]): any[] {
    if (!consoles || consoles.length === 0) return sessions;
    return sessions.filter(session => consoles.includes(session.console));
  }

}
