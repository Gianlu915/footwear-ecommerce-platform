import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Scarpa } from '../../models/scarpa.model';

@Injectable({
  providedIn: 'root'
})
export class StatoScarpeService {
  private scarpeSubject = new BehaviorSubject<Scarpa[]>([]);
  scarpe$ = this.scarpeSubject.asObservable();

  constructor() { }

  setScarpe(scarpe: Scarpa[]): void {
    this.scarpeSubject.next(scarpe);
  }

  filtraScarpePerPrezzo(minPrezzo: number, maxPrezzo: number, scarpe: Scarpa[]): void {
    const scarpeFiltrate = scarpe.filter(scarpa => {
      return scarpa.prezzo >= minPrezzo && scarpa.prezzo <= maxPrezzo;
    });
    this.setScarpe(scarpeFiltrate);
  }
}
