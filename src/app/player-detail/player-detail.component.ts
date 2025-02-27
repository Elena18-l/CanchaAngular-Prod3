import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../services/playerService';
import {Player} from '../services/player';
import { ActivatedRoute } from '@angular/router';
import {Players} from '../services/mockup-players';

@Component({
  selector: 'app-player-detail',  
  templateUrl: './player-detail.component.html',
  styleUrl: './player-detail.component.css',
  
})
export class PlayerDetailComponent implements OnInit {
  player: Player | undefined;
  
  

  constructor(private route: ActivatedRoute, private playerService: PlayerService) { };
  ngOnInit():void {
    this.getPlayerDetails();
  }
  getPlayerDetails(): void {
    const playerId = 1; // Asigna el ID del jugador que quieres mostrar (sin depender de la URL)
    this.player = Players.find(player => player.id === playerId);
  }
}

