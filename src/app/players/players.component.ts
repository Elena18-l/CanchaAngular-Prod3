import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Players } from '../services/mockup-players';
import { RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Player } from '../services/player';
import { PlayerCardComponent } from '../player-card/player-card.component';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, PlayerCardComponent],
  templateUrl: './players.component.html',
  styleUrl: './players.component.css',
})
export class PlayersComponent {
  players = Players;
  searchText: string = '';
  selectedFilters: Partial<Player> = {};
  showFilterDropdown: boolean = false; // Ahora usamos dropdown en vez de modal

  constructor(private location: Location) {}

  get filteredPlayers() {
    return this.players.filter(player => {
      const matchesSearch = this.searchText
        ? (Object.keys(player) as (keyof Player)[])
            .some(key => {
              const value = player[key];
              return typeof value === 'string' || typeof value === 'number'
                ? value.toString().toLowerCase().includes(this.searchText.toLowerCase())
                : false;
            })
        : true;

      const matchesFilters = Object.entries(this.selectedFilters).every(([key, value]) =>
        value !== undefined && value !== ''
          ? (player as any)[key] == value
          : true
      );

      return matchesSearch && matchesFilters;
    });
  }

  toggleFilterDropdown() {
    this.showFilterDropdown = !this.showFilterDropdown;
  }

  clearFilters() {
    this.selectedFilters = {};
    this.searchText = '';
  }

  goBack(): void {
    this.location.back();
  }
}

