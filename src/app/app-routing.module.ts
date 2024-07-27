import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaPrincipaleComponent } from './components/pagina-principale/pagina-principale.component';
import { NuoviArriviComponent } from './components/nuovi-arrivi/nuovi-arrivi.component';
import { DettaglioScarpaComponent } from './components/dettaglio-scarpa/dettaglio-scarpa.component';
import { CarrelloComponent } from './components/carrello/carrello.component';
import { FormComponent } from './components/form/form.component';
import { PagamentoComponent } from './components/pagamento/pagamento.component';
import { ThankyoupageComponent } from './components/thankyoupage/thankyoupage.component';
import { JoinusComponent } from './components/joinus/joinus.component';

const routes: Routes = [
  { path: 'Home', component: PaginaPrincipaleComponent},
  { path: 'New-arrivals', component: NuoviArriviComponent },
  { path: 'All-shoes', component: NuoviArriviComponent },
  { path: 'Best-sellers', component: NuoviArriviComponent },
  { path: 'Discover sport', component: NuoviArriviComponent },
  { path: 'Basketball', component: NuoviArriviComponent },
  { path: 'Running', component: NuoviArriviComponent },
  { path: 'Sneakers', component: NuoviArriviComponent },
  { path: 'dettaglio-scarpa/:id', component: DettaglioScarpaComponent },
  { path: 'carrello', component: CarrelloComponent },
  { path: 'form', component: FormComponent },
  { path: 'pagamento', component: PagamentoComponent },
  { path: 'thankyoupage', component: ThankyoupageComponent },
  { path: 'joinus', component: JoinusComponent },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
