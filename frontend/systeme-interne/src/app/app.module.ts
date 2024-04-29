import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import {CommonModule, DatePipe} from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatInputModule} from "@angular/material/input";
import { HomeprofComponent } from './components/professeur/homeprof/homeprof.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DeletedialogComponent } from './components/professeur/deletedialog/deletedialog.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderappComponent } from './components/headerapp/headerapp.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { LoginComponent } from './components/login/login.component';
import {MatSortModule} from "@angular/material/sort";
import {MatFormFieldModule} from "@angular/material/form-field";
import {NgForm} from '@angular/forms';
import { AddSalleDialogComponent } from './components/sallesCrud/add-salle-dialog/add-salle-dialog.component';
import {MatSelectModule} from "@angular/material/select";
import { FreeSallesComponent } from './components/reservationConsulation/free-salles/free-salles.component';
import { ReservedSallesComponent } from './components/reservationConsulation/reserved-salles/reserved-salles.component';
import { CalendarModule } from 'primeng/calendar';
import {MatDatepickerModule} from "@angular/material/datepicker";
import { ProfReserveSalleComponent } from './components/reservationConsulation/prof-reserve-salle/prof-reserve-salle.component';
import {MatTreeModule} from '@angular/material/tree';
import {SalleComponent} from "./components/sallesCrud/salle/salle.component";
import { GestionAbsenceComponent } from './components/gestion-absence/gestion-absence.component';
import { SidebarModule } from 'primeng/sidebar';
import { SidenavProfComponent } from './components/sidenav-prof/sidenav-prof.component';
import { MenubarModule } from 'primeng/menubar';
import { SalleReservationComponent } from './components/professeur/salle-reservation/salle-reservation.component';
import { ResultatrattComponent } from './components/rattrapage/resultatratt/resultatratt.component';
import { ShowresultatelementComponent } from './components/rattrapage/showresultatelement/showresultatelement.component';
import { AddchooseComponent } from './components/rattrapage/addchoose/addchoose.component';
import { ImportfileComponent } from './components/rattrapage/importfile/importfile.component';
import { ManuelComponent } from './components/rattrapage/manuel/manuel.component';
import { AppchooseComponent } from './components/rattrapage/appchoose/appchoose.component';
import { ExportComponent } from './components/rattrapage/export/export.component';
import { NotesComponent } from './components/deliberation-ordinaire/notes/notes.component';
import { AddpvComponent } from './components/deliberation-ordinaire/pv/addpv/addpv.component';
import { ShowallpvComponent } from './components/deliberation-ordinaire/pv/showallpv/showallpv.component';
import { AddpvmoduleComponent } from './components/deliberation-ordinaire/pv/addpvmodule/addpvmodule.component';
import { ShowallpvmoduleComponent } from './components/deliberation-ordinaire/pv/showallpvmodule/showallpvmodule.component';
import { ProfProfileComponent } from './components/professeur/prof-profile/prof-profile.component';
import {AbsenceAdminComponent} from "./components/absence-admin/absence-admin.component";
import { UpdateAbsenceDialogComponent } from './components/absence-admin/update-absence-dialog/update-absence-dialog.component';
import { DialogupdateReservationComponent } from './components/professeur/dialogupdate-reservation/dialogupdate-reservation.component';
import { DialogDeleteReservationComponent } from './components/professeur/dialog-delete-reservation/dialog-delete-reservation.component';
import { DelibsemestreComponent } from './components/deliberation-semestre/delibsemestre/delibsemestre.component';
import { ChooseComponent } from './components/deliberation-semestre/choose/choose.component';
import { AddResultsComponent } from './components/deliberation-semestre/add-results/add-results.component';
import { GenerateResultsComponent } from './components/deliberation-semestre/generate-results/generate-results.component';
import { EditpvComponent } from './components/deliberation-ordinaire/pv/editpv/editpv.component';
import { AnneeunivComponent } from './components/anneeunivcomo/anneeuniv/anneeuniv.component';
import { AddanneeunivComponent } from './components/anneeunivcomo/addanneeuniv/addanneeuniv.component';
import { ImportpvfileComponent } from './components/deliberation-ordinaire/pv/importpvfile/importpvfile.component';
import { ExportpvComponent } from './components/deliberation-ordinaire/pv/exportpv/exportpv.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeprofComponent,
    DeletedialogComponent,
    DashboardComponent,
    HeaderappComponent,
    SidenavComponent,
    LoginComponent,
    AddSalleDialogComponent,
    FreeSallesComponent,
    ReservedSallesComponent,
    ProfReserveSalleComponent,
    SalleComponent,
    GestionAbsenceComponent,
    ProfProfileComponent,
    SidenavProfComponent,
    SalleReservationComponent,
    ResultatrattComponent,
    ShowresultatelementComponent,
    EditpvComponent,
    AddchooseComponent,
    ImportfileComponent,
    AppchooseComponent,
    NotesComponent,
    ShowallpvComponent,
    ShowallpvmoduleComponent,
    AbsenceAdminComponent,
    UpdateAbsenceDialogComponent,
    DialogDeleteReservationComponent,
    DelibsemestreComponent,
    ChooseComponent,
    EditpvComponent,
    AnneeunivComponent,
    ImportpvfileComponent,
    ExportpvComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    FormsModule,
    MatInputModule,
    FontAwesomeModule,
    MatFormFieldModule, MatInputModule, MatSortModule,
    MatSelectModule,
    CalendarModule, MatDatepickerModule,
    MatTreeModule,
    SidebarModule,
    MenubarModule,



    // NgbModule,
  ],
  providers: [SidenavComponent,DatePipe,SidenavProfComponent],
    exports: [HeaderappComponent, SidenavComponent,SidenavProfComponent],
  bootstrap: [AppComponent]
})
export class  AppModule{ }
