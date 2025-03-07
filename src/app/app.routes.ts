import { RouterModule, Routes } from '@angular/router';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { PlayersComponent } from './players/players.component';
import { PlayerCardComponent } from './player-card/player-card.component';	
import { PlayerMediaComponent } from './player-media/player-media.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/players', pathMatch: 'full' },  
  { path: 'players', component: PlayersComponent },
  { path: 'player/:id', component: PlayerDetailComponent },
  { path: 'player/:id/media', component: PlayerMediaComponent },
  {path: 'player-card', component: PlayerCardComponent},
];
// @NgModule({
//   imports: [RouterModule.forRoot(appRoutes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }