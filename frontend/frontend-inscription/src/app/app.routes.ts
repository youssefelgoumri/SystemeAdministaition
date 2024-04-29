import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { InscriptionEnLigneComponent } from './inscription-en-ligne/inscription-en-ligne.component';
import { InscriptionAdministrativeComponent } from './inscription-administrative/inscription-administrative.component';

export const routes: Routes = [
    {
        path: '', redirectTo: 'welcome', pathMatch: 'full'
    },
    {
        path: 'welcome', component: WelcomeComponent
    },
    {
        path: 'inscription-enLigne', component: InscriptionEnLigneComponent
    },
    {
        path: 'inscription-administrative', component: InscriptionAdministrativeComponent
    }
];
