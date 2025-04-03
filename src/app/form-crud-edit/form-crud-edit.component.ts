import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { getDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { Player } from '../services/player';
import { Observable } from 'rxjs';
import { Firestore, FirestoreModule } from '@angular/fire/firestore';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { importProvidersFrom } from '@angular/core'
import { constructor } from 'jasmine';
import { update } from 'firebase/database';


@Component({
  selector: 'app-form-crud-edit',
  imports: [CommonModule, ReactiveFormsModule, FirestoreModule],
  templateUrl: './form-crud-edit.component.html',
  styleUrl: './form-crud-edit.component.css'
})

export class FormCrudEditComponent {
  @Input() playerId: string = ''; // Recibe el ID del jugador a editar
  @Output() close = new EventEmitter<void>();
  @Output() playerUpdated = new EventEmitter<Player>();
}


function loadPlayer(this: any, playerId: string) {
  if (!playerId) {
    console.error('❌ No se proporcionó un ID de jugador.');
    return;
  };
  const playerDocRef = doc(this.firestore, 'players', playerId);
  get(playerDocRef).then((docSnap: { exists: () => any; data: () => Player; }) => {
    if (docSnap.exists()) {
      const playerData = docSnap.data() as Player;
      console.log('✅ Jugador encontrado:', playerData);

      // 🔥 Rellenar el formulario con los datos del jugador
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
        video: playerData.video || [],
        gallery: playerData.gallery || [],
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
  }).catch((error: any) => {
    console.error('🔥 Error al obtener jugador:', error);
  });

  isFormOpen = false;
  selectedFilters: any = {
    shirtumber: playerDocRef.shirtNumber || null,
    position: playerDocRef.position || null, 
    average: playerDocRef.average || null,
    age: playerDocRef.age || null,
    stature: playerDocRef.stature || null      
  };
 constructor(private firestore: Firestore, private playerService: PlayerService) {}
 
 openForm() {
   
  const playersRef = collection(this.firestore, 'players');
  this.isFormOpen = true; 
}

async updatePlayer() {
  if (this.playerForm.valid) {
    try {
      const playerId = this.playerForm.value.id;
      const playerDocRef = doc(this.firestore, 'players', playerId);
      await update(playerDocRef, { ...this.playerForm.value });
      console.log('✅ Jugador actualizado con éxito:', playerId);

      // Emitir el evento de actualización del jugador
      this.playerUpdated.emit(this.playerForm.value);
      this.closeModal();
      this.closeForm(); // Cierra el modal después de guardar
    } catch (error) {
      console.error('❌ Error al actualizar jugador:', error);
    }
  }

}
console.log('Formulario enviado:', this.playerForm.value);
  
if (this.playerForm.invalid) {
  console.log('Formulario inválido');
  this.playerForm.markAllAsTouched();
  return;
}

const playerData = { ...this.playerForm.value, id: this.playerForm.value.id || '' } as unknown as Player;
this.playerService.updatePlayer(playerData).subscribe({
  next: () => {
    console.log('Jugador añadido con éxito');
    this.closeModal();
  },
  error: (err) => console.error('Error al añadir jugador:', err),
});


closeModal() {
  this.close.emit();
}
closeForm() {
  this.isFormOpen = false;
  document.body.classList.remove('modal-open');
  this.playerForm.reset();
}

onPlayerUpdated() {
  console.log('Jugador añadido. Recargando lista...');
  this.filteredPlayersList$ = this.playerService.getFilteredPlayers(this.selectedFilters); // 🔹 Recargar lista de jugadores
  this.closeForm();
}
}