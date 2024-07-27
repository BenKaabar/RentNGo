import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactComponent } from './Contact/contact.component';
import { TemoignagesComponent } from './Temoignages/temoignages.component';
import { SignInComponent } from './SignIn-SignUp//sign-in/sign-in.component';
import { SignUpComponent } from './SignIn-SignUp/sign-up/sign-up.component';
import { VoitureComponent } from './Voiture/voiture.component';
import { AproposComponent } from './About/apropos/apropos.component';
import { FaqComponent } from './About/faq/faq.component';
import { NavBarComponent } from './Shared/nav-bar/nav-bar.component';
import { FooterComponent } from './Shared/footer/footer.component';

import { GestionContactComponent } from './Dashboard/gestion-contact/gestion-contact.component';
import { GestionReservationComponent } from './Dashboard/gestion-reservation/gestion-reservation.component';
import { GestionTemoignagesComponent } from './Dashboard/gestion-temoignages/gestion-temoignages.component';
import { GestionVoitureComponent } from './Dashboard/gestion-voiture/gestion-voiture.component';
import { CompteClientComponent } from './CompteClient/compte-client/compte-client.component';
import { PageAccueilComponent } from './PageAccueil/page-accueil/page-accueil.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Composant1Component } from './ComposantAccueil/composant-1/composant-1.component';
import { Composant2Component } from './ComposantAccueil/composant-2/composant-2.component';
import { Composant3Component } from './ComposantAccueil/composant-3/composant-3.component';
import { Composant4Component } from './ComposantAccueil/composant-4/composant-4.component';
import { ReservationComponent } from './ReservationPage/Reservation/reservation.component';
import { Etape2Component } from './ReservationPage/composantsReservation/etapes/etape2/etape2.component';
import { Etape3Component } from './ReservationPage/composantsReservation/etapes/etape3/etape3.component';
import { FormsModule } from '@angular/forms';
import { GestionClientComponent } from './Dashboard/gestion-client/gestion-client.component';
import { DashboardComponent } from './Dashboard/dashboard/dashboard.component';
import { GestionTemoignageComponent } from './CompteClient/gestion-temoignage/gestion-temoignage.component';
import { DashboardClientComponent } from './CompteClient/dashboard-client/dashboard-client.component';
import { GestionReservationsComponent } from './CompteClient/gestion-reservations/gestion-reservations.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    TemoignagesComponent,
    SignInComponent,
    SignUpComponent,
    VoitureComponent,
    AproposComponent,
    FaqComponent,
    NavBarComponent,
    FooterComponent,
    ReservationComponent,
    GestionContactComponent,
    GestionReservationComponent,
    GestionTemoignagesComponent,
    GestionVoitureComponent,
    CompteClientComponent,
    PageAccueilComponent,
    Composant1Component,
    Composant2Component,
    Composant3Component,
    Composant4Component,
    Etape2Component,
    Etape3Component,
    GestionClientComponent,
    DashboardComponent,
    GestionTemoignageComponent,
    DashboardClientComponent,
    GestionReservationsComponent,
    CompteClientComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
