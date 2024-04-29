// @ts-ignore
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeprofComponent } from './components/professeur/homeprof/homeprof.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {LoginComponent} from "./components/login/login.component";
import {ReservedSallesComponent} from "./components/reservationConsulation/reserved-salles/reserved-salles.component";
import {FreeSallesComponent} from "./components/reservationConsulation/free-salles/free-salles.component";
import {ProfReserveSalleComponent} from "./components/reservationConsulation/prof-reserve-salle/prof-reserve-salle.component";
import {SalleReservationComponent} from "./components/professeur/salle-reservation/salle-reservation.component";
import { SalleComponent } from './components/sallesCrud/salle/salle.component';
import { ResultatrattComponent } from './components/rattrapage/resultatratt/resultatratt.component';

import { NotesComponent } from './components/deliberation-ordinaire/notes/notes.component';
import { ShowallpvmoduleComponent } from './components/deliberation-ordinaire/pv/showallpvmodule/showallpvmodule.component';
import { ProfProfileComponent } from './components/professeur/prof-profile/prof-profile.component';
import {AbsenceAdminComponent} from "./components/absence-admin/absence-admin.component";
import {GestionAbsenceComponent} from "./components/gestion-absence/gestion-absence.component";
import { DelibSemestreService } from './services/delib-semestre.service';
import { DelibsemestreComponent } from './components/deliberation-semestre/delibsemestre/delibsemestre.component';
import { AnneeunivComponent } from './components/anneeunivcomo/anneeuniv/anneeuniv.component';


const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path : "login" , component : LoginComponent},
  {path : "dashboard" , component : DashboardComponent},
  {path : "professeur" , component : HomeprofComponent}  ,
  {path:"salle",component:SalleComponent},
  {path:"reservedSalles",component:ReservedSallesComponent},
  {path:"freeSalles",component:FreeSallesComponent},
  {path:"reservationprof",component:ProfReserveSalleComponent},
  {path : "profile/:id" , component : ProfProfileComponent},
  {path : "reservesalle/:id" , component : SalleReservationComponent},
  {path : "notes/rattrapage" , component : ResultatrattComponent},
  {path : "notes" , component : NotesComponent},
  {path : "showallpvmodule" , component : ShowallpvmoduleComponent},
  {path : "absences/:id" , component : GestionAbsenceComponent},

  {path : "absencesadmin" , component : AbsenceAdminComponent},
  {path : "notes/semestre" , component : DelibsemestreComponent},
  {path : "anneeuniv" , component : AnneeunivComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
