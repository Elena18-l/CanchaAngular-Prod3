/// <reference types="@angular/localize" />
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { firebaseConfig } from './app/config/firebase-setup';
import { appRoutes } from './app/app.routes';
import { provideRouter } from '@angular/router';

// 🔥 Firebase imports
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { importProvidersFrom } from '@angular/core';


bootstrapApplication(AppComponent, {
 
  providers: [
    provideRouter(appRoutes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)), // ✅ Inicializar Firebase
    provideAuth(() => getAuth()),  // ✅ Proveer autenticación
    provideFirestore(() => getFirestore()), // ✅ Proveer Firestore
    provideDatabase(() => getDatabase()), provideFirebaseApp(() => initializeApp({ projectId: "cancha-angular", appId: "1:731488175013:web:0c62e9f77407a855119e4c", databaseURL: "https://cancha-angular-default-rtdb.europe-west1.firebasedatabase.app", storageBucket: "cancha-angular.firebasestorage.app", apiKey: "AIzaSyBbK1Us_lbJytCFTrLzFjy2CN1gYA3sla0", authDomain: "cancha-angular.firebaseapp.com", messagingSenderId: "731488175013", measurementId: "G-2SC9QSB2WG" })), provideAuth(() => getAuth())  // ✅ Proveer Realtime Database
  ],
  
}).catch((err) => console.error(err));
const app = initializeApp(firebaseConfig);
console.log("✅ Firebase Inicializado:", app);
