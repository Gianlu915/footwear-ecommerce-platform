import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Scarpa } from '../../../models/scarpa.model';
import { StatoScarpeService } from '../../services/stato-scarpe.service';
import { ScarpeService } from '../../services/scarpe.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  scarpe: Scarpa[] = [];
  routeName: string = '';
  selezioni: { [key: string]: boolean } = {}; // Dichiarazione della proprietà 'selezioni'
  sidebaritems: any[] = []; // Dichiarazione della proprietà 'sidebaritems'

  constructor(
    private route: ActivatedRoute,
    private statoScarpeService: StatoScarpeService,
    private scarpeService: ScarpeService
  ) {}

  ngOnInit(): void {
    this.sidebaritems = [
      {
        nome: 'Gender',
        option: ['Men', 'Women', 'Unisex'],
        showOption: false
      },
      {
        nome: 'Categories',
        option: ['Sneakers', 'Basketball', 'Running', 'Training'],
        showOption: false
      },
      {
        nome: 'Shop By Price',
        option: ['Under 100$', '$100 - $150', '$150 - $200'],
        showOption: false
      },
      {
        nome: 'Colour',
        option: ['Purple', 'Black', 'Red', 'Orange', 'Brown', 'Blu', 'Pink', 'Green', 'Yellow', 'Gray', 'Multicolor'],
        showOption: false
      },
      {
        nome: 'Sports',
        option: ['Football', 'Tennis', 'Martial arts', 'Golf'],
        showOption: false
      },
      {
        nome: 'Brand',
        option: ['Jordan', 'Nike By You', 'NikeLab'],
        showOption: false
      }
    ];

    this.route.url.subscribe(urlSegment => {
      if (urlSegment.length > 0) {
        this.routeName = urlSegment[0].path;
        this.loadScarpeByRoute(); // Carica le scarpe della route corrente
      }
    });

    this.statoScarpeService.scarpe$.subscribe(scarpe => {
      this.scarpe = scarpe;
    });
  }

  toggleSelection(option: string): void {
    this.selezioni[option] = !this.selezioni[option];
    console.log('Opzione selezionata:', option);
    this.loadScarpeByRoute(); // Ricarica e filtra le scarpe della route corrente
  }

  loadScarpeByRoute(): void {
    this.scarpeService.getProdotti().subscribe(scarpe => {
      let scarpeFiltrate = scarpe;

      
      if (this.selezioni['Running']) {
        scarpeFiltrate = scarpeFiltrate.filter(scarpa => scarpa.categoria === 'Running');
      } else if (this.selezioni['Sneakers']) {
        scarpeFiltrate = scarpeFiltrate.filter(scarpa => scarpa.categoria === 'Sneakers');
      } else if (this.selezioni['Basket']) {
        scarpeFiltrate = scarpeFiltrate.filter(scarpa => scarpa.categoria === 'Basket');
      }
   
      

      // Applica il filtro per prezzo se le opzioni sono selezionate
     
      if (this.selezioni['$100 - $150']) {
        scarpeFiltrate = scarpeFiltrate.filter(scarpa => scarpa.prezzo >= 100 && scarpa.prezzo < 150);
      } else if (this.selezioni['$150 - $200']) {
        scarpeFiltrate = scarpeFiltrate.filter(scarpa => scarpa.prezzo >= 150 && scarpa.prezzo < 200);
      }else if (this.selezioni['Under 100$']){
        scarpeFiltrate = scarpeFiltrate.filter(scarpa => scarpa.prezzo < 100);
      }

      console.log('Scarpe filtrate:', scarpeFiltrate); // Verifica le scarpe filtrate

      this.statoScarpeService.setScarpe(scarpeFiltrate);
    });
  }

  toggleOptions(item: any): void {
    item.showOption = !item.showOption;
  }
}
