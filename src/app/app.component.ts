import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { SearchService } from './services/searchService';
import { PlayerResultsComponent } from './player-results/player-results.component';
import { NgIf } from '@angular/common'; // Importar NgSwitch, NgSwitchCase
import { PlayersComponent } from './players/players.component';
import { Player } from './services/player'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule, 
    PlayerResultsComponent, 
    NgIf, 
    PlayersComponent, 
    FormsModule,
    CommonModule,
   
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'chancha-angular'; 
  searchText = ''; // Variable para almacenar el texto de búsqueda
  selectedPlayer: Player | null = null;
  activeComponent: string = 'players'; // Establecer componente inicial
  selectedPlayerId: string | null = null; 

  constructor(private searchService: SearchService) {
    this.searchService.searchText$.subscribe(text => {
      this.searchText = text;  // Se actualiza el valor correctamente
    });
  }

  onPlayerSelected(player: Player) {
    this.selectedPlayer = player; 
  }

  onSearchChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchService.updateSearchText(input.value);
  }

  setComponent(component: string) {
    this.activeComponent = component;
  }

  resetSelection() {
    this.selectedPlayerId = null; // O también puedes usar "" si prefieres un string vacío
  }
}