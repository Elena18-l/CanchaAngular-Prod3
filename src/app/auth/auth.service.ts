import { Injectable } from '@angular/core';
import { Auth, signInAnonymously, onAuthStateChanged, User } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private auth: Auth) {
    this.initAuthStateListener();
    this.loginAnonymously();
  }

  private async loginAnonymously(): Promise<void> {
    try {
      await signInAnonymously(this.auth);
      console.log('✅ Usuario anónimo autenticado');
    } catch (error) {
      console.error('❌ Error al iniciar sesión anónimamente:', error);
    }
  }

  private initAuthStateListener(): void {
    onAuthStateChanged(this.auth, (user) => {
      this.userSubject.next(user);
    });
  }
}
