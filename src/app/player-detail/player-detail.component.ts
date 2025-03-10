import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; // <-- IMPORTAR CommonModule

import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../services/playerService';
import {Player} from '../services/player';
import {Router, ActivatedRoute, RouterModule } from '@angular/router';
import {Players} from '../services/mockup-players';
import { Location } from '@angular/common';  //esto es para ir para atrás
import { FormsModule } from '@angular/forms';
import { PlayerMediaComponent } from '../player-media/player-media.component';
import { Skills } from '../services/player';
import { PentagonComponent } from '../pentagon/pentagon.component';
@Component({
  selector: 'app-player-detail',  
  standalone: true,
  templateUrl: './player-detail.component.html',
  styleUrl: './player-detail.component.css',
  imports: [CommonModule, FormsModule, RouterModule, PentagonComponent],
})
export class PlayerDetailComponent implements OnInit {
  player?: Player;
  
  constructor
  (private route: ActivatedRoute, 
  private playerService: PlayerService,
  private location: Location,
  private router: Router ) { }
  ngOnInit():void {
    this.getPlayerDetails();
    // this.getMedia();
  }
  getPlayerDetails(): void {
    const playerId = Number(this.route.snapshot.paramMap.get('id')); // Obtiene el ID de la URL
    console.log('ID del jugador:', playerId); // <-- Agregar esto para depurar
    this.player = Players.find(player => player.id === playerId);
    console.log('Jugador encontrado:', this.player);
    console.log(this.player?.skills);
    // this.player = Players.find(player=> player.name === playerName); // <-- Verificar si el jugador existe
  }


  
  goBack(): void {
    this.location.back();
  }
  getMedia(): void {
    if (this.player) {
      this.router.navigate(['/player', this.player.id, 'media']); // Redirige a la página de media
    }
  }
  
  // getMedia(): void {
  //   const playerId = Number(this.route.snapshot.paramMap.get('id')); // Obtiene el ID de la URL
  //   console.log('ID del jugador:', playerId); // <-- Agregar esto para depurar
  //   this.player = Players.find(player => player.id === playerId);
  //   console.log('Jugador encontrado:', this.player); // <-- Verificar si el jugador existe
  //   this.router.navigate(['/player/:id/media']);
  // }
}

