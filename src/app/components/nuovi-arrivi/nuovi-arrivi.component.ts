import { Component, OnInit } from '@angular/core';
import { ScarpeService } from '../../services/scarpe.service';
import { Scarpa } from '../../../models/scarpa.model';
import { ActivatedRoute, Router } from '@angular/router';
import { StatoScarpeService } from '../../services/stato-scarpe.service';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-nuovi-arrivi',
  templateUrl: './nuovi-arrivi.component.html',
  styleUrls: ['./nuovi-arrivi.component.css']
})
export class NuoviArriviComponent implements OnInit {

  scarpe: Scarpa[] = [];
  numeroScarpe: number = 0;
  termineRicerca: string = '';
  tutteLeScarpe: Scarpa[] = [];
  selectedSport: string = '';
  filteredScarpe: Scarpa[] = [];

  constructor(
    private router: Router,
    private scarpeService: ScarpeService,
    private route: ActivatedRoute,
    private statoScarpeService: StatoScarpeService
  ) { 
  } 

  selezionaScarpa(scarpaId: number): void {
    this.router.navigate(['/', scarpaId]);
  }

  ngOnInit(): void {
    this.route.url.subscribe(urlSegment => {
      const currentRoute = urlSegment[0].path;

      let scarpeObservable;
      if (currentRoute === 'New-arrivals') {
        scarpeObservable = this.scarpeService.getNuoviArrivi().pipe(
          tap(scarpe => {
            this.statoScarpeService.setScarpe(scarpe);  // Aggiorna il servizio con tutte le scarpe caricate
          }),
          map(scarpe => scarpe.filter(scarpa => scarpa.nuovo_arrivi))
        );
      } else if (currentRoute === 'Best-sellers') {
        scarpeObservable = this.scarpeService.getBestSellers();
      } else if (currentRoute === 'All shoes') {
        scarpeObservable = this.scarpeService.getProdotti();
      } else if (currentRoute === 'Discover sport') {
        scarpeObservable = this.scarpeService.getProdotti();
      } else if (currentRoute === 'Running') {
        scarpeObservable = this.scarpeService.getRunning();
      } else if (currentRoute === 'Sneakers') {
        scarpeObservable = this.scarpeService.getSnikers();
      } else if (currentRoute === 'Basketball') {
        scarpeObservable = this.scarpeService.getBasket();
      } else {
        scarpeObservable = this.scarpeService.getProdotti();
      }

      scarpeObservable.subscribe(scarpe => {
        this.scarpe = scarpe;
        this.statoScarpeService.setScarpe(scarpe);  // Aggiorna il servizio con tutte le scarpe caricate
  
        // Assegna i dati delle scarpe filtrate alla variabile filteredScarpe
        this.filteredScarpe = scarpe;
        console.log('Filtered Scarpe:', this.filteredScarpe);
      });
  
      // Sottoscrivi alle scarpe filtrate dal servizio
      this.statoScarpeService.scarpe$.subscribe(scarpe => {
        this.filteredScarpe = scarpe;
      });
    });
  }}