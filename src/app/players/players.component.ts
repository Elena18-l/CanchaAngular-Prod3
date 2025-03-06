import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Players } from '../services/mockup-players';
import { RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Player } from '../services/player';
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
  selectedFilters: Partial<Player & { stature?: string; average?: string }> = {}; 
  showFilterDropdown: boolean = false;

  constructor(private location: Location) {}

  get filteredPlayers() {
    return this.players.filter(player => {
      const matchesSearch = this.searchText
        ? (Object.keys(player) as (keyof Player)[]).some(key => {
            const value = player[key];
            return typeof value === 'string' || typeof value === 'number'
              ? value.toString().toLowerCase().includes(this.searchText.toLowerCase())
              : false;
          })
        : true;

      const matchesFilters = Object.entries(this.selectedFilters).every(([key, value]) => {
        if (key === 'stature' && value) {
          return this.isWithinRange(player.stature, value);
        }
        if (key === 'average' && value) {
          return this.isWithinRange(player.average, value);
        }
        
        return value !== undefined && value !== '' ? (player as any)[key] == value : true;
      });

      return matchesSearch && matchesFilters;
    });
  }

  isWithinRange(playerValue: number, selectedRange: string): boolean {
    if (!selectedRange) return true;
    const [min, max] = this.parseRange(selectedRange);
    return playerValue >= min && playerValue <= max;
  }

  parseRange(range: string): [number, number] {
    return range.split('-').map(Number) as [number, number];
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
