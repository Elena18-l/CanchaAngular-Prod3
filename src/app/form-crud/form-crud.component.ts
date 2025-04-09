import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { addDoc, collection, doc, Firestore } from '@angular/fire/firestore';  // Firestore
import { getDatabase, ref as dbRef, set } from 'firebase/database';  // Realtime Database
import { Storage, ref, uploadBytesResumable, getDownloadURL, getStorage } from '@angular/fire/storage';  // Storage
import { Observable } from 'rxjs';
import { PlayerService } from '../services/playerService';
import { Player } from '../services/player';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-crud',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-crud.component.html',
  styleUrls: ['./form-crud.component.css'],
})
export class FormCrudComponent {
  isFormOpen: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() playerAdded = new EventEmitter<Player>();
  filteredPlayersList$: Observable<Player[]> | undefined;
  selectedFilters: any = {
    shirtNumber: '',
    position: '',
    average: '',
    age: '',
    stature: ''
  };
  
  playerForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    position: new FormControl('', Validators.required),
    shirtNumber: new FormControl(null, Validators.required),
    age: new FormControl(null, Validators.required),
    stature: new FormControl(null, Validators.required),
    average: new FormControl(null, Validators.required),
    bio: new FormControl('', Validators.required),
    portrait: new FormControl(''),  // Puede ser una URL a la imagen
    foto: new FormControl(''),
    video: new FormArray([]),
    gallery: new FormArray([]),
    skills: new FormGroup({
      fisico: new FormControl(null, Validators.required),
      fuerzaMental: new FormControl(null, Validators.required),
      habilidadEspecial: new FormControl(null, Validators.required),
      resistencia: new FormControl(null, Validators.required),
      tecnica: new FormControl(null, Validators.required),
    }),
  });

  constructor(private firestore: Firestore, private playerService: PlayerService) {}

  openForm() {
    this.isFormOpen = true;
    const playersRef = collection(this.firestore, 'players');
    const tempDocRef = doc(playersRef); 
    this.playerForm.patchValue({ id: tempDocRef.id });
  }
  openCloudinaryWidget(fieldName: string) {
    const cloudName = 'dxcwcmfhv';  // tu cloudName
    const uploadPreset = 'player_uploads'; // tu uploadPreset
  
    // @ts-ignore
    window.cloudinary.openUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
        sources: ['local', 'url', 'camera'],
        multiple: false,
        cropping: false,
        folder: 'jugadores',  // carpeta opcional
        resourceType: fieldName === 'video' ? 'video' : 'auto',  // Permite imágenes, videos, audios, etc.
        theme: 'white'
      },
      (error: any, result: any) => {
        if (error) {
          console.error('❌ Error en Cloudinary Widget:', error);
          return;
        }

        // Asegúrate de que result es un objeto y tiene el evento 'success'
        console.log(result);
        if (result && result.event === 'success') {
          const fileUrl = result.info.secure_url;
          console.log('✅ Archivo subido a Cloudinary:', fileUrl);
          this.playerForm.patchValue({ [fieldName]: fileUrl });
        } else {
          console.error('❌ Error en la carga:', result);
        }
      }
    );
}

  
  
  // Subir archivo a Firebase Storage


  
  

  async addPlayer() {
    if (this.playerForm.valid) {
      try {
        const playersRef = collection(this.firestore, 'players');
        const docRef = await addDoc(playersRef, this.playerForm.value);
        console.log('Jugador añadido con éxito, ID:', docRef.id);

        const db = getDatabase();
        const playersRefRealtime = dbRef(db, 'players/' + docRef.id);
        await set(playersRefRealtime, this.playerForm.value);

        this.onPlayerAdded();
        this.closeModal();
        this.closeForm();
      } catch (error) {
        console.error('Error al añadir jugador:', error);
      }
    } else {
      console.log('Formulario inválido');
      this.playerForm.markAllAsTouched();
    }
  }

  onPlayerAdded() {
    console.log('Jugador añadido. Recargando lista...');
    this.filteredPlayersList$ = this.playerService.getFilteredPlayers(this.selectedFilters);
  }

  closeModal() {
    this.close.emit();
  }

  closeForm() {
    this.isFormOpen = false;
    this.playerForm.reset();
  }
}
