import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { SearchService } from './services/searchService';
import { PlayerResultsComponent } from './player-results/player-results.component';
import { NgIf } from '@angular/common';
import { PlayersComponent } from './players/players.component';
import { Player } from './services/player'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/auth.service';
import { Observable } from 'rxjs';
import { User } from '@angular/fire/auth';

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
export class AppComponent implements OnInit {
  user$: Observable<User | null> | undefined; // ✅ No necesitamos `user`, solo el observable
  title = 'cancha-angular';  
  searchText = ''; 
  selectedPlayer: Player | null = null;
  activeComponent: string = 'players';  
  selectedPlayerId: string | null = null; 

  constructor(private searchService: SearchService, private authService: AuthService) {
  
    
  }

  ngOnInit(): void {
    this.user$ = this.authService.user$; // 👈 asignar user observable
  
    this.user$.subscribe(user => {
      console.log(user ? `✅ Usuario autenticado: ${user.uid}` : '⚠️ No hay usuario autenticado');
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
    this.selectedPlayerId = null;
  }

  
}
