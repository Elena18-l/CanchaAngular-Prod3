import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { addDoc, collection, doc, Firestore, FirestoreModule } from '@angular/fire/firestore';
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';  // Importación de Storage
import { Observable } from 'rxjs';
import { PlayerService } from '../services/playerService';
import { Player } from '../services/player';
import { CommonModule } from '@angular/common';
import { provideStorage, getStorage, StorageModule } from '@angular/fire/storage';

@Component({
  selector: 'app-form-crud',
  imports: [ReactiveFormsModule, CommonModule,FirestoreModule,],
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
    portrait: new FormControl(''),
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

  constructor(private firestore: Firestore, private playerService: PlayerService, private storage: Storage) {}

  openForm() {
    const playersRef = collection(this.firestore, 'players');
    const tempDocRef = doc(playersRef); 
    this.playerForm.patchValue({ id: tempDocRef.id });
  }

  // Manejar la selección de archivos
  onFileSelected(event: Event, fieldName: string) {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files[0]) {
      const file = input.files[0];
      this.uploadFile(file, fieldName);
    }
  }

  // Subir el archivo a Firebase Storage y obtener la URL
  private uploadFile(file: File, fieldName: string) {
    const fileRef = ref(this.storage, `players/${file.name}`);
    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {},
      (error) => {
        console.error('Error al subir archivo', error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        this.playerForm.patchValue({ [fieldName]: downloadURL }); // Almacenar URL en el formulario
      }
    );
  }

  // Agregar jugador a Firestore
  async addPlayer() {
    if (this.playerForm.valid) {
      try {
        const playersRef = collection(this.firestore, 'players');
        const docRef = await addDoc(playersRef, this.playerForm.value);
        console.log('Jugador añadido con éxito, ID:', docRef.id);

        // Emitir el evento playerAdded para notificar el éxito
        this.onPlayerAdded(); // Llamar al método onPlayerAdded

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
    // Recargar la lista de jugadores filtrados
    this.filteredPlayersList$ = this.playerService.getFilteredPlayers(this.selectedFilters);
  }
  closeModal() {
    this.close.emit();
  }

  closeForm() {
    this.playerForm.reset();
  }
}
