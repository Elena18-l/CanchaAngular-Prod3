import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PlayerService } from '../services/playerService';  // Asegúrate de que el servicio esté bien importado
import { Observable } from 'rxjs';
import { Player } from '../services/player';  // Asegúrate de que tu modelo Player esté bien importado
import { FormsModule } from '@angular/forms'; // Para usar ngModel
import { CommonModule } from '@angular/common'; // Para usar ngClass

@Component({
  selector: 'app-players',
  standalone: true, // Este es un componente standalone
  imports: [FormsModule, CommonModule], // Necesario para ngModel y ngClass
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  @Output() selectedPlayerIdChange = new EventEmitter<string>();
  @Input() selectedPlayerId: string | null = null; // ID del jugador seleccionado
  players$: Observable<Player[]> | undefined;  // Observable de jugadores
  selectedPlayer: Player | null = null;  // Para almacenar el jugador seleccionado

  // Filtros de selección
  selectedFilters: any = {
    shirtNumber: '',
    position: '',
    average: '',
    age: '',
    stature: ''
  };

  constructor(private playerService: PlayerService) {}

  ngOnInit() {
    this.players$ = this.playerService.getPlayers();  // Obtén la lista de jugadores del servicio
  }

  // Función para seleccionar un jugador y mostrar sus detalles
  selectPlayer(player: Player) {
    this.selectedPlayerIdChange.emit(player.id);  // Emitir el ID del jugador seleccionado
  }
  // Función para deseleccionar el jugador
  deselectPlayer() {
    this.selectedPlayer = null;
  }

  // Función para limpiar filtros
  clearFilters() {
    this.selectedFilters = {
      shirtNumber: '',
      position: '',
      average: '',
      age: '',
      stature: ''
    };
  }

  // Filtro de jugadores
  get filteredPlayers$(): Observable<Player[]> {
    return this.playerService.getFilteredPlayers(this.selectedFilters);  // Usamos un servicio que filtra jugadores
  }

  trackByPlayerId(index: number, player: Player): string {
    return player.id;  // Retornamos el ID como string
  }
  
}
