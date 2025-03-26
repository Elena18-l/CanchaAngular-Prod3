import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerSearchPipe } from '../player-search/player-search.pipe';
import { SearchService } from '../services/searchService';
import { Player } from '../services/player';
import { Observable } from 'rxjs';
import { PlayerService } from '../services/playerService';  // Importar correctamente PlayerService


@Component({
  selector: 'app-player-results',
  imports: [CommonModule, PlayerSearchPipe],
  templateUrl: './player-results.component.html',
  styleUrls: ['./player-results.component.css'],
})
export class PlayerResultsComponent {
  searchText: string = '';  // Definir correctamente searchText
  players: Player[] = [];  // Definir correctamente players

  constructor(private searchService: SearchService, private playerService: PlayerService) {
    // Aquí podrías suscribirte a un observable de búsqueda
    this.searchService.searchText$.subscribe((text) => {
      this.searchText = text;  // Actualiza searchText desde el servicio
      console.log('Texto recibido en player-results:', this.searchText);
    });

    // Obtener jugadores si es necesario
    this.playerService.getPlayers().subscribe((players) => {
      this.players = players;  // Actualiza los jugadores
    });
  }
}