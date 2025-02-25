import {Injectable} from '@angular/core';

import {Player} from './player';
import {PLAYERS} from './mockup-players';


@Injectable({providedIn: 'root'})
export class PlayerService {

private playersMock: Player[] = PLAYERS;

getPlayers(): Player[]{
  return this.playersMock;
}
}
