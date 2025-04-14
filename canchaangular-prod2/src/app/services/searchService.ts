import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root', // Se proporciona a nivel de toda la aplicación
})
export class SearchService {
  private searchTextSubject = new BehaviorSubject<string>(''); // Inicialmente vacío
  searchText$ = this.searchTextSubject.asObservable(); // Observable para que otros se suscriban

  updateSearchText(text: string) {
    console.log('texto actualizado en el servicio:', text);
    this.searchTextSubject.next(text); // Actualiza el valor del texto de búsqueda
  }
}
