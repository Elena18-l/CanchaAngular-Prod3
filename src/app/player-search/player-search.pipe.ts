import { Pipe, PipeTransform } from '@angular/core';
import { Player } from '../services/player';

@Pipe({
  name: 'playerFilter',
  pure: false // Se actualizará en tiempo real
})

export class PlayerSearchPipe implements PipeTransform {

  transform(players: Player[], searchText: string): Player[] {
    if (!players || !searchText)  return []; // Si no hay jugadores o no hay texto, devolver array vacío

    searchText = searchText.toLowerCase();

    return players.filter((player) =>
      Object.values(player).some(
        (value) =>
          value !== null &&
          value !== undefined &&
          String(value).toLowerCase().includes(searchText) // Compara si el valor contiene el texto de búsqueda
      )
    );
  }
}



// // Aplicar filtros avanzados
// if (filters) {
//   filteredPlayers = filteredPlayers.filter(player => {
//     let matches = true;

//     if (filters.name) {
//       matches = matches && player.name.toLowerCase().includes(filters.name.toLowerCase());
//     }
//     if (filters.team && filters.team !== 'Todos') {
//       matches = matches && player.team.toLowerCase() === filters.team.toLowerCase();
//     }
//     if (filters.position && filters.position !== 'Todos') {
//       matches = matches && player.position.toLowerCase() === filters.position.toLowerCase();
//     }
//     if (filters.age) {
//       matches = matches && player.age === filters.age;
//     }
//     if (filters.stature) {
//       matches = matches && player.stature >= filters.stature.min && player.stature <= filters.stature.max;
//     }
//     if (filters.average) {
//       matches = matches && player.average >= filters.average.min && player.average <= filters.average.max;
//     }
//     if (filters.shirtNumber) {
//       matches = matches && player.shirtNumber === filters.shirtNumber;
//     }

//     return matches;
//   });
// }