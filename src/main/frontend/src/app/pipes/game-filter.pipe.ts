import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gameFilter'
})
export class GameFilterPipe implements PipeTransform {

  transform(sessions: any[], gameIds: number[]): any[] {
    if (!gameIds || gameIds.length === 0) return sessions;
    return sessions.filter(session => gameIds.includes(session.gameId));
  }

}
