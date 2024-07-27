import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, switchMap, tap } from 'rxjs';
import {Scarpa } from '../../models/scarpa.model';
import { StatoScarpeService } from './stato-scarpe.service';
import { scarpaCarrello } from '../../models/scarpa-carrello';


@Injectable({
  providedIn: 'root'
})
export class ScarpeService {


 
  constructor(private http: HttpClient, private statoScarpeService: StatoScarpeService) { }

  private apiUrl = 'http://localhost:3000/prodotti';

  scarpeNelCarrello: scarpaCarrello[] = [];
  selectedSize:string = "";
  private baseUrl = 'api/scarpe'; // Assicurati di utilizzare il percorso corretto per il tuo endpoint API

  getProdotti(): Observable<Scarpa[]> {
 return this.http.get<Scarpa[]>(this.apiUrl).pipe(
  tap(scarpe =>
     this.statoScarpeService.setScarpe(scarpe))
  );
  }

  getProdotto(id: number): Observable<Scarpa | undefined> {
    return this.getProdotti().pipe(
      map(scarpe => scarpe.find(scarpa => scarpa.id === id))
    );
  }

  getNuoviArrivi(): Observable<Scarpa[]> {
    console.log('Chiamata a getNuoviArrivi()'); // Aggiungi un log per verificare quando viene chiamato il metodo
    return this.getProdotti().pipe(
      map(scarpe => scarpe.filter(scarpa => scarpa.nuovo_arrivi == true)),
      tap(scarpe => {
        console.log('Scarpe nuovi arrivi ricevute:', scarpe); // Aggiungi un log per visualizzare le scarpe ricevute
        this.statoScarpeService.setScarpe(scarpe);
      })
    );
  }

  getBestSellers(): Observable<Scarpa[]> {
    return this.getProdotti().pipe(
      map(scarpe => scarpe.filter(scarpa => scarpa.best_seller >= 4)),
      tap(scarpe => {
        console.log('Scarpe best sellers ricevute:', scarpe);
        this.statoScarpeService.setScarpe(scarpe);
      })
    );
  }

getScopriPerSport(): Observable<Scarpa[]> {
  return this.http.get<Scarpa[]>(this.apiUrl);
}

getRunning(): Observable<Scarpa[]> {
  return this.getProdotti().pipe(
    map(scarpe => scarpe.filter(scarpa => scarpa.categoria == 'Running')),
    tap(scarpe => this.statoScarpeService.setScarpe(scarpe))
  );
}

getBasket(): Observable<Scarpa[]> {
  return this.getProdotti().pipe(
    map(scarpe => scarpe.filter(scarpa => scarpa.categoria == 'Basket')),
    tap(scarpe => this.statoScarpeService.setScarpe(scarpe))
  );
}

getSnikers(): Observable<Scarpa[]> {
  return this.getProdotti().pipe(
    map(scarpe => scarpe.filter(scarpa => scarpa.categoria == 'Sneakers')),
    tap(scarpe => this.statoScarpeService.setScarpe(scarpe))
  );
}

setSize(size: string): void {
  this.selectedSize = size;
}

getSize(): string {
  return this.selectedSize;
}

getScarpeByRoute(routeName: string): Observable<Scarpa[]> {
  return this.http.get<Scarpa[]>(`${this.apiUrl}/${routeName}`).pipe(
    catchError(error => {
      console.error('Errore durante il recupero delle scarpe:', error);
      return of([]);
    })
  );
}
}

  





