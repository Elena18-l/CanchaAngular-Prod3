import { Routes } from '@angular/router';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { PlayersComponent } from './players/players.component';
import { PlayerMediaComponent } from './player-media/player-media.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'players', pathMatch: 'full' }, // Redirigir correctamente
  { path: 'players', component: PlayersComponent }, // Lista de jugadores
  { path: 'player/:id', component: PlayerDetailComponent }, // Detalle de un jugador
  {path: 'player/:id/media', component: PlayerMediaComponent},
];
