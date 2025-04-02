import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { addDoc, collection, doc, Firestore } from 'firebase/firestore';
import { PlayerService } from '../services/playerService';
import { Player } from '../services/player';

@Component({
  selector: 'app-form-crud',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-crud.component.html',
  styleUrl: './form-crud.component.css'
})

export class FormCrudComponent {
  @Output() close = new EventEmitter<void>();
  @Output() playerAdded = new EventEmitter<Player>(); // Emitir el jugador añadido

  playerForm = new FormGroup({
    id: new FormControl(''), //valor inicial vacío poma.
    name: new FormControl('', Validators.required),
    position: new FormControl('', Validators.required),
    shirtNumber: new FormControl(null, Validators.required),
    age: new FormControl(null, Validators.required),
    stature: new FormControl(null, Validators.required),
    average: new FormControl(null, Validators.required),
    bio: new FormControl('', Validators.required),
    team: new FormControl('', Validators.required),
    portrait: new FormControl(''),
    foto: new FormControl(''),
    video: new FormArray([]), // Array dinámico de videos
    gallery: new FormArray([]), // Array dinámico de imágenes en la galería
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
   
    const playersRef = collection(this.firestore, 'players');
    const tempDocRef = doc(playersRef); // Genera un ID sin crear documento
    console.log('ID generado:', tempDocRef.id);
    this.playerForm.patchValue({ id: tempDocRef.id });
  }



  async addPlayer() {
    if (this.playerForm.valid) {
      try {
        const playersRef = collection(this.firestore, 'players');
        const docRef = await addDoc(playersRef, this.playerForm.value);
        console.log('Jugador añadido con éxito, ID:', docRef.id);
        
        // Opcional: actualizar el documento para incluir su propio ID
        await addDoc(playersRef, { ...this.playerForm.value, id: docRef.id });

        this.closeModal();
      } catch (error) {
        console.error('Error al añadir jugador:', error);
      }
    } else {
      console.log('Formulario inválido');
      this.playerForm.markAllAsTouched();
    }
  }

  onSubmit() {
    console.log('Formulario enviado:', this.playerForm.value);
  
    if (this.playerForm.invalid) {
      console.log('Formulario inválido');
      this.playerForm.markAllAsTouched();
      return;
    }
  
    const playerData = { ...this.playerForm.value, id: this.playerForm.value.id || '' } as unknown as Player;
    this.playerService.addPlayer(playerData).subscribe({
      next: () => {
        console.log('Jugador añadido con éxito');
        this.closeModal();
      },
      error: (err) => console.error('Error al añadir jugador:', err),
    });
  }

  closeModal() {
    this.close.emit();
  }
}