import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageAccueilComponent } from './PageAccueil/page-accueil/page-accueil.component';

import { FaqComponent } from './About/faq/faq.component';
import { ReservationComponent } from './ReservationPage/Reservation/reservation.component';
import { ContactComponent } from './Contact/contact.component';
import { GestionClientComponent } from './Dashboard/gestion-client/gestion-client.component';
import { GestionContactComponent } from './Dashboard/gestion-contact/gestion-contact.component';
//import { GestionReservationComponent } from './Dashboard/gestion-reservation/gestion-reservation.component';
//import { GestionTemoignagesComponent } from './Dashboard/gestion-temoignages/gestion-temoignages.component';
import { GestionVoitureComponent } from './Dashboard/gestion-voiture/gestion-voiture.component';
import { DashboardComponent } from './Dashboard/dashboard/dashboard.component';
import { GestionTemoignageComponent } from './CompteClient/gestion-temoignage/gestion-temoignage.component';
import { GestionReservationsComponent } from './CompteClient/gestion-reservations/gestion-reservations.component';
import { CompteClientComponent } from './CompteClient/compte-client/compte-client.component';
import { GestionTemoignagesComponent } from './Dashboard/gestion-temoignages/gestion-temoignages.component';
import { GestionReservationComponent } from './Dashboard/gestion-reservation/gestion-reservation.component';
import { DashboardClientComponent } from './CompteClient/dashboard-client/dashboard-client.component';


const routes: Routes = [
  { path: '', component: PageAccueilComponent },
  { path: 'r', component: ReservationComponent },
  { path: 'f', component: FaqComponent },
  { path: 'c', component: ContactComponent },
  {
    path: 'd', component: DashboardComponent, children: [
      { path: 'gestion-client', component: GestionClientComponent },
      { path: 'gestion-contact', component: GestionContactComponent },
      { path: 'gestion-reservation', component: GestionReservationComponent },
      { path: 'gestion-temoignages', component: GestionTemoignagesComponent },
      { path: 'gestion-voiture', component: GestionVoitureComponent },
      { path: '', redirectTo: 'gestion-client', pathMatch: 'full' }
    ]
  },
  {
    path: 'dd', component: DashboardClientComponent, children: [
      { path: 'compte-client', component: CompteClientComponent },
      { path: 'gestion-reservations', component: GestionReservationsComponent },
      { path: 'gestion-temoignage', component: GestionTemoignageComponent },
      { path: '', redirectTo: 'compte-client', pathMatch: 'full' }
    ]
  }
];
  // {path:'',redirectTo:'/produits',pathMatch:'full'}
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
