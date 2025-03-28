import { Injectable } from '@angular/core';
import { collection, query, where, getDocs, Firestore, QueryConstraint, doc, getDoc } from 'firebase/firestore';
import { Player } from './player';  // Asegúrate de tener correctamente el modelo Player
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from '../config/firebase-setup';
import { initializeApp } from 'firebase/app';
import { from, Observable, of } from 'rxjs';


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
//  console.log('obteniendo jugadores');
//     const playersRef = collection(this.firestore, 'players');
//    const response = new Observable<Player[]>((observer) => {
//       getDocs(playersRef).then((querySnapshot) => {
//         const players: Player[] = [];
//         querySnapshot.forEach((doc) => {
//           players.push(doc.data() as Player);
//         });
//         observer.next(players);
//         observer.complete();
//       }).catch((error) => {
//         observer.error(error);
//       });
//     });
// console.log(response);
// return response;
    const players: Player[] = [
      
      {id: '1', name: 'Takenori Akagi', age: 18, team: 'Shohoku', stature: 193, average: 9.6, shirtNumber: 4, position: 'Pivot', foto:'assets/playerFullImage/akagi.png', portrait:'assets/playerPortrait/AkagiCard.png', gallery:['assets/gallery/takenori1.png','assets/gallery/takenori2.png','assets/gallery/takenori3.png','assets/gallery/takeniri4.png'], bio:'Capitán y pívot de Shohoku, conocido por su seriedad y disciplina. Sueña con llevar al equipo al campeonato nacional y es considerado el mejor pívot de la prefectura de Kanagawa.', skills: {fisico:10, tecnica:9, fuerzaMental:9,habilidadEspecial:10, resistencia:9}, video: ["https://www.youtube.com/embed/NNIEUJ3HLck"]},//akagi
      {id: '2', name: 'Kiminoru Kogure', age: 18, team: 'Shohoku', stature: 178, average: 8.4, shirtNumber: 5, position: 'Alero',  foto:'assets/playerFullImage/kogure.png', portrait:'assets/playerPortrait/KogureCard.png', gallery:['assets/gallery/kiminobu1.webp','assets/gallery/kiminobu2.webp','assets/gallery/kiminobu3.webp','assets/gallery/kiminobu4.webp'], bio:'Subcapitán y escolta suplente de Shohoku. Amigo cercano de Akagi desde la secundaria, es un jugador confiable y apoyo moral para el equipo, destacando por su actitud amable y perseverancia.',skills: {fisico:7, tecnica:8, fuerzaMental:8,habilidadEspecial:7, resistencia:8}, video: ["https://www.youtube.com/embed/6jYNg819Zew"]},//kogure
      {id: '3', name: 'Ryouta Miyagi', age: 17, team: 'Shohoku', stature: 168, average: 9, shirtNumber: 7, position: 'Base',  foto:'assets/playerFullImage/miyagi.svg', portrait:'assets/playerPortrait/RyotaCard.png',  gallery:['assets/gallery/ryouta1.webp','assets/gallery/ryouta2.webp','assets/gallery/ryouta3.webp','assets/gallery/ryouta4.webp'], bio:'Base titular de Shohoku, destacado por su velocidad y habilidades defensivas. Tras superar conflictos personales, se convierte en un miembro clave del equipo y desarrolla una estrecha amistad con Sakuragi.',skills: {fisico:8, tecnica:10, fuerzaMental:10,habilidadEspecial:7, resistencia:10}, video: ["https://www.youtube.com/embed/XinHUEX5hwU"]},//ryouta   // CAMBIAR VÍDEO CADA JUGADOR - OJO CON ''EMBED'' PARA QUE REPRODUZCA BIEN
      {id: '4', name: 'Hanamichi Sakuragi', age: 15, team: 'Shohoku', stature: 189.2, average: 9, shirtNumber: 10, position: 'Ala',  foto:'assets/playerFullImage/sakuragi.png', portrait:'assets/playerPortrait/HanamichiCard.png', gallery:['assets/gallery/hanamichi1.png','assets/gallery/hanamichi2.png','assets/gallery/hanamichi3.png','assets/gallery/hanamichi4.png'], bio:'Hanamichi Sakuragi es un estudiante de Shohoku con carácter impulsivo y talento nato para el baloncesto. Inicialmente, lo desprecia, pero al unirse al equipo por Haruko Akagi, se convierte en un jugador clave, destacando en rebotes y mejorando su técnica con esfuerzo y determinación.',skills: {fisico:10, tecnica:8, fuerzaMental:8,habilidadEspecial:10, resistencia:10}, video: ["https://www.youtube.com/embed/n9a9I0N0Pa4"]},//rukawa
      {id: '5', name: 'Kaede Rukawa', age: 15, team: 'Shohoku', stature: 187, average: 9.2, shirtNumber: 11, position: 'Alero',  foto:'assets/playerFullImage/rukawa.svg', portrait:'assets/playerPortrait/RukawaCard.png',  gallery:['assets/gallery/kaede1.webp','assets/gallery/kaede2.webp','assets/gallery/kaede3.webp','assets/gallery/kaede4.webp'], bio:'Alero estrella de Shohoku, es talentoso, frío y extremadamente competitivo. Su sueño es jugar en la NBA, y su increíble habilidad ofensiva lo convierte en el mayor anotador del equipo. Aunque rivaliza con Sakuragi, juntos fortalecen a Shohoku en su camino al campeonato.',skills: {fisico:9, tecnica:10, fuerzaMental:9,habilidadEspecial:10, resistencia:8}, video: ["https://www.youtube.com/embed/MADU7BsdUWc"]},//michan
      {id: '6', name: 'Hisashi Mitsui', age: 18, team: 'Shohoku', stature: 176, average: 8.4, shirtNumber: 14, position: 'Escolta',  foto:'assets/playerFullImage/mitsui.png', portrait:'assets/playerPortrait/MichanCard.png',  gallery:['assets/gallery/hisashi1.webp','assets/gallery/hisashi2.webp','assets/gallery/hisashi3.webp','assets/gallery/hisashi4.webp'], bio:'Escolta titular de Shohoku, reconocido por su habilidad en los tiros de tres puntos. Tras una lesión y un período alejado del baloncesto, regresa al equipo, aportando experiencia y precisión en momentos clave.',skills: {fisico:7, tecnica:10, fuerzaMental:9,habilidadEspecial:10, resistencia:6}, video: ["https://www.youtube.com/embed/8OeFctOz8xw"]},
        
      
    ]
    console.log(players);
    return of(players);
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
  // getFilteredPlayers(filters: any): Observable<Player[]> {
  //   const playersRef = collection(this.firestore, 'players');
  //   console.log("***********************************************************************")
  //   let playersQuery = query(playersRef);  // Iniciamos una consulta vacía

  //   // if (filters.shirtNumber) {
  //   //   playersQuery = query(playersQuery, where('shirtNumber', '==', filters.shirtNumber));
  //   // }

  //   // if (filters.position) {
  //   //   playersQuery = query(playersQuery, where('position', '==', filters.position));
  //   // }

  //   // if (filters.average) {
  //   //   if (filters.average === '0-8') {
  //   //     playersQuery = query(playersQuery, where('average', '<=', 8));
  //   //   } else if (filters.average === '8.1-9') {
  //   //     playersQuery = query(playersQuery, where('average', '>=', 8.1), where('average', '<=', 9));
  //   //   } else if (filters.average === '9.1-10') {
  //   //     playersQuery = query(playersQuery, where('average', '>=', 9.1));
  //   //   }
  //   // }

  //   // if (filters.age) {
  //   //   playersQuery = query(playersQuery, where('age', '==', filters.age));
  //   // }

  //   // if (filters.stature) {
  //   //   const [min, max] = filters.stature.split('-').map((v: string) => parseInt(v, 10));
  //   //   playersQuery = query(playersQuery, where('stature', '>=', min), where('stature', '<=', max));
  //   // }

  //   // return new Observable<Player[]>((observer) => {
  //   //   getDocs(playersQuery).then((querySnapshot) => {
  //   //     const players: Player[] = [];
  //   //     querySnapshot.forEach((doc) => {
  //   //       players.push(doc.data() as Player);  // Aquí obtenemos los datos del documento
  //   //     });
  //   //     observer.next(players);
  //   //     observer.complete();
  //   //   }).catch((error) => {
  //   //     observer.error(error);  // Maneja los errores
  //   //   });
  //   // });
  //   const players: Player[] = [
      
  //     {id: '1', name: 'Takenori Akagi', age: 18, team: 'Shohoku', stature: 193, average: 9.6, shirtNumber: 4, position: 'Pivot', foto:'assets/playerFullImage/akagi.png', portrait:'assets/playerPortrait/AkagiCard.png', gallery:['assets/gallery/takenori1.png','assets/gallery/takenori2.png','assets/gallery/takenori3.png','assets/gallery/takeniri4.png'], bio:'Capitán y pívot de Shohoku, conocido por su seriedad y disciplina. Sueña con llevar al equipo al campeonato nacional y es considerado el mejor pívot de la prefectura de Kanagawa.', skills: {fisico:10, tecnica:9, fuerzaMental:9,habilidadEspecial:10, resistencia:9}, video: ["https://www.youtube.com/embed/NNIEUJ3HLck"]},//akagi
  //     {id: '2', name: 'Kiminoru Kogure', age: 18, team: 'Shohoku', stature: 178, average: 8.4, shirtNumber: 5, position: 'Alero',  foto:'assets/playerFullImage/kogure.png', portrait:'assets/playerPortrait/KogureCard.png', gallery:['assets/gallery/kiminobu1.webp','assets/gallery/kiminobu2.webp','assets/gallery/kiminobu3.webp','assets/gallery/kiminobu4.webp'], bio:'Subcapitán y escolta suplente de Shohoku. Amigo cercano de Akagi desde la secundaria, es un jugador confiable y apoyo moral para el equipo, destacando por su actitud amable y perseverancia.',skills: {fisico:7, tecnica:8, fuerzaMental:8,habilidadEspecial:7, resistencia:8}, video: ["https://www.youtube.com/embed/6jYNg819Zew"]},//kogure
  //     {id: '3', name: 'Ryouta Miyagi', age: 17, team: 'Shohoku', stature: 168, average: 9, shirtNumber: 7, position: 'Base',  foto:'assets/playerFullImage/miyagi.svg', portrait:'assets/playerPortrait/RyotaCard.png',  gallery:['assets/gallery/ryouta1.webp','assets/gallery/ryouta2.webp','assets/gallery/ryouta3.webp','assets/gallery/ryouta4.webp'], bio:'Base titular de Shohoku, destacado por su velocidad y habilidades defensivas. Tras superar conflictos personales, se convierte en un miembro clave del equipo y desarrolla una estrecha amistad con Sakuragi.',skills: {fisico:8, tecnica:10, fuerzaMental:10,habilidadEspecial:7, resistencia:10}, video: ["https://www.youtube.com/embed/XinHUEX5hwU"]},//ryouta   // CAMBIAR VÍDEO CADA JUGADOR - OJO CON ''EMBED'' PARA QUE REPRODUZCA BIEN
  //     {id: '4', name: 'Hanamichi Sakuragi', age: 15, team: 'Shohoku', stature: 189.2, average: 9, shirtNumber: 10, position: 'Ala',  foto:'assets/playerFullImage/sakuragi.png', portrait:'assets/playerPortrait/HanamichiCard.png', gallery:['assets/gallery/hanamichi1.png','assets/gallery/hanamichi2.png','assets/gallery/hanamichi3.png','assets/gallery/hanamichi4.png'], bio:'Hanamichi Sakuragi es un estudiante de Shohoku con carácter impulsivo y talento nato para el baloncesto. Inicialmente, lo desprecia, pero al unirse al equipo por Haruko Akagi, se convierte en un jugador clave, destacando en rebotes y mejorando su técnica con esfuerzo y determinación.',skills: {fisico:10, tecnica:8, fuerzaMental:8,habilidadEspecial:10, resistencia:10}, video: ["https://www.youtube.com/embed/n9a9I0N0Pa4"]},//rukawa
  //     {id: '5', name: 'Kaede Rukawa', age: 15, team: 'Shohoku', stature: 187, average: 9.2, shirtNumber: 11, position: 'Alero',  foto:'assets/playerFullImage/rukawa.svg', portrait:'assets/playerPortrait/RukawaCard.png',  gallery:['assets/gallery/kaede1.webp','assets/gallery/kaede2.webp','assets/gallery/kaede3.webp','assets/gallery/kaede4.webp'], bio:'Alero estrella de Shohoku, es talentoso, frío y extremadamente competitivo. Su sueño es jugar en la NBA, y su increíble habilidad ofensiva lo convierte en el mayor anotador del equipo. Aunque rivaliza con Sakuragi, juntos fortalecen a Shohoku en su camino al campeonato.',skills: {fisico:9, tecnica:10, fuerzaMental:9,habilidadEspecial:10, resistencia:8}, video: ["https://www.youtube.com/embed/MADU7BsdUWc"]},//michan
  //     {id: '6', name: 'Hisashi Mitsui', age: 18, team: 'Shohoku', stature: 176, average: 8.4, shirtNumber: 14, position: 'Escolta',  foto:'assets/playerFullImage/mitsui.png', portrait:'assets/playerPortrait/MichanCard.png',  gallery:['assets/gallery/hisashi1.webp','assets/gallery/hisashi2.webp','assets/gallery/hisashi3.webp','assets/gallery/hisashi4.webp'], bio:'Escolta titular de Shohoku, reconocido por su habilidad en los tiros de tres puntos. Tras una lesión y un período alejado del baloncesto, regresa al equipo, aportando experiencia y precisión en momentos clave.',skills: {fisico:7, tecnica:10, fuerzaMental:9,habilidadEspecial:10, resistencia:6}, video: ["https://www.youtube.com/embed/8OeFctOz8xw"]},
        
      
  //   ]
  //   console.log(players);
  //   return of(players);
  // }
  getFilteredPlayers(filters: any): Observable<Player[]> {
    const playersRef = collection(this.firestore, 'players');

    console.log("***********************************************************************");

    // Creamos un array para almacenar los filtros de la consulta
    let queryConstraints: QueryConstraint[] = [];

    if (filters.shirtNumber) {
      queryConstraints.push(where('shirtNumber', '==', filters.shirtNumber));
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
      queryConstraints.push(where('age', '==', filters.age));
    }

    if (filters.stature) {
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
