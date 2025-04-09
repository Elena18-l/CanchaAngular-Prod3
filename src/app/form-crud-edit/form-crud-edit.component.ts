import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { doc, collection, getDoc, updateDoc } from '@angular/fire/firestore';
import { Player } from '../services/player';
import { Observable } from 'rxjs';
import { Firestore, FirestoreModule } from '@angular/fire/firestore';
import { OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { PlayerService } from '../services/playerService';
import { SafeUrlPipe } from '../player-media/safe-url.pipe';
@Component({
  selector: 'app-form-crud-edit',
  imports: [CommonModule, ReactiveFormsModule, FirestoreModule, SafeUrlPipe],
  templateUrl: './form-crud-edit.component.html',
  styleUrl: './form-crud-edit.component.css',
  standalone: true
  
})
export class FormCrudEditComponent implements OnInit, OnChanges {
  @Input() playerId: string = ''; // ID del jugador a editar
  @Output() close = new EventEmitter<void>();
  @Output() playerUpdated = new EventEmitter<Player>();
  currentPlayerId: string = '';

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
  editPlayer(id: string) {
    this.playerId = id;
    this.loadPlayer(id);
    this.openForm();
  }
  
  ngOnInit() {
    if (this.playerId) {
      this.loadPlayer(this.playerId);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['playerId'] && changes['playerId'].currentValue) {
      this.loadPlayer(changes['playerId'].currentValue);
    }
  }

  isFormOpen = false;

  constructor(private firestore: Firestore, private playerService: PlayerService) {}



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


      const videoArray = new FormArray(
        (playerData.video || []).map(url => new FormControl(url))
      );
      this.playerForm.setControl('video', videoArray);
    
      const galleryArray = new FormArray(
        (playerData.gallery || []).map(url => new FormControl(url))
      );
      this.playerForm.setControl('gallery', galleryArray);



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
        // video: playerData.video || [''], por alguna razón estos dos se tienen qeu cargar antes del patchvalue
        // gallery: playerData.gallery || [''], por alguna razón estos dos se tienen qeu cargar antes del patchvalue
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
onPlayerUpdated(player: any) {

  this.playerUpdated.emit(player);
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

get videoArray() {
  return this.playerForm.get('video') as FormArray;
}

  



}
