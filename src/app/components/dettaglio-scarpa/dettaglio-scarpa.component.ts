import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScarpeService } from '../../services/scarpe.service';
import { Scarpa } from '../../../models/scarpa.model';
import { ActivatedRoute } from '@angular/router';
import { AggiungiService } from '../../services/aggiungi.service';
import { scarpaCarrello } from '../../../models/scarpa-carrello';

@Component({
  selector: 'app-dettaglio-scarpa',
  templateUrl: './dettaglio-scarpa.component.html',
  styleUrl: './dettaglio-scarpa.component.css'
})
export class DettaglioScarpaComponent implements OnInit  {
  
constructor(private activatedRoute: ActivatedRoute, private scarpeService: ScarpeService, private aggiungiService: AggiungiService) { }

  scarpaSelezionata: Scarpa | undefined;
  scarpe: Scarpa[] = [];
  scarpa: Scarpa | undefined;
  selectedSize: string = ''; 
  taglie: string[] = ["8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"];



  ngOnInit(): void {
    
    const scarpaId = +this.activatedRoute.snapshot.params['id'];
    this.scarpeService.getProdotto(scarpaId).subscribe(scarpa => {
      this.scarpa = scarpa;
      this.mainImage = this.scarpa?.immagine ?? '';
    });

    this.aggiungiService.totBag$.subscribe(tot => {
      this.totBag = tot;
    });

  

  }


  
  closeCartclick():void {
    this.showCart = false;
    this.isFading = false;

  }

 

  
  
  showErrorBorder: boolean = false;
  isFading: boolean = false;
  showSelectSize: boolean = false;
  showCart: boolean = false;
  closeCart: boolean = false;
  totBag: number = 0;
  


 

  buttonClick(): void {
    if (!this.selectedSize) {
      this.showErrorBorder = true; // Mostra il bordo rosso intorno alla sezione delle taglie
  // Esci dalla funzione se non è stata selezionata alcuna taglia
    }
    if (this.selectedSize && this.scarpa) {
      const scarpaCarrello: scarpaCarrello = {
        nome: this.scarpa.nome,
        taglia: this.selectedSize,
        prezzo: this.scarpa.prezzo,
        quantita: 1, // Puoi gestire la quantità come desideri
        colore: this.scarpa.colori_disponibili[0], // Puoi gestire il colore come desideri
        immagine: this.scarpa.immagine // Se hai un campo immagine nel modello Scarpa
      };
      this.aggiungiService.aggiungiAllOrdine(scarpaCarrello);
      this.isFading = true;
      this.showCart = true;
      this.showSelectSize = false;


      // Imposta un timeout per nascondere il carrello dopo 5 secondi
   setTimeout(() => {
    this.showCart = false;
    this.isFading = false;
  }, 5000); // 5000 millisecondi = 5 secondi


  
}



  }

  
  



SizeClick(size:string): void {
  const selectedSize = this.scarpeService.getSize();
  console.log('Taglia selezionata:', size);
if(this.selectedSize === size) {
  this.selectedSize = size;
  this.isFading = true;
  
}else{
  this.selectedSize = size;
  this.showErrorBorder = false; 
  this.showSelectSize = false;
  
  this.scarpeService.setSize(size);
}
}

mainImage: string = '';

changeMainImage(imagePath: string): void {
  console.log("Nuovo percorso dell'immagine:", imagePath);
  this.mainImage = imagePath;
}



getSelectedSize(): string {
  return this.scarpeService.getSize();
}


}


