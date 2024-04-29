import {Component, ViewChild} from '@angular/core';
import {Salle} from "../../../models/Sallesmodel/salle";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import { SalleserviceService } from "../../../services/salleservice.service";
import {MatDialog} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Reservation} from "../../../models/reservationModel/reservation";
import {DialogAddReservationComponent} from "../dialog-add-reservation/dialog-add-reservation.component";
import { Professeur } from 'src/app/models/ProfModel/professeur';
import { ProfesseurService } from 'src/app/services/professeur.service';
import { Router } from '@angular/router';
import {DialogupdateReservationComponent} from "../dialogupdate-reservation/dialogupdate-reservation.component";
import {DatePipe} from "@angular/common";
import {
  DeleteConfirmationDialogComponentComponent
} from "../../sallesCrud/delete-confirmation-dialog-component/delete-confirmation-dialog-component.component";


import {faEdit, faSearch, faTrash} from "@fortawesome/free-solid-svg-icons";
import {DialogDeleteReservationComponent} from "../dialog-delete-reservation/dialog-delete-reservation.component";

@Component({
  selector: 'app-salle-reservation',
  templateUrl: './salle-reservation.component.html',
  styleUrls: ['./salle-reservation.component.css']
})
export class SalleReservationComponent {
  delete = faTrash;
  edit = faEdit;
  salles: Salle[] = [];
  prof : Professeur=new Professeur();
  reservation: Reservation[] = [];
  displayedColumns: string[] = ['sallenom', 'dateDebut', 'dateFin', 'actions'];
  SalleSource: MatTableDataSource<Reservation>=new  MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isSidebarOpen: string = "open";
  search!: Event;
  profID:number
  constructor(private route:Router,private salleserviceService: SalleserviceService,private profService: ProfesseurService,private http: HttpClient, private snackBar: MatSnackBar, private dialog: MatDialog,private datePipe: DatePipe) {
    this.profID=parseInt(this.route.url.split("/")[2])
    this.getReservation()

    this.SalleSource = new MatTableDataSource(this.prof.reservations);


    // this.SalleSource = new MatTableDataSource(this.prof.reservations);
  }

  onSidebarToggle(isOpen: string) {
    this.isSidebarOpen = isOpen;
  }

  ngAfterViewInit(): void {
    this.SalleSource.paginator = this.paginator;
    this.SalleSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    this.search = event;
    const filterValue = (this.search.target as HTMLInputElement).value;
    this.SalleSource.filter = filterValue.trim().toLowerCase();

    if (this.SalleSource.paginator) {
      this.SalleSource.paginator.firstPage();
    }
  }

  updateRow(row: Reservation): void {
    const dialogRef = this.dialog.open(DialogupdateReservationComponent, {
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Format dates before sending
        result.date_debut = this.datePipe.transform(result.date_debut, 'yyyy-MM-dd HH:mm:ss');
        result.date_fin = this.datePipe.transform(result.date_fin, 'yyyy-MM-dd HH:mm:ss');
        console.log('Updated row:', result);
        this.editeSalle(result); // Call the editeSalle function with the updated data
      } else {
        console.log('Edit canceled');
      }
    });
  }

  editeSalle(updateReservation: Reservation) {
    const reservationId = updateReservation.id; // Use reservation ID instead of salle ID
    const formattedDateDebut = this.datePipe.transform(updateReservation.date_debut, 'yyyy-MM-dd HH:mm:ss');
    const formattedDateFin = this.datePipe.transform(updateReservation.date_fin, 'yyyy-MM-dd HH:mm:ss');
    const requestBody = {
      newDateDebut: formattedDateDebut,
      newDateFin: formattedDateFin
    };

    this.http.put(`http://localhost:2222/RESERVATIONSALLE-SERVICE/ReservationSalle/modifyReservation/${reservationId}`, requestBody).subscribe(
      () => {
        this.getReservation(); // Update the table data
        this.snackBar.open('Salle updated successfully', 'Close', {
          duration: 1500,
        });
      },
      (error) => {
        console.error('Error occurred:', error);
        this.snackBar.open('Failed to update salle', 'Close', {
          duration: 1500,
          panelClass: ['error-snackbar'],
        });
      }
    );
  }



  deleteRow(row: Reservation) {
    this.openDeleteConfirmationDialog(row);
  }

  openDeleteConfirmationDialog(row: Reservation): void {
    const dialogRef = this.dialog.open(DialogDeleteReservationComponent, {
      data: { row } // Pass the row object as data to the dialog component
    });

    dialogRef.componentInstance.deleteConfirmed.subscribe(result => {
      if (result) { // Check if result is true (delete confirmed)
        console.log('Delete row:', row);
        console.log('id Reservation:', row.id);
        this.deleteReservation(row.id); // Call deleteReservation with reservation ID
        location.reload();
      } else {
        console.log('Deletion canceled');
      }
    });
  }

  deleteReservation(idReservation: number) {
    this.http.delete(`http://localhost:2222/RESERVATIONSALLE-SERVICE/ReservationSalle/cancelReservation/${idReservation}`).subscribe(
      () => {
        this.getReservation(); // Update the table data
        this.snackBar.open('Reservation canceled successfully', 'Close', {
          duration: 500,
        });
      },
      (error) => {
        console.error('Error occurred:', error);
        this.snackBar.open('Failed to cancel reservation', 'Close', {
          duration: 500,
          panelClass: ['error-snackbar'],
        });
      }
    );
  }







  rowsalles:Salle[]=[]
  openAddReservationDialog(): void {
    this.salleserviceService.allSalles()
      .subscribe(
        (transformedData) => {
          this.rowsalles=transformedData;
          const dialogRef = this.dialog.open(DialogAddReservationComponent, {
            width: '700px',
            data: this.profID // Pass the row data to the dialog
          });
          dialogRef.afterClosed().subscribe(result => {
            this.getReservation()
          });
        },
        (error) => {
          console.error('Error occurred:', error);
        }
      );
      // let row=this.rowsalles
      // console.log( this.salles)



  }

  getReservation(){
    this.profService.getProfByid(this.profID).subscribe(
      prof=>{
        this.prof=prof
        console.log("prof",this.prof.reservations)
        this.SalleSource.data = this.prof.reservations;


      },
      err=>{}
    )
  }

  // Méthode pour ajouter une réservation


}
