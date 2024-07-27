import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarrelloComponent } from '../carrello/carrello.component';
import { scarpaCarrello } from '../../../models/scarpa-carrello';
import { ScarpeService } from '../../services/scarpe.service';
import { AggiungiService } from '../../services/aggiungi.service';
import { Route, Router } from '@angular/router';
import { DataSharingService } from '../../services/datasharing.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit  {

  myForm!: FormGroup;
  states: string[] = ['Alabama','Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
  subtotal: number = 0;
  totale: number = 0;
  scarpeNelCarrello: scarpaCarrello[] = [];
  selectedShoe: scarpaCarrello | null = null;
  totBag: number = 0;
  totalProducts: number = 0;


  constructor(private fb: FormBuilder, private aggiungiService: AggiungiService, private router: Router, private dataSharing: DataSharingService){}





  ngOnInit(): void {
  
    this.myForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(15)]],
      surname: ['', [Validators.required]],
      address: ['', [Validators.required]],
      postalCode: ['', [Validators.required,  Validators.pattern('^\\d{4}$')]],
      stateTerritory: ['', Validators.required],
      locality: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required,Validators.pattern(/^\+?[0-9\s-()]*$/) ]],
      myCheckbox: [false, Validators.requiredTrue],
    });

    this.scarpeNelCarrello = this.aggiungiService.getScarpeNelCarrello();
    this.subtotal = this.aggiungiService.calcolaTotalePrezzo();
    this.changeSubTotal();
  this.changeTotal();
  this.aggiungiService.getTotalProducts().subscribe(total => {
    this.totalProducts = total;
  });
   
  }

  estimatedDeliveryLabel(): string {
    if (this.subtotal >= 1 && this.subtotal <= 250) {
      return "$9.95";
    } else {
      return "Free";
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

  

  onSubmit() {
    if (this.myForm.valid) {
      this.dataSharing.setFormData(this.myForm.value);
      console.log('Form data submitted:', this.myForm.value);
      this.router.navigate(['/pagamento']);
    } else {
      console.error('Form is invalid');
    }
    }



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

  

  

