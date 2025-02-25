import { Component, OnInit } from '@angular/core';
import { Player } from '../services/mockup-players';
import { PlayerService } from '../services/playerService';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrl: './player-card.component.css'
})
export class PlayerCardComponent {

  players: Player[] = [];

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.getPlayers();
  }

  getPlayers(): void {
    this.players= this.playerService.getPlayers().slice(1, 6);;
    }
}


