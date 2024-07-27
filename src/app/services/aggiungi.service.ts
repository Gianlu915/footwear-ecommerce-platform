import { Injectable } from '@angular/core';
import { scarpaCarrello } from '../../models/scarpa-carrello';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AggiungiService {

  private totBag: number = 0;
  scarpeNelCarrello: scarpaCarrello[] = [];
  selectedSize:string = "";
  subtotal:number = 0;
  totale:number = 0;


  constructor() { }

 
  totBagSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private totalProductsSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  

  aggiungiAllOrdine(scarpa: scarpaCarrello): void {
    this.scarpeNelCarrello.push(scarpa);
    this.updateTotBag();
  }


  updateTotBag(): void {
    const totBag = this.scarpeNelCarrello.reduce((acc, scarpa) => acc + scarpa.quantita, 0);
    this.totBagSubject.next(totBag);
  }
 
  

  

  getScarpeNelCarrello(): scarpaCarrello[] {
    return this.scarpeNelCarrello;
  }

 
  
  rimuoviDalCarrello(index: number): void {
    if (index > -1 && index < this.scarpeNelCarrello.length) {
      this.scarpeNelCarrello.splice(index, 1);
      this.updateTotBag();
    }
  }

  

  // Funzione per emettere il numero totale di elementi nel carrello
  emitTotBag(): void {
    this.totBagSubject.next(this.scarpeNelCarrello.reduce((acc, scarpa) => acc + scarpa.quantita, 0));
  }

  // Observable per ascoltare il numero totale di elementi nel carrello
  get totBag$(): Observable<number> {
    return this.totBagSubject.asObservable();
  }
  
  //funzione per ottenere il subtotale

  calcolaTotalePrezzo(): number {
    return this.scarpeNelCarrello.reduce((acc, scarpa) => acc + scarpa.prezzo * scarpa.quantita, 0);
  }

  //funzione per ottenere il totale del prezzo
  calcolaTotaleComplessivo(): number {
    return this.scarpeNelCarrello.reduce((acc, scarpa) => acc + scarpa.prezzo * scarpa.quantita, 0) + this.estimatedDeliveryCost();
  }

  estimatedDeliveryCost(): number {
    if (this.subtotal > 1 && this.subtotal <250) {
      return 9.95;
    } else {
      return 0;
    }
  }

  estimatedDeliveryLabel(): string {
    if (this.subtotal >= 1 && this.subtotal <= 250) {
      return "9.95";
    } else {
      return "Free";
    }
  }

  

  


  aggiornaQuantita(index: number, quantita: number): void {
  if (index >= 0 && index < this.scarpeNelCarrello.length) {
    this.scarpeNelCarrello[index].quantita = quantita;
  }

  
  

  

}

private emitTotalProducts(): void {
  const totalProducts = this.scarpeNelCarrello.reduce((acc, scarpa) => acc + scarpa.quantita, 0);
  this.totalProductsSubject.next(totalProducts);
}

getTotalProducts(): Observable<number> {
  return this.totalProductsSubject.asObservable();
}







}



  



