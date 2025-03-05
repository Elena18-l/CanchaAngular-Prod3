import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerSearchPipe } from '../player-search/player-search.pipe';
import { SearchService } from '../services/searchService';
import { Players } from '../services/mockup-players'; // Simulación de los jugadores
import { Player } from '../services/player';


@Component({
  selector: 'app-player-results',
  imports: [CommonModule, PlayerSearchPipe],
  templateUrl: './player-results.component.html',
  styleUrl: './player-results.component.css',
  
})
export class PlayerResultsComponent {
  searchText = ''; // Variable para almacenar el texto de búsqueda
  players: Player[] = Players; // Jugadores de ejemplo

  constructor(private searchService: SearchService) {
    console.log('PlayerResultsComponent cargado');
    // Suscribirse a los cambios del texto de búsqueda
    this.searchService.searchText$.subscribe((text) => {
      this.searchText = text; // Actualiza el texto de búsqueda
      console.log('Texto recibo en player-resultados:',this.searchText);
      
    });
  }
}

