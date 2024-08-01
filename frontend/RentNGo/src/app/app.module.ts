import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SignUpComponent } from './SignIn-SignUp/sign-up/sign-up.component';

import { NavBarComponent } from './Shared/nav-bar/nav-bar.component';
import { FooterComponent } from './Shared/footer/footer.component';
import { ContactComponent } from './Contact/contact.component';
import { TemoignagesComponent } from './Temoignages/temoignages.component';
import { SignInComponent } from './SignIn-SignUp//sign-in/sign-in.component';
import { VoitureComponent } from './Voiture/voiture.component';
import { AproposComponent } from './About/apropos/apropos.component';
import { FaqComponent } from './About/faq/faq.component';

import { GestionContactComponent } from './Dashboard/gestion-contact/gestion-contact.component';
import { GestionReservationComponent } from './Dashboard/gestion-reservation/gestion-reservation.component';
import { GestionTemoignagesComponent } from './Dashboard/gestion-temoignages/gestion-temoignages.component';
import { GestionVoitureComponent } from './Dashboard/gestion-voiture/gestion-voiture.component';
import { PageAccueilComponent } from './PageAccueil/Accueil/page-accueil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CompteClientComponent } from './CompteClient/compte-client/compte-client.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { Composant5Component } from './PageAccueil/ComposantsAccueil/composant5/composant5.component';
import { Composant4Component } from './PageAccueil/ComposantsAccueil/composant4/composant4.component';
import { Composant1Component } from './PageAccueil/ComposantsAccueil/composant1/composant1.component';
import { Composant2Component } from './PageAccueil/ComposantsAccueil/composant2/composant2.component';
import { Composant3Component } from './PageAccueil/ComposantsAccueil/composant3/composant3.component';
import { Etape2Component } from './ReservationPage/composantsReservation/etapes/etape2/etape2.component';
import { Etape3Component } from './ReservationPage/composantsReservation/etapes/etape3/etape3.component';
import { GestionClientComponent } from './Dashboard/gestion-client/gestion-client.component';
import { DashboardComponent } from './Dashboard/dashboard/dashboard.component';
import { GestionTemoignageComponent } from './CompteClient/gestion-temoignage/gestion-temoignage.component';
import { DashboardClientComponent } from './CompteClient/dashboard-client/dashboard-client.component';
import { GestionReservationsComponent } from './CompteClient/gestion-reservations/gestion-reservations.component';
import { ReservationComponent } from './ReservationPage/Reservation/reservation.component';
import { HttpClientModule } from '@angular/common/http';
import { TruncatePipe } from './Services/Truncate/truncate.pipe';

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
    NotFoundComponent,
    Composant5Component,
    Composant4Component,
    Composant3Component,
    Composant2Component,
    Composant1Component,
    Etape2Component,
    Etape3Component,
    GestionClientComponent,
    DashboardComponent,
    GestionTemoignageComponent,
    DashboardClientComponent,
    GestionReservationsComponent,
    CompteClientComponent,
    TruncatePipe 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
