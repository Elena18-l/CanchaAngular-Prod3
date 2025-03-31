import { Injectable } from '@angular/core';
import { collection, query, where, getDocs, Firestore, QueryConstraint, doc, getDoc } from 'firebase/firestore';
import { Player } from './player';  // Asegúrate de tener correctamente el modelo Player
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from '../config/firebase-setup';
import { initializeApp } from 'firebase/app';
import { from, map, Observable, of } from 'rxjs';
import { collectionData } from '@angular/fire/firestore';


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

  getPlayers(): Observable<Player[]> {
    const playersRef = collection(this.firestore, 'players');
    return collectionData(playersRef, { idField: 'id' }) as Observable<Player[]>;
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


  getFilteredPlayers(filters: any): Observable<Player[]> {
    const playersRef = collection(this.firestore, 'players');

    console.log("***********************************************************************");

    // Creamos un array para almacenar los filtros de la consulta
    let queryConstraints: QueryConstraint[] = [];

    if (filters.shirtNumber) {
      queryConstraints.push(where('shirtNumber', '==', Number (filters.shirtNumber)));
    }

    if (filters.position) {
      queryConstraints.push(where('position', '==', filters.position));
    }

    if (filters.average) {
      if (filters.average === '0-8') {
        queryConstraints.push(where('average', '<=', 8));
      } else if (filters.average === '8.1-9') {
        queryConstraints.push(where('average', '>=', 8.1), where('average', '<=', 9));
      } else if (filters.average === '9.1-10') {
        queryConstraints.push(where('average', '>=', 9.1));
      }
    }

    if (filters.age) {
      queryConstraints.push(where('age', '==', Number (filters.age)));
    }

    if (filters.stature && filters.stature.includes('-')) {
      const [min, max] = filters.stature.split('-').map((v: string) => parseInt(v, 10));
      queryConstraints.push(where('stature', '>=', min), where('stature', '<=', max));
    }

    // Construimos la consulta solo si hay filtros
    const playersQuery = query(playersRef, ...queryConstraints);

    // Usamos `from()` para convertir la promesa en un Observable
    return from(
      getDocs(playersQuery).then((querySnapshot) => {
        return querySnapshot.docs.map((doc) => doc.data() as Player);
      })
    );
  }
}
