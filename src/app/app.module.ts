import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

// Components
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { PlayersComponent } from './players/players.component';
import { PlayerCardComponent } from './player-card/player-card.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'players', component: PlayersComponent },
  { path: 'player/:id', component: PlayerDetailComponent },
  { path: 'player-card', component: PlayerCardComponent },
];

@NgModule({
  declarations: [
    DashboardComponent,
    PlayerDetailComponent,
    PlayersComponent,
    PlayerCardComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
})
export class AppModule {}
