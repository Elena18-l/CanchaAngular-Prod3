import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { addDoc, collection, doc, Firestore, FirestoreModule } from '@angular/fire/firestore';  // Firestore
import { getDatabase, ref as dbRef, set } from 'firebase/database';  // Realtime Database
import { Storage, ref, uploadBytesResumable, getDownloadURL, getStorage } from '@angular/fire/storage';  // Storage
import { Observable } from 'rxjs';
import { PlayerService } from '../services/playerService';
import { Player } from '../services/player';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-crud',
  imports: [ReactiveFormsModule, CommonModule, FirestoreModule],
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

  // Subir archivo a Firebase Storage
  onFileSelected(event: Event, fieldName: string) {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files[0]) {
      const file = input.files[0];
      this.uploadFile(file, fieldName);
    }
  }

  private uploadFile(file: File, fieldName: string) {
    const storage = getStorage();  // Asegúrate de que esto es Storage
    const storageRef = ref(storage, `uploads/${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        // Aquí puedes observar el progreso de la carga si lo necesitas
      },
      (error) => {
        console.error('Error al subir archivo a Firebase Storage:', error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('Archivo subido con éxito. URL:', downloadURL);
          this.playerForm.patchValue({ [fieldName]: downloadURL });
        });
      }
    );
  }

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
