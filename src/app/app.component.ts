import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { SearchService } from './services/searchService';
import { PlayerResultsComponent } from './player-results/player-results.component';
import { NgIf } from '@angular/common'; // Importa RouterModule completo

@Component({
  selector: 'app-root',
  imports: [RouterModule, PlayerResultsComponent, NgIf],  // Usa RouterModule en lugar de solo RouterOutlet
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent {
  title = 'chancha-angular';
  searchText = ''; // Variable para almacenar el texto de búsqueda

  constructor(private searchService: SearchService) {
    this.searchService.searchText$.subscribe(text => {
      console.log('Texto actualizado en AppComponent:', text);
      this.searchText = text;  // 🔹 Se actualiza el valor correctamente
    });
   }

  onSearchChange(event:Event){
    const input = event.target as HTMLInputElement;
    console.log('Texto actualizado en la bara de búsqueda:', input.value);
    this.searchService.updateSearchText(input.value);
  }
}
