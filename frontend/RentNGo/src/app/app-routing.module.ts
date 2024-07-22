import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageAccueilComponent } from './PageAccueil/page-accueil/page-accueil.component';
import { ReservationComponent } from './Reservation/reservation.component';
import { FaqComponent } from './About/faq/faq.component';

const routes: Routes = [
  {path:'',component:PageAccueilComponent },
  {path:'r',component: ReservationComponent },
  {path:'f',component:   FaqComponent },

]
  // {path:'',redirectTo:'/produits',pathMatch:'full'}
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
