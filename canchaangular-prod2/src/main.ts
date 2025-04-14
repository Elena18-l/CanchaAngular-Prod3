/// <reference types="@angular/localize" />
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { firebaseConfig } from './app/config/firebase-setup';
import { appRoutes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { FormCrudComponent } from './app/form-crud/form-crud.component';
// 🔥 Firebase imports
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideStorage, getStorage } from '@angular/fire/storage';





bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)), // ✅ Solo una inicialización
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    provideStorage(() => getStorage()),
  ],
}).catch((err) => console.error(err));

