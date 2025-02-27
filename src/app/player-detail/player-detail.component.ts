import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../services/playerService';
import {Player} from '../services/player';
import {Router, ActivatedRoute } from '@angular/router';
import {Players} from '../services/mockup-players';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-player-detail',  
  standalone: true,
  imports:[CommonModule,RouterModule],
  templateUrl: './player-detail.component.html',
  styleUrl: './player-detail.component.css',
  
})
export class PlayerDetailComponent {
  player?: Player;
  
  

  constructor(private router: Router) { 
    if (!this.player) {
      console.warn('No player data received');
    }
    const navigation = this.router.getCurrentNavigation();
    this.player = navigation?.extras.state?.['player'];
  }
  }
  
//   ngOnInit():void {
//     this.getPlayerDetails();
//   }
//   getPlayerDetails(): void {
//     const playerId = this.player.id; // Asigna el ID del jugador que quieres mostrar (sin depender de la URL)
//     this.player = Players.find(player => player.id === playerId);
//   }
// }

