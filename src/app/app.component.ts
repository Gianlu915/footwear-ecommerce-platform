import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DataSharingService } from './services/datasharing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'your-app-name';
  showHeader: boolean = true;

  constructor(private router: Router, public dataSharing: DataSharingService) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Ottieni la route attuale
        const currentRoute = this.router.url;

        // Controlla se la route attuale è joinus, signin o thankyoupage
        if (currentRoute.includes('/joinus') || currentRoute.includes('signin') || currentRoute.includes('thankyoupage')) {
          // Nascondi l'header
          this.dataSharing.setShowHeader(false);
        } else {
          // Mostra l'header
          this.dataSharing.setShowHeader(true);
        }
      }
    });
  }
}
