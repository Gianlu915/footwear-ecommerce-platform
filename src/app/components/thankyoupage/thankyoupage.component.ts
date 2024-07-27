import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataSharingService } from '../../services/datasharing.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-thankyoupage',
  templateUrl: './thankyoupage.component.html',
  styleUrl: './thankyoupage.component.css'
})
export class ThankyoupageComponent implements OnInit {

  firstName: string | undefined;
  lastName: string | undefined;
  todayDate: string | undefined;
  formData: any;
  nOrdine: number | undefined;
  

  constructor(private router: Router,  private dataSharing: DataSharingService, private appComponent: AppComponent) {
   
  }
  

  ngOnInit(): void {

    const today = new Date();
    this.todayDate = today.toDateString();

    this.formData = this.dataSharing.getFormData();
     
      if(this.formData){
        if(this.formData)
        this.firstName = this.formData.name;
        this.lastName = this.formData.surname;
        console.log('name e surname recuperati');
        console.log('firstName:', this.firstName); // Verifica l'assegnazione di firstName
        console.log('lastName:', this.lastName); // Verifica l'assegnazione di lastName
      }else{
        console.log('form data is undefined');
      }
   

    this.nOrdine = Math.floor(10000000 + Math.random() * 90000000);

  
  
  }


  

 
}
