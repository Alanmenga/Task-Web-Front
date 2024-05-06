import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private tieneSesionSubject: BehaviorSubject<boolean>;
  public tieneSesion: Observable<boolean>;

  constructor() {
    this.tieneSesionSubject = new BehaviorSubject<boolean>(false);
    this.tieneSesion = this.tieneSesionSubject.asObservable();
  }

  iniciarSesion() {
    this.tieneSesionSubject.next(true);
  }

  cerrarSesion() {
    this.tieneSesionSubject.next(false);
  }
}