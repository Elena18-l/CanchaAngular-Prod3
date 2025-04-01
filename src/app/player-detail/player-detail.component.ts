import { Component, OnInit, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Player } from '../services/player';
import { Subscription, Observable } from 'rxjs';
import { CommonModule } from '@angular/common'; 
import { PentagonComponent } from '../pentagon/pentagon.component';
import { PlayerMediaComponent } from '../player-media/player-media.component';
import { PlayerService } from '../services/playerService';

@Component({
  selector: 'app-player-detail',
  standalone: true,
  imports: [CommonModule, PentagonComponent, PlayerMediaComponent],
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css'],
})
export class PlayerDetailComponent implements OnInit, OnDestroy {
  playerId: string | null =null;
  @Input() player?: Player; 
  player$?: Observable<Player | undefined>; // Usamos un Observable
  activeIndex = 0; 
  selectedPlayerId!: string;
  selectedPlayer: Player | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() selectedPlayerIdChange = new EventEmitter<string>();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private playerService: PlayerService 
  ) {}

  ngOnInit(): void {
    this.playerService.playerId$.subscribe(playerId => {
      console.log('ID del jugador recibido en detalles:', this.player, this.player?.id);
      
      this.playerId = playerId;
      this.loadPlayerDetails(playerId ?? '');
    });
  }
  
  loadPlayerDetails(playerId: string) {
    this.playerService.getPlayerDetails(playerId).subscribe(playerData => {
      if (playerData) {
        this.player = playerData;
        console.log('Detalles del jugador cargados:', this.player,playerId);
      } else {
        console.log('Jugador no encontrado');
      }
    });
  }
  selectPlayer(player: Player) {
    console.log("a",player)
    this.selectedPlayer = player;  // 🔹 Ahora asignamos el jugador seleccionado
    this.selectedPlayerIdChange.emit(player.id);  // 🔹 Emitimos el ID (si es necesario en otro componente)
  }
  
  
  
  ngOnDestroy(): void {
    // No necesitamos manejar suscripciones manualmente si usamos `async` en el HTML
  }

  goBack(): void {
    this.location.back();
  }

  getMedia(): void {
    if (this.selectedPlayerId) {
      this.router.navigate(['/player', this.selectedPlayerId, 'media']);
    }
  }

  setActiveImage(index: number): void {
    this.activeIndex = index;
    console.log('Imagen activa:', this.activeIndex,this.playerId);
  }

  setActiveVideo(index: number): void {
    this.activeIndex = index;
  }
  closeDetails() {
    this.close.emit(); // Emite el evento para cerrar el detalle
  }

}
