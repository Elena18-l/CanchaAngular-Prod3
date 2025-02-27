import { Component } from '@angular/core';
import { PlayerCardComponent } from '../player-card/player-card.component';
import { CommonModule } from '@angular/common';
import {Players} from '../services/mockup-players';

@Component({
  selector: 'app-players',  
  imports:[CommonModule],
  templateUrl: './players.component.html',
  styleUrl: './players.component.css',

})
export class PlayersComponent {
  players = Players;
}
