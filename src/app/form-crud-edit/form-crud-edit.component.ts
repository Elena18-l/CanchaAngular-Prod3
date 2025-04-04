import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { doc, collection, getDoc, updateDoc } from '@angular/fire/firestore';
import { Player } from '../services/player';
import { Observable } from 'rxjs';
import { Firestore, FirestoreModule } from '@angular/fire/firestore';

@Component({
  selector: 'app-form-crud-edit',
  imports: [CommonModule, ReactiveFormsModule, FirestoreModule],
  templateUrl: './form-crud-edit.component.html',
  styleUrl: './form-crud-edit.component.css'
})
export class FormCrudEditComponent {
  @Input() playerId: string = ''; // ID del jugador a editar
  @Output() close = new EventEmitter<void>();
  @Output() playerUpdated = new EventEmitter<Player>();

  playerForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    position: new FormControl('', Validators.required),
    shirtNumber: new FormControl(0, Validators.required),
    age: new FormControl(0, Validators.required),
    stature: new FormControl(0, Validators.required),
    average: new FormControl(0, Validators.required),
    bio: new FormControl('', Validators.required),
    portrait: new FormControl(''),
    foto: new FormControl(''),
    video: new FormArray([
      new FormControl(''),
      new FormControl(''),
      new FormControl(''),
    ]),
    gallery: new FormArray([
      new FormControl(''),
      new FormControl(''),
      new FormControl(''),
    ]),
    skills: new FormGroup({
      fisico: new FormControl(0, Validators.required),
      fuerzaMental: new FormControl(0, Validators.required),
      habilidadEspecial: new FormControl(0, Validators.required),
      resistencia: new FormControl(0, Validators.required),
      tecnica: new FormControl(0, Validators.required),
    }),
  });

  isFormOpen = false;

  constructor(private firestore: Firestore) {}

  ngOnInit() {
    if (this.playerId) {
      this.loadPlayer(this.playerId);
    }
  }

  async loadPlayer(playerId: string) {
    if (!playerId) {
      console.error('❌ No se proporcionó un ID de jugador.');
      return;
    }

    const playerDocRef = doc(this.firestore, 'players', playerId);
    const docSnap = await getDoc(playerDocRef);

    if (docSnap.exists()) {
      const playerData = docSnap.data() as Player;
      console.log('✅ Jugador encontrado:', playerData);

      this.playerForm.patchValue({
        id: playerId,
        name: playerData.name || '',
        position: playerData.position || '',
        shirtNumber: playerData.shirtNumber || null, 
        age: playerData.age || null,
        stature: playerData.stature || null,
        average: playerData.average || null,
        bio: playerData.bio || '',
        portrait: playerData.portrait || '',
        foto: playerData.foto || '',
        video: playerData.video || [''],
        gallery: playerData.gallery || [''],
        skills: {
          fisico: playerData.skills?.fisico || null,
          fuerzaMental: playerData.skills?.fuerzaMental || null,
          habilidadEspecial: playerData.skills?.habilidadEspecial || null,
          resistencia: playerData.skills?.resistencia || null,
          tecnica: playerData.skills?.tecnica || null,
        }
      });
    } else {
      console.warn('⚠️ No se encontró el jugador con ID:', playerId);
    }
  }

  async updatePlayer() {
    if (this.playerForm.valid) {
      try {
        const playerId = this.playerForm.get('id')?.value;
        if (!playerId) {
          throw new Error('ID de jugador inválido');
        }
        const playerDocRef = doc(this.firestore, `players/${playerId}`);        
        const updateData = {
          name: this.playerForm.get('name')?.value,
          position: this.playerForm.get('position')?.value,
          shirtNumber: this.playerForm.get('shirtNumber')?.value,
          age: this.playerForm.get('age')?.value,
          stature: this.playerForm.get('stature')?.value,
          average: this.playerForm.get('average')?.value,
          bio: this.playerForm.get('bio')?.value,
          portrait: this.playerForm.get('portrait')?.value,
          foto: this.playerForm.get('foto')?.value,
          video: this.playerForm.get('video')?.value,
          gallery: this.playerForm.get('gallery')?.value,
          skills: this.playerForm.get('skills')?.value,
        };
        await updateDoc(playerDocRef, updateData);
        console.log('✅ Jugador actualizado con éxito:', playerId);
  
        this.playerUpdated.emit(this.playerForm.getRawValue() as Player);
        this.closeForm();
      } catch (error) {
        console.error('❌ Error al actualizar jugador:', error);
      }
    } else {
      console.log('Formulario inválido');
      this.playerForm.markAllAsTouched();
    }
  }

  closeForm() {
    this.isFormOpen = false;
    this.close.emit();
  }
}
