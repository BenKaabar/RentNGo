import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageAccueilComponent } from './PageAccueil/Accueil/page-accueil.component';
import { VoitureComponent } from './Voiture/voiture.component';
import { TemoignagesComponent } from './Temoignages/temoignages.component';
import { AproposComponent } from './About/apropos/apropos.component';
import { FaqComponent } from './About/faq/faq.component';
import { ContactComponent } from './Contact/contact.component';
import { ReservationComponent } from './Reservation/reservation.component';
import { SignInComponent } from './SignIn-SignUp/sign-in/sign-in.component';
import { SignUpComponent } from './SignIn-SignUp/sign-up/sign-up.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: 'Accueil', component: PageAccueilComponent },
  { path: 'Voiture/:page', component: VoitureComponent },
  { path: 'Voiture', redirectTo: 'Voiture/1', pathMatch: 'full' },
  { path: 'Temoignages', component: TemoignagesComponent },
  { path: 'Contact', component: ContactComponent },
  { path: 'Apropos', component: AproposComponent },
  { path: 'Faq', component: FaqComponent },
  { path: 'Reservation', component: ReservationComponent },
  { path: 'SignIn', component: SignInComponent },
  { path: 'SignUp', component: SignUpComponent },
  { path: '', redirectTo: '/Accueil', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

  // {path:'',redirectTo:'/produits',pathMatch:'full'}
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
