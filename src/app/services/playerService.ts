import { Injectable, NgZone } from '@angular/core';
import { Firestore, collection, addDoc, doc, updateDoc, deleteDoc, collectionData, docData,query, where, QueryConstraint } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


import { Player } from './player';  // Modelo de jugador

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private playerIdSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  playerId$: Observable<string | null> = this.playerIdSubject.asObservable();

  constructor(private firestore: Firestore, private ngZone: NgZone) {}  // Firestore se inyecta automáticamente

  /** ✅ Guarda el ID del jugador seleccionado */
  setPlayerId(playerId: string): void {
    if (!playerId) {
      console.log('HOPLAAAAASKLAJKLSA', playerId);
      console.error('El playerId que se intenta establecer es inválido');
      return;
    }
    console.log('Estableciendo playerId:', playerId); 
    this.playerIdSubject.next(playerId);
  }

  /** ✅ Obtiene todos los jugadores con su ID incluido */
  getPlayersWithIds(): Observable<Player[]> {
    const playersRef = collection(this.firestore, 'players');
    
    return new Observable((observer) => {
      this.ngZone.run(() => {  // Envuelve la llamada a Firebase en NgZone.run()
        collectionData(playersRef, { idField: 'id' }).subscribe({
          next: (data) => observer.next(data as Player[]),
          error: (err) => observer.error(err),
          complete: () => observer.complete(),
        });
      });
    });
  }

  /** ✅ Obtiene un solo jugador por ID */
  getPlayerById(playerId: string): Observable<Player | undefined> {
    if (!playerId) {
      console.log('HOPLAAAAAA', playerId);
      console.error('El playerId es indefinido o nulo');
      return of(undefined);
    }
  
    const playerRef = doc(this.firestore, `players/${playerId}`);
    return docData(playerRef, { idField: 'id' }).pipe(
      map((data) => {
        if (!data) return undefined;
  
        const player = data as Player;  // 👈 Aquí TypeScript entiende que es un Player
  
        return {
          ...player,
          gallery: player.gallery || [],  // 👈 Evita undefined
          video: player.video || []
        };
      }),
      catchError((error) => {
        console.error('Error obteniendo el jugador:', error);
        return of(undefined);
      })
    );
  }
  getPlayers(): Observable<Player[]> {
    
    const playersRef = collection(this.firestore, 'players');
    return collectionData(playersRef, { idField: 'id' }).pipe(
      
      map((data) => 
        data.map((player) => ({
          ...player as Player,  // 👈 Aseguramos que TypeScript entienda que es un Player
          gallery: (player as Player).gallery || [],
          video: (player as Player).video || []
        }))
      )
    );
    
  }
  

  getFilteredPlayers(filters: any): Observable<Player[]> {
    const playersRef = collection(this.firestore, 'players');
    let queryConstraints: QueryConstraint[] = [];

    if (filters.shirtNumber) queryConstraints.push(where('shirtNumber', '==', Number(filters.shirtNumber)));
    if (filters.position) queryConstraints.push(where('position', '==', filters.position));
    if (filters.age) queryConstraints.push(where('age', '==', Number(filters.age)));

    if (filters.average) {
      if (filters.average === '0-8') queryConstraints.push(where('average', '<=', 8));
      else if (filters.average === '8.1-9') queryConstraints.push(where('average', '>=', 8.1), where('average', '<=', 9));
      else if (filters.average === '9.1-10') queryConstraints.push(where('average', '>=', 9.1));
    }

    if (filters.stature && filters.stature.includes('-')) {
      const [min, max] = filters.stature.split('-').map((v: string) => parseInt(v, 10));
      queryConstraints.push(where('stature', '>=', min), where('stature', '<=', max));
    }

    const playersQuery = query(playersRef, ...queryConstraints);

    return new Observable((observer) => {
      this.ngZone.run(() => {  // Envuelve la llamada a Firebase en NgZone.run()
        collectionData(playersQuery, { idField: 'id' }).subscribe({
          next: (data) => observer.next(data as Player[]),
          error: (err) => observer.error(err),
          complete: () => observer.complete(),
        });
      });
    });
  }


  //cruuuuud me ninha
  /** ✅ Obtiene detalles de un jugador */
  getPlayerDetails(playerId: string): Observable<Player | undefined> {
    return this.getPlayerById(playerId);
  }
  addPlayer(player: Player) {
    const playersRef = collection(this.firestore, 'players');
    return from(addDoc(playersRef, player)).pipe(
      catchError((error) => {
        console.error('Error al agregar el jugador:', error);
        return of(undefined);
      })
    );
  }
  deletePlayer(playerId: string) {
    const playerRef = doc(this.firestore, `players/${playerId}`);
    return from(deleteDoc(playerRef)).pipe(
      catchError((error) => {
        console.error('Error al eliminar el jugador:', error);
        return of(undefined);
      })
    );
  }
  updatePlayer(playerId: string, player: Player) {
    const playerRef = doc(this.firestore, `players/${playerId}`);
    const updateData: { [key: string]: any } = { ...player };
    return from(updateDoc(playerRef, updateData)).pipe(
      catchError((error) => {
        console.error('Error al actualizar el jugador:', error);
        return of(undefined);
      })
    );
  }
}
