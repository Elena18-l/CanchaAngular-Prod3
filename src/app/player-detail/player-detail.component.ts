import { Component, OnInit, OnDestroy, Input } from '@angular/core';
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

  @Input() player?: Player; 
  player$?: Observable<Player | undefined>; // Usamos un Observable
  activeIndex = 0; 
  selectedPlayerId: number = 0; // Cambiado a string porque Firebase usa strings

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private playerService: PlayerService 
  ) {}

  ngOnInit(): void {
    const playerId = this.route.snapshot.paramMap.get('id');
    if (playerId) {
      this.selectedPlayerId = Number(playerId); // ✅ Convertir a número correctamente
    }
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
  }

  setActiveVideo(index: number): void {
    this.activeIndex = index;
  }
}
