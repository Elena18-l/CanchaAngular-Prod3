import { Pipe, PipeTransform } from '@angular/core';
import { Player } from '../services/player';

@Pipe({
  name: 'playerFilter',
  pure: false // Se actualizará en tiempo real
})
export class PlayerSearchPipe implements PipeTransform {

  transform(players: Player[], searchText: string): Player[] {
    if (!players || !searchText) return []; // Si no hay jugadores o no hay texto, devolver array vacío

    searchText = searchText.toLowerCase();

    return players.filter((player) =>
      Object.values(player).some((value) =>
        value !== null &&
        value !== undefined &&
        String(value).toLowerCase().includes(searchText) // Convierte todos los valores a string antes de compararlos
      )
    );
  }
}
