import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { addDoc, collection, doc, Firestore } from '@angular/fire/firestore';  // Firestore
import { getDatabase, ref as dbRef, set } from 'firebase/database';  // Realtime Database
import { Storage, ref, uploadBytesResumable, getDownloadURL, getStorage } from '@angular/fire/storage';  // Storage
import { Observable } from 'rxjs';
import { PlayerService } from '../services/playerService';
import { Player } from '../services/player';
import { CommonModule } from '@angular/common';
import { SafeUrlPipe } from '../player-media/safe-url.pipe';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-crud',
  imports: [ReactiveFormsModule, CommonModule, SafeUrlPipe],
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

  constructor(private firestore: Firestore, private playerService: PlayerService, private snackBar: MatSnackBar) { }
  openVideoSourceSelector() {
    const userChoice = prompt("¿Quieres subir un video desde tu dispositivo? Escribe 'archivo' o 'link'");

    if (userChoice === 'archivo') {
      this.openCloudinaryWidget('video'); // sube video
    } else if (userChoice === 'link') {
      const link = prompt("Pega el enlace del video (por ejemplo, de YouTube):");
      if (link && this.isValidVideoUrl(link)) {
        const control = this.playerForm.get('video') as FormArray;
        control.push(new FormControl(link));
      } else {
        alert('El enlace no es válido');
      }
    } else {
      alert("Opción no válida");
    }
  }
  isValidVideoUrl(url: string): boolean {
    const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|vimeo\.com|drive\.google\.com|.*\.mp4)(\/[\w-]+)*(\?[\w=&-]+)?$/;
    return pattern.test(url);
  }
  isYouTubeLink(url: string): boolean {
    return /youtube\.com|youtu\.be/.test(url);
  }

  extractYouTubeId(url: string): string {
    const match = url.match(/(?:\?v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : '';
  }

  openForm() {
    this.isFormOpen = true;
    const playersRef = collection(this.firestore, 'players');
    const tempDocRef = doc(playersRef);
    this.playerForm.patchValue({ id: tempDocRef.id });
  }
  openCloudinaryWidget(fieldName: 'portrait' | 'foto' | 'video' | 'gallery') {
    const cloudName = 'dxcwcmfhv';  // tu cloudName
    const uploadPreset = 'player_uploads'; // tu uploadPreset

    let resourceType: 'image' | 'video' = 'image';
    let multiple = false;
    let folder = 'player_media';

    // Configurar según el campo
    switch (fieldName) {
      case 'video':
        resourceType = 'video';
        folder += `/video/${this.playerForm.value.id}`;
        break;
      case 'gallery':
        multiple = true;
        folder += `/gallery/${this.playerForm.value.id}`;
        break;
      case 'portrait':
        folder += '/portrait';
        break;
      case 'foto':
        folder += '/principal';
        break;
    }

    // @ts-ignore
    window.cloudinary.openUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
        sources: ['local', 'url', 'camera'],
        multiple: false,
        cropping: false,
        folder: 'jugadores',  // carpeta opcional
        resourceType: fieldName === 'video' ? 'video' : 'auto',
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
          const fileUrl = result.info.secure_url; // Extract the file URL
          if (fieldName === 'gallery' || fieldName === 'video') {
            // Es un array
            const control = this.playerForm.get(fieldName) as FormArray;
            control.push(new FormControl(fileUrl));
          } else {
            // Es campo individual
            this.playerForm.patchValue({ [fieldName]: fileUrl });
          }
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
  
        this.snackBar.open('¡Jugador creado y archivo subido correctamente!', 'Cerrar', {
          duration: 3000,  // Duración en milisegundos
        });
  
        this.onPlayerAdded();
        this.closeModal();
        this.closeForm();
      } catch (error) {
        console.error('Error al añadir jugador:', error);
      }
    } else {
      console.log('Formulario inválido');
      this.playerForm.markAllAsTouched();  // Marca todos los controles como tocados
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

  removeGalleryImage(index: number): void {
    const galleryArray = this.playerForm.get('gallery') as FormArray;
    if (galleryArray.length > index) {
      galleryArray.removeAt(index);  // Elimina el control en la posición 'index'
    }
  }
  removeVideo(index: number) {
    const videoArray = this.playerForm.get('video') as FormArray;
    videoArray.removeAt(index);
  }

}
