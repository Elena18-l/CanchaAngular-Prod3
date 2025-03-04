import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { SearchService } from './services/searchService'; // Importa RouterModule completo

@Component({
  selector: 'app-root',
  imports: [RouterModule],  // Usa RouterModule en lugar de solo RouterOutlet
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent {
  title = 'chancha-angular';

  constructor(private searchService: SearchService) { }

  onSearchChange(event:Event){
    const input = event.target as HTMLInputElement;
    this.searchService.updateSearchText(input.value);
  }
}
