import { Component } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { Player } from '../services/player';

@Pipe({
  name: 'playerFilter',
  pure: false // Se actualizará en tiempo real
})

export class PlayerSearchComponent implements PipeTransform {

  transform(players: Player[], searchText: string, filters: any): Player[] {
    if (!players) return [];

    let filteredPlayers = players;

    // Filtrar por búsqueda en search bar
    if (searchText) {
      searchText = searchText.toLowerCase();
      filteredPlayers = filteredPlayers.filter(player =>
        player.name.toLowerCase().includes(searchText) ||
        player.team.toLowerCase().includes(searchText) ||
        player.position.toLowerCase().includes(searchText) ||
        player.age.toString().includes(searchText) ||
        player.stature.toString().includes(searchText) ||
        player.average.toString().includes(searchText) ||
        player.shirtNumber.toString().includes(searchText)
      );
    }

    // Aplicar filtros avanzados
    if (filters) {
      filteredPlayers = filteredPlayers.filter(player => {
        let matches = true;

        if (filters.name) {
          matches = matches && player.name.toLowerCase().includes(filters.name.toLowerCase());
        }
        if (filters.team && filters.team !== 'Todos') {
          matches = matches && player.team.toLowerCase() === filters.team.toLowerCase();
        }
        if (filters.position && filters.position !== 'Todos') {
          matches = matches && player.position.toLowerCase() === filters.position.toLowerCase();
        }
        if (filters.age) {
          matches = matches && player.age === filters.age;
        }
        if (filters.stature) {
          matches = matches && player.stature >= filters.stature.min && player.stature <= filters.stature.max;
        }
        if (filters.average) {
          matches = matches && player.average >= filters.average.min && player.average <= filters.average.max;
        }
        if (filters.shirtNumber) {
          matches = matches && player.shirtNumber === filters.shirtNumber;
        }

        return matches;
      });
    }

    return filteredPlayers;
  }
}