import {Injectable} from '@angular/core';

import {Player} from './player';
import {Players} from './mockup-players';


@Injectable({providedIn: 'root'})
export class PlayerService {

private playersMock: Player[] = Players;

getPlayers(): Player[]{
  return this.playersMock;
}
}
