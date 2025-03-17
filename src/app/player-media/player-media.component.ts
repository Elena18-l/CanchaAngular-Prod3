import { Component, Input, OnInit, OnChanges,SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from '../services/playerService';
import { Player } from '../services/player';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SafeUrlPipe } from '../player-media/safe-url.pipe';

@Component({
  selector: 'app-player-media',
  templateUrl: './player-media.component.html',
  styleUrls: ['./player-media.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SafeUrlPipe
  ]
})
export class PlayerMediaComponent implements OnInit {
  // 🔹 Se inicializan todas las propiedades requeridas en Player
  player: Player = {
    id: 0,
    name: '',
    age: 0,
    foto: '',
    portrait: '',
    team: '',
    position: '',
    stature: 0,
    average: 0,
    shirtNumber: 0,
    skills: { fisico: 0, tecnica: 0, fuerzaMental: 0, habilidadEspecial: 0, resistencia: 0 },
    bio: '',
    gallery: [],
    video: []
  };
@Input() playerId!: number;

  activeIndex = 0;
  modalType: 'image' | 'video' | null = null;

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.loadPlayer();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['playerId'] && !changes['playerId'].firstChange) {
      this.loadPlayer(); // 🔹 Recargar datos cuando cambie el jugador
      this.closeModal(); // 🔹 Cerrar el modal para evitar mostrar imágenes viejas
    }
  }

  loadPlayer(): void {
    if (this.playerId) {
      this.player = this.playerService.getPlayerDetails(this.playerId) ?? { 
        id: 0, name: '', age: 0, foto: '', portrait: '', team: '', position: '',
        stature: 0, average: 0, shirtNumber: 0, 
        skills: { fisico: 0, tecnica: 0, fuerzaMental: 0, habilidadEspecial: 0, resistencia: 0 },
        bio: '', gallery: [], video: []
      };
    }
}



  getPlayerDetails(): void {
    const playerId = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(playerId)) {
      const foundPlayer = this.playerService.getPlayerDetails(playerId);
      if (foundPlayer) {
        this.player = foundPlayer;
      }
    }
  }

  goBack(): void {
    this.location.back();
  }

  openModal(type: 'image' | 'video', index: number = 0): void {
    this.modalType = type;
    this.activeIndex = index;
  }

  setActive(index: number): void {
    this.activeIndex = index;
  }

  closeModal(): void {
    this.modalType = null;
  }
}
