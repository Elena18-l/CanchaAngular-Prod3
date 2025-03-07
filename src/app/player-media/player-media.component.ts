import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from '../services/playerService';
import { Player } from '../services/player';
import { Players } from '../services/mockup-players';
import { SafeUrlPipe } from '../player-media/safe-url.pipe';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common'; // Importa CommonModule aquí
import { RouterModule } from '@angular/router'; // Si necesitas enrutamiento

@Component({
  selector: 'app-player-media',
  templateUrl: './player-media.component.html',
  styleUrls: ['./player-media.component.css'],
  standalone: true, // Asegúrate de marcar el componente como standalone
  imports: [
    CommonModule, // Asegúrate de importar CommonModule para que funcione ngFor
    RouterModule, // Si necesitas enrutamiento, asegúrate de importar RouterModule
    SafeUrlPipe
  ]
})
export class PlayerMediaComponent implements OnInit {
  player?: Player;
  activeIndex = 0; // Índice de la imagen activa en el carrusel

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getPlayerDetails();
  }

  getPlayerDetails(): void {
    const playerId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('ID del jugador:', playerId);
    this.player = Players.find(player => player.id === playerId);
  }

  goBack(): void {
    this.location.back();
  }

  setActiveImage(index: number): void {
    this.activeIndex = index;
  }

  setActiveVideo(index: number): void {
    this.activeIndex = index;
  }
}

