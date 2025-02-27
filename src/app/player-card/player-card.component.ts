import { Component, OnInit } from '@angular/core';
import { Player } from '../services/player';
import { PlayerService } from '../services/playerService';
import { CommonModule } from '@angular/common';
import { Players} from '../services/in-memory-data-service';

@Component({
  selector: 'app-player-card',
  imports:[CommonModule],
  templateUrl: './player-card.component.html',
  styleUrl: './player-card.component.css',

})
export class PlayerCardComponent implements OnInit {

  players: Player[] = [];

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.getPlayers();
  }

  getPlayers(): void {
    this.players= this.playerService.getPlayers().slice(1, 6);;
    }
}


