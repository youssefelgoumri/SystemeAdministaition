import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfesseursComponent} from "./components/professeurs/professeurs.component";
import {ReservationComponent} from "./components/ReservationSalle/reservation/reservation.component";

const routes: Routes = [
  {path: "" ,component : ProfesseursComponent},
  {path:"reserve", component:ReservationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
