import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfesseursComponent } from './components/professeurs/professeurs.component';
import { ReservationComponent } from './components/ReservationSalle/reservation/reservation.component';
import { SalleComponent } from './components/ReservationSalle/salle/salle.component';
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    ProfesseursComponent,
    ReservationComponent,
    SalleComponent
  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
