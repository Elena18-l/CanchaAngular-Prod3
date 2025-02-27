import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../services/playerService';
import {Player} from '../services/player';

@Component({
  selector: 'app-player-detail',  
  templateUrl: './player-detail.component.html',
  styleUrl: './player-detail.component.css',
  
})
export class PlayerDetailComponent implements OnInit {
  player: Player | undefined;
  
  

  constructor(private playerService: PlayerService) { };
  ngOnInit() {
    this.getPlayerDetails();

    getPlayerDetails(): void {  
      this.playerService.getPlayerById(1).subscribe(player => {
        this.player = player;

    });
  }}
