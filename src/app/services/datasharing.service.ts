import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  showHeader: boolean = true;
  formData:any;
  firstName: string | undefined;
  lastName: string | undefined;

  constructor() { }

  setFormData(formData: any) {
    this.formData = formData;
    console.log('Dati salvati nel servizio:', this.formData);
  }

  getFormData() {
    console.log('Dati recuperati dal servizio:', this.formData);
    return this.formData;
    
  }

  // Metodo corretto per impostare lo stato della visualizzazione dell'header
  setShowHeader(value: boolean) {
    this.showHeader = value;
  }

  // Metodo per ottenere lo stato della visualizzazione dell'header
  getShowHeader() {
    return this.showHeader;
  }

  
}