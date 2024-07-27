import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'
import { HeaderComponent } from './components/header/header.component';
import { PaginaPrincipaleComponent } from './components/pagina-principale/pagina-principale.component';
import { NuoviArriviComponent } from './components/nuovi-arrivi/nuovi-arrivi.component';
import { HttpClientModule } from '@angular/common/http';
import {MatListModule} from '@angular/material/list';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DettaglioScarpaComponent } from './components/dettaglio-scarpa/dettaglio-scarpa.component';
import { CarrelloComponent } from './components/carrello/carrello.component';
import { FormComponent } from './components/form/form.component';
import { PagamentoComponent } from './components/pagamento/pagamento.component';
import { ThankyoupageComponent } from './components/thankyoupage/thankyoupage.component';
import { JoinusComponent } from './components/joinus/joinus.component';
import { FooterComponent } from './components/footer/footer.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PaginaPrincipaleComponent,
    NuoviArriviComponent,
    SidebarComponent,
    DettaglioScarpaComponent,
    CarrelloComponent,
    FormComponent,
    PagamentoComponent,
    ThankyoupageComponent,
    JoinusComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
