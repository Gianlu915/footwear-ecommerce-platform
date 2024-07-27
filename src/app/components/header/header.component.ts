import { Component, OnInit } from '@angular/core';
import { Scarpa } from '../../../models/scarpa.model';
import { ScarpeService } from '../../services/scarpe.service';
import { AggiungiService } from '../../services/aggiungi.service';
import { DataSharingService } from '../../services/datasharing.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  mostraMenuSecondoLivello: boolean = false;
  ricercaScarpa: string = '';
  scarpe: Scarpa[] = [];
  totBag: number = 0;
  showHeader: boolean = true;

  constructor(private scarpeService: ScarpeService, private aggiungiService: AggiungiService, private dataSharing: DataSharingService) {}

  ngOnInit(): void {
    this.aggiungiService.totBag$.subscribe(totBag => {
      this.totBag = totBag;
    });

}

  toggleMenuSecondoLivello() {
    this.mostraMenuSecondoLivello = true;
  }

  nascondiMenuSecondoLivello() {
    this.mostraMenuSecondoLivello = false;
  }

}
