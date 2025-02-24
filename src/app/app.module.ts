import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { PlayerMediaComponent } from './player-media/player-media.component';
import { PlayerSearchComponent } from './player-search/player-search.component';
import { PlayersComponent } from './players/players.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PlayerDetailComponent,
    PlayerMediaComponent,
    PlayerSearchComponent,
    PlayersComponent,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
