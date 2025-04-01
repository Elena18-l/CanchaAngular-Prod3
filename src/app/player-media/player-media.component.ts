import { Component, OnInit, Input } from '@angular/core';
import { PlayerService } from '../services/playerService';
import { Player } from '../services/player';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SafeUrlPipe } from './safe-url.pipe';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-player-media',
  templateUrl: './player-media.component.html',
  styleUrls: ['./player-media.component.css'],
  imports: [CommonModule, SafeUrlPipe]
})
export class PlayerMediaComponent implements OnInit {

  @Input() player?: Player; 
  player$?: Observable<Player | undefined>;
 
  gallery: string[] = [];
  modalType: 'image' | 'video' | null = null;
  activeIndex = 0;

  constructor(private playerService: PlayerService,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.playerService.playerId$.subscribe(playerId => {
      console.log('📌 PlayerId recibido en MediaComponent:', playerId);
      
      // Verifica que el playerId no sea undefined ni vacío
      if (!playerId || playerId.trim() === '') {
        console.log("⚠️ playerId es null o vacío, evitando llamada a Firebase");
        return;
      }
  
      // Realizamos la llamada solo si tenemos un playerId válido
      this.playerService.getPlayerDetails(playerId).subscribe(playerData => {
        if (playerData) {
          this.player = playerData;
          this.gallery = playerData.gallery || [];
          console.log('📸 Galería cargada:', this.gallery);
        } else {
          console.log('⚠️ Jugador no encontrado');
        }
      });
    });
  }
  
        

  
openModal(type: 'image' | 'video', index: number = 0, event?: Event): void {
  if (event) event.stopPropagation(); // 🔥 Evita que se cierre instantáneamente
  
  if (!this.player) {
    console.warn('⚠️ No hay player definido, el modal no se mostrará.');
    return;
  }

  this.modalType = type;
  this.activeIndex = index;
  
  console.log(`📌 Abriendo modal: ${type}, índice: ${index}`);
  
  this.cdr.detectChanges(); // 🔥 Fuerza la actualización del DOM
}
  

  closeModal(): void {
    this.modalType = null;
    console.log('Cerrando modal');
  }

  setActive(index: number): void {
    this.activeIndex = index;
    console.log('Imagen/Video activo:', this.activeIndex);
  }

  next(): void {
    if (this.activeIndex < (this.gallery.length - 1)) {
      this.activeIndex++;
    }
  }

  prev(): void {
    if (this.activeIndex > 0) {
      this.activeIndex--;
    }
  }
}
