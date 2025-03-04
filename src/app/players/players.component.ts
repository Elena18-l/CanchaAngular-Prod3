import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Players } from '../services/mockup-players';
import { RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Player } from '../services/player'; // Importa la interfaz de Player
import { PlayerSearchPipe } from '../player-search/player-search.pipe';
@Component({
  selector: 'app-players',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, PlayerSearchPipe],
  templateUrl: './players.component.html',
  styleUrl: './players.component.css',
  
})

export class PlayersComponent {
  players = Players;
  searchText: string = '';
  selectedFilters: Partial<Player> = {}; // Filtros opcionales
  showFilterModal: boolean = false;

  constructor(private location: Location) {}

  get filteredPlayers() {
    return this.players.filter(player => {
      // Buscar en todas las propiedades si el texto coincide
      const matchesSearch = this.searchText
        ? Object.keys(player).some(key =>
            player[key as keyof Player]?.toString().toLowerCase().includes(this.searchText.toLowerCase())
          )
        : true;

      // Aplicar filtros específicos
      const matchesFilters = (Object.keys(this.selectedFilters) as (keyof Player)[]).every(key =>
        this.selectedFilters[key] !== undefined
          ? player[key] === this.selectedFilters[key]
          : true
      );

      return matchesSearch && matchesFilters;
    });
  }

  toggleFilterModal() {
    this.showFilterModal = !this.showFilterModal;
  }

  clearFilters() {
    this.selectedFilters = {};
    this.searchText = '';
  }

  goBack(): void {
    this.location.back();
  }
}
