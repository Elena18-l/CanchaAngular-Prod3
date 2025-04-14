import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PlayerService } from '../services/playerService';  // Asegúrate de que el servicio esté bien importado
import { Observable } from 'rxjs';
import { Player } from '../services/player';  // Asegúrate de que tu modelo Player esté bien importado
import { FormsModule } from '@angular/forms'; // Para usar ngModel
import { CommonModule } from '@angular/common'; // Para usar ngClass
import { PlayerDetailComponent } from '../player-detail/player-detail.component';
import {FormCrudComponent} from '../form-crud/form-crud.component';
import {InMemoryDataService} from '../services/in-memory-data-service';
@Component({
  selector: 'app-players',
  standalone: true, // Este es un componente standalone
  imports: [FormsModule, CommonModule, PlayerDetailComponent, FormCrudComponent], // Necesario para ngModel y ngClass
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  @Output() selectedPlayerIdChange = new EventEmitter<string>();
  @Input() selectedPlayerId: string | null = null; // ID del jugador seleccionado
  selectedPlayer: Player | null = null;  // Para almacenar el jugador seleccionado
  filteredPlayersList$: Observable<Player[]> | undefined;  // Observable de jugadores

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
    this.filteredPlayersList$ =this.playerService.getFilteredPlayers(this.selectedFilters);
  }


  

  // Función para seleccionar un jugador y mostrar sus detalles
  selectPlayer(player: Player) {
    console.log("a",player)
    this.selectedPlayer = player;  // 🔹 Ahora asignamos el jugador seleccionado
    this.selectedPlayerIdChange.emit(player.id);  // 🔹 Emitimos el ID (si es necesario en otro componente)
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
    this.filteredPlayers$();  // Recargar la lista con todos los jugadores
  }


  // Filtro de jugadores
  filteredPlayers$() {
    this.filteredPlayersList$ =this.playerService.getFilteredPlayers(this.selectedFilters);
  }

  trackByPlayerId(index: number, player: Player): string {
    return player.id;  // Retornamos el ID como string
  }
  // resetDatabase() {
  //   this.playerService.resetDatabase(InMemoryDataService);
  // }
  onDeletePlayer(playerId: string) {
    const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar este jugador?');

    if (!confirmDelete) return;

    this.playerService.deletePlayer(playerId).subscribe({
      next: () => {
        console.log(`Jugador con ID ${playerId} eliminado correctamente.`);
        this.filteredPlayers$(); // 🔁 Recargar la lista tras el borrado
      },
      error: (err) => {
        console.error('Error al eliminar el jugador:', err);
      }
    });
  }




}
