import { Injectable } from '@angular/core';
import { Firestore, collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { Player } from './player';  // Asegúrate de tener correctamente el modelo Player
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from '../config/firebase-setup';
import { initializeApp } from 'firebase/app';
import { Observable } from 'rxjs';

// Inicialización de Firebase
initializeApp(firebaseConfig);

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private firestore: Firestore;

  constructor() {
    // Inicializamos Firestore dentro del servicio
    this.firestore = getFirestore();
  }

  // Obtener todos los jugadores desde Firebase
  getPlayers(): Observable<Player[]> {
    const playersRef = collection(this.firestore, 'players');
    return new Observable<Player[]>((observer) => {
      getDocs(playersRef).then((querySnapshot) => {
        const players: Player[] = [];
        querySnapshot.forEach((doc) => {
          players.push(doc.data() as Player);
        });
        observer.next(players);
        observer.complete();
      }).catch((error) => {
        observer.error(error);
      });
    });
  }

  // Obtener detalles de un jugador por ID
  getPlayerDetails(playerId: string): Observable<Player | undefined> {
    const playerDocRef = doc(this.firestore, `players/${playerId}`);
    return new Observable<Player | undefined>((observer) => {
      getDoc(playerDocRef).then((docSnap) => {
        if (docSnap.exists()) {
          observer.next(docSnap.data() as Player); // Retorna los datos del jugador
        } else {
          observer.next(undefined); // Si el documento no existe
        }
        observer.complete();
      }).catch((error) => {
        observer.error(error);
      });
    });
  }

  // Obtener jugadores filtrados desde Firebase
  getFilteredPlayers(filters: any): Observable<Player[]> {
    const playersRef = collection(this.firestore, 'players');
    let playersQuery = query(playersRef);  // Iniciamos una consulta vacía

    if (filters.shirtNumber) {
      playersQuery = query(playersQuery, where('shirtNumber', '==', filters.shirtNumber));
    }

    if (filters.position) {
      playersQuery = query(playersQuery, where('position', '==', filters.position));
    }

    if (filters.average) {
      if (filters.average === '0-8') {
        playersQuery = query(playersQuery, where('average', '<=', 8));
      } else if (filters.average === '8.1-9') {
        playersQuery = query(playersQuery, where('average', '>=', 8.1), where('average', '<=', 9));
      } else if (filters.average === '9.1-10') {
        playersQuery = query(playersQuery, where('average', '>=', 9.1));
      }
    }

    if (filters.age) {
      playersQuery = query(playersQuery, where('age', '==', filters.age));
    }

    if (filters.stature) {
      const [min, max] = filters.stature.split('-').map((v: string) => parseInt(v, 10));
      playersQuery = query(playersQuery, where('stature', '>=', min), where('stature', '<=', max));
    }

    return new Observable<Player[]>((observer) => {
      getDocs(playersQuery).then((querySnapshot) => {
        const players: Player[] = [];
        querySnapshot.forEach((doc) => {
          players.push(doc.data() as Player);  // Aquí obtenemos los datos del documento
        });
        observer.next(players);
        observer.complete();
      }).catch((error) => {
        observer.error(error);  // Maneja los errores
      });
    });
  }
}
