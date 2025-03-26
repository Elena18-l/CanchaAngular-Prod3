import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../services/player';
import { PlayerService } from '../services/playerService';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
// import { Players} from '../services/in-memory-data-service';

@Component({
  selector: 'app-player-card',
  imports:[CommonModule,RouterModule],
  templateUrl: './player-card.component.html',
  styleUrl: './player-card.component.css',

})
export class PlayerCardComponent implements OnInit {

  @Input() player: Player | undefined;
  players: Player[] = [];

  constructor(private playerService: PlayerService, private router:Router) { }

  ngOnInit(): void {
    this.playerService.getPlayers().subscribe(players => {
      // Ahora puedes aplicar slice() sobre el array de jugadores
      this.players = players.slice(); 
    });
  }

  getPlayers(): void {
    this.playerService.getPlayers().subscribe(players => {
      // Aplica slice solo cuando ya tienes los jugadores (es un array)
      this.players = players.slice(); // Si no necesitas hacer un corte, también puedes omitir slice
    });
  }
  
  goToPlayer(id:number):void{
    
    this.router.navigate(['/player', id]);
  }
}


