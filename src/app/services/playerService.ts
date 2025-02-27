import {Injectable} from '@angular/core';

import {Player} from './player';
import {Players} from './mockup-players';


@Injectable({providedIn: 'root'})
export class PlayerService {
getPlayerDetails(id: number) {
  throw new Error('Method not implemented.');
}

private playersMock: Player[] = Players;

getPlayers(): Player[]{
  return this.playersMock;
}
}
