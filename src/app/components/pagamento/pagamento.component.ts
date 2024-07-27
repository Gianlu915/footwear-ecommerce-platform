import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AggiungiService } from '../../services/aggiungi.service';
import { Scarpa } from '../../../models/scarpa.model';
import { scarpaCarrello } from '../../../models/scarpa-carrello';
import { Router } from '@angular/router';
import { DataSharingService } from '../../services/datasharing.service';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrl: './pagamento.component.css'
})
export class PagamentoComponent implements OnInit {

  myForm!: FormGroup;
  scarpeNelCarrello: scarpaCarrello[] = [];
  subtotal: number = 0;
  totale: number = 0;
  deliveryCost: number = 0
  deliveryLabel: string | undefined;
  formData: any;
  firstName: string | undefined;
  lastName: string | undefined;
  dataSharingService: any;
  totBag: number = 0;
  totalProducts: number = 0;

  constructor(private fb: FormBuilder, private aggiungiService: AggiungiService, private dataSharing: DataSharingService, private router:Router){}
  
 

  ngOnInit(): void {
    this.myForm = this.fb.group({
      nameCard: ['', [Validators.required, Validators.maxLength(20)]],
      cardNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{16}$/)]],
      mmYY: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/(2[4-9]|[3-9]\d)$/)]],
      cvv: ['', [Validators.required,  Validators.pattern(/^\d{3,4}$/)]],
    });

    this.scarpeNelCarrello = this.aggiungiService.getScarpeNelCarrello();
    this.subtotal = this.aggiungiService.calcolaTotalePrezzo();
    this.changeSubTotal();
  this.changeTotal();
  this.aggiungiService.getTotalProducts().subscribe(total => {
    this.totalProducts = total;
  });
    

  
  }


  onSubmit() {
    if (this.myForm.valid) {
      const formData = this.myForm.value;
      this.dataSharing.setFormData(formData);
      this.router.navigate(['/thankyoupage']);
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
  
estimatedDeliveryLabel(): string {
  if (this.subtotal >= 1 && this.subtotal <= 250) {
    return "$9.95";
  } else {
    return "Free";
  }
}
  
  
}
