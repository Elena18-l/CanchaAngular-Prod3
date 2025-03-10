import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { SearchService } from './services/searchService';
import { PlayerResultsComponent } from './player-results/player-results.component';
import { NgIf, NgSwitch, NgSwitchCase } from '@angular/common'; // Importar NgSwitch, NgSwitchCase
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { PlayersComponent } from './players/players.component';
import { PlayerCardComponent } from './player-card/player-card.component';	
import { PlayerMediaComponent } from './player-media/player-media.component';
import { PentagonComponent } from './pentagon/pentagon.component';
import { Player } from './services/player'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule, 
    PlayerResultsComponent, 
    NgIf, 
    NgSwitch, 
    NgSwitchCase, // Importa también NgSwitchCase
    PentagonComponent, 
    PlayerDetailComponent, 
    PlayersComponent, 
    PlayerCardComponent, 
    PlayerMediaComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'chancha-angular';
  searchText = ''; // Variable para almacenar el texto de búsqueda
  selectedPlayer: Player | undefined = undefined; // Cambiado de null a undefined
  activeComponent: string = 'players'; // Establecer componente inicial

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
}
