import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
//import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { InMemoryDataService } from './in-memory-data.service';

//import { AppRoutingModule } from './app-routing.module';
// Componentes
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { PlayerMediaComponent } from './player-media/player-media.component';
import { PlayerSearchComponent } from './player-search/player-search.component';
import { PlayersComponent } from './players/players.component';
import { bootstrapApplication } from '@angular/platform-browser';
// Enrutamiento
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from './app.routes';  // Importa tus rutas desde un archivo separado
bootstrapApplication(AppComponent).catch((err) => console.error(err));
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'players', component: PlayersComponent },
  { path: 'player/:id', component: PlayerDetailComponent },
];

@NgModule({
imports: [BrowserModule, RouterModule.forRoot(routes)],
exports: [RouterModule], 


})
export class AppModule {}
