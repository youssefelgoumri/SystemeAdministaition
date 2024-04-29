import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import {HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './components/login/login.component';
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSortModule} from "@angular/material/sort";
import {EtabhomeComponent} from "./components/etablissements/etabhome/etabhome.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {HeaderappComponent} from "./components/headerapp/headerapp.component";
import {MatStepperModule} from '@angular/material/stepper';
import {FilieresComponent} from "./components/filieres/filiere/filieres.component";
import { ShowmoreComponent } from './components/etablissements/showmore/showmore.component';
import { ShowmorefiliereComponent } from './components/etablissements/showmorefiliere/showmorefiliere.component';
import {MatCardModule} from '@angular/material/card';
import { ModulesHomeComponent } from './components/modules/modules-home/modules-home.component';
import { AfficherElementsComponent } from './components/modules/afficher-elements/afficher-elements.component';
@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    DashboardComponent,
    SidebarComponent,
    EtabhomeComponent,
    HeaderappComponent,
    FilieresComponent,
    ShowmoreComponent,
    ShowmorefiliereComponent,
    ModulesHomeComponent,
    AfficherElementsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    NgbModule,
    FontAwesomeModule,
    MatFormFieldModule, MatInputModule, MatSortModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    MatStepperModule,
    MatCardModule,
  ],
  providers: [SidebarComponent],
  exports: [HeaderappComponent, SidebarComponent],

  bootstrap: [AppComponent]
})
export class AppModule { }
