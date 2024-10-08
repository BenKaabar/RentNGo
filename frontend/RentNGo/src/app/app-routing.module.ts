import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageAccueilComponent } from './PageAccueil/Accueil/page-accueil.component';
import { VoitureComponent } from './Voiture/voiture.component';
import { TemoignagesComponent } from './Temoignages/temoignages.component';
import { AproposComponent } from './About/apropos/apropos.component';
import { FaqComponent } from './About/faq/faq.component';
import { ContactComponent } from './Contact/contact.component';
import { SignInComponent } from './SignIn-SignUp/client/sign-in/sign-in.component';
import { SignUpComponent } from './SignIn-SignUp/client/sign-up/sign-up.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CompteClientComponent } from './CompteClient/compte-client/compte-client.component';
import { DashboardClientComponent } from './CompteClient/dashboard-client/dashboard-client.component';
import { GestionReservationsComponent } from './CompteClient/gestion-reservations/gestion-reservations.component';
import { GestionTemoignageComponent } from './CompteClient/gestion-temoignage/gestion-temoignage.component';
import { DashboardComponent } from './Dashboard/dashboard/dashboard.component';
import { GestionClientComponent } from './Dashboard/gestion-client/gestion-client.component';
import { GestionContactComponent } from './Dashboard/gestion-contact/gestion-contact.component';
import { GestionReservationComponent } from './Dashboard/gestion-reservation/gestion-reservation.component';
import { GestionTemoignagesComponent } from './Dashboard/gestion-temoignages/gestion-temoignages.component';
import { GestionVoitureComponent } from './Dashboard/gestion-voiture/gestion-voiture.component';
import { Etape2Component } from './ReservationPage/composantsReservation/etapes/etape2/etape2.component';
import { Etape3Component } from './ReservationPage/composantsReservation/etapes/etape3/etape3.component';
import { SignUpAdminComponent } from './SignIn-SignUp/admin/sign-up-admin/sign-up-admin.component';
import { SignInAdminComponent } from './SignIn-SignUp/admin/sign-in-admin/sign-in-admin.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'Accueil', component: PageAccueilComponent },
  { path: 'Voiture/:page', component: VoitureComponent },
  { path: 'Voiture', redirectTo: 'Voiture/1', pathMatch: 'full' },
  { path: 'Temoignages', component: TemoignagesComponent },
  { path: 'Contact', component: ContactComponent },
  { path: 'Apropos', component: AproposComponent },
  { path: 'Faq', component: FaqComponent },
  { path: 'SignIn', component: SignInComponent },
  { path: 'SignUp', component: SignUpComponent },
  { path: 'SignInAdmin', component: SignInAdminComponent },
  { path: 'SignUpAdmin', component: SignUpAdminComponent },
  { path: 'Reservation/etape3', component: Etape3Component },
  { path: 'Reservation/etape2', component: Etape2Component, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/Accueil', pathMatch: 'full' },

  {
    path: 'admin', component: DashboardComponent, children: [
      { path: 'gestion-client', component: GestionClientComponent },
      { path: 'gestion-contact', component: GestionContactComponent },
      { path: 'gestion-reservation', component: GestionReservationComponent },
      { path: 'gestion-temoignages', component: GestionTemoignagesComponent },
      { path: 'gestion-voiture', component: GestionVoitureComponent },
      { path: '', redirectTo: 'gestion-client', pathMatch: 'full' }
    ]
  },
  {
    path: 'client', component: DashboardClientComponent, children: [
      { path: 'compte-client', component: CompteClientComponent },
      { path: 'gestion-reservations', component: GestionReservationsComponent },
      { path: 'gestion-temoignage', component: GestionTemoignageComponent },
      { path: '', redirectTo: 'compte-client', pathMatch: 'full' }
    ]
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
