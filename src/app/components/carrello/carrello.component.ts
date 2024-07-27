import { Component, OnInit } from '@angular/core';
import { ScarpeService } from '../../services/scarpe.service';
import { AggiungiService } from '../../services/aggiungi.service';
import { scarpaCarrello } from '../../../models/scarpa-carrello';

@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.component.html',
  styleUrl: './carrello.component.css'
})
export class CarrelloComponent implements OnInit {


  
  

  constructor(private aggiungiService: AggiungiService, private scarpaService: ScarpeService) { }

  scarpeNelCarrello: scarpaCarrello[] = [];
  totale: number = 0;
  subtotal: number = 0;
  scarpa: scarpaCarrello[] = [];
  taglie: string[] = ["8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"];
  quantity: number[] = [1,2,3,4,5,6,7,8,9,10];
  totBag: number = 0;
  totalProducts: number = 0;


  ngOnInit(): void {  
    this.scarpeNelCarrello = this.aggiungiService.getScarpeNelCarrello();
    const selectedSize = this.aggiungiService.selectedSize;
    this.subtotal = this.aggiungiService.calcolaTotalePrezzo();
    this.changeSubTotal();
  this.changeTotal();
  this.aggiungiService.getTotalProducts().subscribe(total => {
    this.totalProducts = total;
  });
}

aggiungiAlCarrello(scarpa: scarpaCarrello): void {
  // Cerca se esiste già una scarpa con lo stesso nome e taglia
  const existingItemIndex = this.scarpeNelCarrello.findIndex(item => item.nome === scarpa.nome && item.taglia === scarpa.taglia);
  
  if (existingItemIndex !== -1) {
    // Se esiste, incrementa solo la quantità
    this.scarpeNelCarrello[existingItemIndex].quantita += scarpa.quantita;
  } else {
    // Altrimenti, aggiungi la nuova scarpa alla lista
    this.scarpeNelCarrello.push(scarpa);
  }
}

aggiornaQuantita(index: number, event: Event): void {
  const inputElement = event.target as HTMLInputElement;
  const nuovaQuantita = parseInt(inputElement.value, 10);
  if (nuovaQuantita > 0) {
    this.aggiungiService.aggiornaQuantita(index, nuovaQuantita);
   this.changeSubTotal();
    this.changeTotal();
    this.updateTotBag();
  }
}

 

  rimuoviDalCarrello(index: number): void {
    this.aggiungiService.rimuoviDalCarrello(index); // Rimuovi dall'array nel servizio
    this.scarpeNelCarrello = this.aggiungiService.getScarpeNelCarrello(); // Aggiorna la lista locale
    this.changeSubTotal(); // Aggiorna il subtotale
    this.changeTotal(); // Aggiorna il totale
    this.updateTotBag(); // Aggiorna il numero totale di elementi nel carrello
  }

  
  estimatedDeliveryLabel(): string {
    if (this.subtotal >= 1 && this.subtotal <= 250) {
      return "$9.95";
    } else {
      return "Free";
    }
  }

 

 
 //change subtotal amount

 changeSubTotal(): void {
 
  this.subtotal = this.scarpeNelCarrello.reduce((acc, scarpa) => acc + (scarpa.prezzo * scarpa.quantita), 0);

}

 //change tal amount
changeTotal(): void {
  this.totale = this.subtotal + (this.subtotal >= 1 && this.subtotal <= 250 ? 9.95 : 0);
}


updateTotBag(): void {
  this.totBag = this.scarpeNelCarrello.reduce((acc, scarpa) => acc + scarpa.quantita, 0);
}

calcolaTotaleProdotti(): void {
  this.totalProducts = this.scarpeNelCarrello.reduce((acc, scarpa) => acc + scarpa.quantita, 0);
}

}
