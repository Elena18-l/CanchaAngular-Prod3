import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from './player';
import { Firestore, collection, collectionData, doc, docData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor(private firestore: Firestore) {}

  // Obtener todos los jugadores desde Firebase
  getPlayers(): Observable<Player[]> {
    const playersRef = collection(this.firestore, 'players');
    return collectionData(playersRef, { idField: 'id' }) as Observable<Player[]>;
  }


  // Obtener detalles de un jugador por ID
  getPlayerDetails(playerId: string): Observable<Player | undefined> {
    const playerDocRef = doc(this.firestore, `players/${playerId}`);
    return docData(playerDocRef, { idField: 'id' }) as Observable<Player | undefined>;
  }
}
