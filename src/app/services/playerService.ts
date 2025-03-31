import { inject, Injectable } from '@angular/core';
import { query, where, getDocs, QueryConstraint, getDoc } from 'firebase/firestore';
import { Player } from './player';  // Asegúrate de tener correctamente el modelo Player
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from '../config/firebase-setup';
import { initializeApp } from 'firebase/app';
import { BehaviorSubject, from, map, Observable, of } from 'rxjs';
import { Firestore, collection, addDoc, doc, updateDoc, deleteDoc, collectionData } from '@angular/fire/firestore';

// Inicialización de Firebase
initializeApp(firebaseConfig);

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private firestore: Firestore;
  private playerIdSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  playerId$: Observable<string | null> = this.playerIdSubject.asObservable();
  
  constructor() {
    // Inicializamos Firestore dentro del servicio
    this.firestore = getFirestore();
  }

  setPlayerId(playerId: string): void {
    if (!playerId) {
      console.error('El playerId que se intenta establecer es inválido');
      return;
    }
    console.log('Estableciendo playerId:', playerId); 
    this.playerIdSubject.next(playerId);
  }
  
  
  getPlayerId(): Observable<string | null> {
    const playersRef = collection(this.firestore, 'players'); 
    return from(getDocs(playersRef)).pipe(
      map(querySnapshot => {
        if (!querySnapshot.empty) {
          const firstPlayer = querySnapshot.docs[0]; // Obtenemos el primer jugador
          return firstPlayer.id; // Retornamos el ID del documento
        } else {
          return null; // No hay jugadores en la base de datos
        }
      })
    );
  }

  // Obtener lista de jugadores
  getPlayers(): Observable<Player[]> {
    const playersRef = collection(this.firestore, 'players');
    return collectionData(playersRef, { idField: 'id' }) as Observable<Player[]>;
  }

  // Obtener detalles de un jugador por ID
  getPlayerDetails(playerId: string): Observable<Player | undefined> {
    if (!playerId) {
      console.error('El playerId es indefinido o nulo');
      return of(undefined); // Retorna un observable vacío si el ID es incorrecto
    }
  
    const playerDocRef = doc(this.firestore, `players/${playerId}`); // Ruta correcta al documento
    console.log('Obteniendo detalles para el playerId:', playerId);
    
    return new Observable<Player | undefined>((observer) => {
      getDoc(playerDocRef).then((docSnap) => {
        if (docSnap.exists()) {
          const playerData = docSnap.data() as Player;
          // Incluimos el id del documento en los datos del jugador
          const player: Player = {
            ...playerData,
            id: docSnap.id,  // Incluimos el id aquí
            gallery: playerData.gallery || [],  // Aseguramos que gallery no esté vacío
            video: playerData.video || []       // Aseguramos que video no esté vacío
          };
          observer.next(player);
        } else {
          console.log('Jugador no encontrado');
          observer.next(undefined); // Si el jugador no existe
        }
        observer.complete();
      }).catch((error) => {
        console.error('Error al recuperar los detalles del jugador:', error);
        observer.error(error);
      });
    });
  }
  
  
  loadPlayerId(): void {
    // Primero, suscribimos al observable de playerId
    this.getPlayerId().subscribe(playerId => {
      if (playerId) {
        console.log('Cargando playerId desde Firestore:', playerId);
        this.setPlayerId(playerId);  // Si encontramos un playerId, lo configuramos
      } else {
        console.log('No se encontró un playerId en Firestore');
      }
    });
  }
  
  
  // Obtener jugadores filtrados
  getFilteredPlayers(filters: any): Observable<Player[]> {
    const playersRef = collection(this.firestore, 'players');
    console.log("***********************************************************************");

    let queryConstraints: QueryConstraint[] = [];

    if (filters.shirtNumber) {
      queryConstraints.push(where('shirtNumber', '==', Number(filters.shirtNumber)));
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
      queryConstraints.push(where('age', '==', Number(filters.age)));
    }

    if (filters.stature && filters.stature.includes('-')) {
      const [min, max] = filters.stature.split('-').map((v: string) => parseInt(v, 10));
      queryConstraints.push(where('stature', '>=', min), where('stature', '<=', max));
    }

    const playersQuery = query(playersRef, ...queryConstraints);

    return from(
      getDocs(playersQuery).then((querySnapshot) => {
        return querySnapshot.docs.map((doc) => doc.data() as Player);
      })
    );
  }
}
