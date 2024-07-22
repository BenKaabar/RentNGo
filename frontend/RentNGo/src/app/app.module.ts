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
import { ReservationComponent } from './Reservation/reservation.component';
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
import { Composant5Component } from './ComposantAccueil/composant-5/composant-5.component';
import { Composant6Component } from './ComposantAccueil/composant-6/composant-6.component';

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
    Composant5Component,
    Composant6Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
