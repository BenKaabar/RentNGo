import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { TemoignagesComponent } from './temoignages/temoignages.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './SignIn-SignUp/sign-up/sign-up.component';
import { VoitureComponent } from './voiture/voiture.component';
import { AproposComponent } from './Shared/Apropos/apropos/apropos.component';
import { FaqComponent } from './Shared/Faq/faq/faq.component';
import { NavBarComponent } from './Shared/nav-bar/nav-bar.component';
import { FooterComponent } from './Shared/footer/footer.component';
import { ReservationComponent } from './reservation/reservation.component';
import { GestionContactComponent } from './Dashboard/gestion-contact/gestion-contact.component';
import { GestionReservationComponent } from './Dashboard/gestion-reservation/gestion-reservation.component';
import { GestionTemoignagesComponent } from './Dashboard/gestion-temoignages/gestion-temoignages.component';
import { GestionVoitureComponent } from './Dashboard/gestion-voiture/gestion-voiture.component';
import { CompteClientComponent } from './compteclient/compte-client/compte-client.component';
import { PageAccueilComponent } from './PageAccueil/page-accueil/page-accueil.component';

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
    PageAccueilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
