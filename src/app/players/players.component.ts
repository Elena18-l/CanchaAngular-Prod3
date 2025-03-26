import { Component, EventEmitter, Output, ElementRef, OnInit, HostListener, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Player } from '../services/player';
import { PlayerService } from '../services/playerService';
import { RouterModule, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css'],
  providers: [PlayerService]
})
export class PlayersComponent implements OnInit {
  players$!: Observable<Player[]>; // Lista de jugadores de Firebase
  searchText: string = '';
  selectedFilters: Partial<Player & { stature?: string; average?: string }> = {};
  showFilterDropdown: boolean = false; 
  @Input() selectedPlayerId: number | null = null;
  @Output() selectedPlayerIdChange = new EventEmitter<number | null>();

  constructor(
    private location: Location,
    private router: Router,
    private eRef: ElementRef,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void{
    this.loadPlayers();
  }

  loadPlayers() {
    this.players$ = this.playerService.getPlayers();
  }

  // Filtra a los jugadores según los filtros activos (buscador y filtros)
  get filteredPlayers$(): Observable<Player[]> {
    return this.players$.pipe(
      map(players => players.filter(player => 
        this.applyFilters(player) // Aplica todos los filtros
      ))
    );
  }

  // Función que aplica los filtros de búsqueda y otros filtros
  applyFilters(player: Player): boolean {
    // Filtro por nombre
    const matchesSearchText = player.name.toLowerCase().includes(this.searchText.toLowerCase());

    // Filtros adicionales (Dorsal, Posición, Media, Edad, Altura)
    const matchesShirtNumber = !this.selectedFilters.shirtNumber || player.shirtNumber === this.selectedFilters.shirtNumber;
    const matchesPosition = !this.selectedFilters.position || player.position === this.selectedFilters.position;
    const matchesAverage = !this.selectedFilters.average || player.average === this.selectedFilters.average;
    const matchesAge = !this.selectedFilters.age || player.age === this.selectedFilters.age;
    const matchesStature = !this.selectedFilters.stature || player.stature === this.selectedFilters.stature;

    return matchesSearchText && matchesShirtNumber && matchesPosition && matchesAverage && matchesAge && matchesStature;
  }

  // Método para limpiar los filtros
  clearFilters(): void {
    this.selectedFilters = {}; // Restablece todos los filtros
    this.loadPlayers(); // Vuelve a cargar la lista de jugadores sin filtros
  }

  // Método para verificar si el jugador está seleccionado
  isSelected(playerId: number): boolean {
    return this.selectedPlayerId === playerId;
  }

  // Método para manejar la selección de un jugador
  toggleSelected(playerId: number): void {
    this.selectedPlayerId = this.selectedPlayerId === playerId ? null : playerId;
    this.selectedPlayerIdChange.emit(this.selectedPlayerId);
  }


  // TrackBy para optimizar la renderización de los jugadores
  trackByPlayerId(index: number, player: Player): number {
    return player.id; // Utiliza el id del jugador para hacer el seguimiento
  }

  // Maneja clics fuera del filtro para cerrar el dropdown
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.showFilterDropdown = false;
    }
  }
  isSelectedPlayerZero(): boolean {
    return this.selectedPlayerId === 0;
  }
  // Navega a los detalles del jugador
  goToPlayerDetails(player: Player) {
    this.router.navigate(['/player', player.id]);
  }
}
