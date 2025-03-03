import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { PlayersComponent } from './players/players.component';
import { PlayerCardComponent } from './player-card/player-card.component';
import { PlayerMediaComponent } from './player-media/player-media.component';
import { PentagonComponent } from './pentagon/pentagon.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'players', component: PlayersComponent },
  { path: 'player/:id', component: PlayerDetailComponent },
  { path: 'player/:id/media', component: PlayerMediaComponent },
  {path: 'player-card', component: PlayerCardComponent},
  {path: 'pentagon', component: PentagonComponent} //luego se tendrá que quitar cuando lo anidemos en la de player-detail!
];
// @NgModule({
//   imports: [RouterModule.forRoot(appRoutes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }