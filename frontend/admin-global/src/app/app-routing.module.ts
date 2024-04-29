import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WelcomeComponent} from "./components/welcome/welcome.component";
import {LoginComponent} from "./components/login/login.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {EtabhomeComponent} from "./components/etablissements/etabhome/etabhome.component";
import {AddEtabsComponent} from "./components/etablissements/add-etabs/add-etabs.component";
import {FilieresComponent} from "./components/filieres/filiere/filieres.component";
import {DialogAddComponent} from "./components/filieres/dialog-add/dialog-add.component";
import { ShowmoreComponent } from './components/etablissements/showmore/showmore.component';
import { ShowmorefiliereComponent } from './components/etablissements/showmorefiliere/showmorefiliere.component';
import { ModulesHomeComponent } from './components/modules/modules-home/modules-home.component';
import { AfficherElementsComponent } from './components/modules/afficher-elements/afficher-elements.component';

const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' }, // Default route to welcome page
  { path: 'welcome', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  {path : "etablissements", component : EtabhomeComponent},
  {path : "addetab", component : AddEtabsComponent},
  {path : "filieres", component : FilieresComponent},
  {path : "modules", component : ModulesHomeComponent},
  {path : "modules/:id/elements", component : AfficherElementsComponent},
  //{path : "addfiliere", component : DialogAddComponent},
  { path: 'etablissements/showmore/:codeName', component: ShowmoreComponent },
  { path: 'etablissements/showmore/:codeName/:id', component: ShowmorefiliereComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
