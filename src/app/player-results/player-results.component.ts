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
  template: `
    <h4>Resultados de la búsqueda</h4>
    <ul *ngIf="searchText.length > 0">
      <li *ngFor="let player of players | playerFilter:searchText">
        <strong>{{ player.name }}</strong> - {{ player.team }} ({{ player.position }})
        | Edad: {{ player.age }}
        | Altura: {{ player.stature }}m
        | Promedio: {{ player.average }}
        | Nº Camiseta: {{ player.shirtNumber }}
      </li>
    </ul>
    <p *ngIf="searchText.length === 0">No hay resultados para mostrar.</p>
  `,
})
export class PlayerResultsComponent {
  searchText = ''; // Variable para almacenar el texto de búsqueda
  players: Player[] = Players; // Jugadores de ejemplo

  constructor(private searchService: SearchService) {
    // Suscribirse a los cambios del texto de búsqueda
    this.searchService.searchText$.subscribe((text) => {
      this.searchText = text; // Actualiza el texto de búsqueda
    });
  }
}

