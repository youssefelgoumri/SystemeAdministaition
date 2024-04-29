import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import { Salle } from "../../../models/Sallesmodel/salle";
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { SalleserviceService } from "../../../services/salleservice.service";
import { MatDialog } from "@angular/material/dialog";
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatIconModule } from "@angular/material/icon";
import { map } from "rxjs";
import {
  EditConfirmationDialogComponentComponent
} from "../edit-confirmation-dialog-component/edit-confirmation-dialog-component.component";
 import {DeleteConfirmationDialogComponentComponent} from "../delete-confirmation-dialog-component/delete-confirmation-dialog-component.component";
import {NgForm} from '@angular/forms';
import {AddSalleDialogComponent} from "../add-salle-dialog/add-salle-dialog.component";
import {AppModule} from "../../../app.module";


@Component({
  selector: 'app-salle',
  templateUrl: './salle.component.html',
  styleUrls: ['./salle.component.css'],

  // Add standalone: true here
})
export class SalleComponent implements AfterViewInit {
  salles: Salle[] = []
  displayedColumns: string[] = ['idSalle', 'nom', 'typeSalle', 'description', 'actions'];
  SalleSource: MatTableDataSource<Salle>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isSidebarOpen: string = "open";
  search!: Event;

  constructor(private salleserviceService: SalleserviceService, private dialog: MatDialog, private http: HttpClient, private snackBar: MatSnackBar) {

    this.SalleSource = new MatTableDataSource(this.salles);
    // Assign the data to the data source for the table to render
    this.getData();
    this.SalleSource = new MatTableDataSource(this.salles);
    this.isSidebarOpen="open";
  }
  onSidebarToggle(isOpen: string) {
    this.isSidebarOpen = isOpen;
  }
  ngAfterViewInit(): void {
    this.SalleSource.paginator = this.paginator;
    this.SalleSource.sort = this.sort;
  }


  applyFilter(event: Event) {
    this.search=event;
    const filterValue = (this.search.target as HTMLInputElement).value;
    this.SalleSource.filter = filterValue.trim().toLowerCase();

    if (this.SalleSource.paginator) {
      this.SalleSource.paginator.firstPage();
    }
  }

  getAllSalles() {
    this.salleserviceService.allSalles().subscribe(
      data => {
        console.log(data);
        this.salles = data;
      },
      error => { alert(error) }
    )
  }

  getData() {
    this.salleserviceService.allSalles().pipe(
      map((response: any[]) => {
        return response.map(item => ({
          idSalle: item.idSalle,
          nom: item.nom,
          typeSalle: item.typeSalle,
          description: item.description
        }));
      })
    )
      .subscribe(
        (transformedData: Salle[]) => {
          this.salles = transformedData;
          this.SalleSource.data = this.salles;
        },
        (error) => {
          console.error('Error occurred:', error);
        }
      );
  }

  updateRow(row: Salle): void {
    const dialogRef = this.dialog.open(EditConfirmationDialogComponentComponent, {
      data: row // Pass the row data to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Updated row:', result);
        this.editeSalle(result); // Call the editeSalle function with the updated data
      } else {
        console.log('Edit canceled');
      }
    });
  }


  editeSalle(updateSalle: Salle) {
    const idSalle = updateSalle.idSalle;

    this.http.put(`http://localhost:2222/RESERVATIONSALLE-SERVICE/ReservationSalle/edit/${idSalle}`, updateSalle).subscribe(
      () => {
        this.getData(); // Update the table data
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



  deleteRow(row: Salle) {
    this.openDeleteConfirmationDialog(row);
  }

  openDeleteConfirmationDialog(row: Salle): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponentComponent, {
      data: { row } // Pass the row object as data to the dialog component
    });

    dialogRef.componentInstance.deleteConfirmed.subscribe(result => {
      if (result) { // Check if result is true (delete confirmed)
        console.log('Delete row:', row);
        console.log('Code Name:', row.idSalle);
        this.deleteSalle(row.idSalle);
      } else {
        console.log('Deletion canceled');
      }
    });
  }



  deleteSalle(idSalle: number) {
    this.http.delete(`http://localhost:2222/RESERVATIONSALLE-SERVICE/ReservationSalle/delete/${idSalle}`).subscribe(
      () => {
        this.getData(); // Update the table data
        this.snackBar.open('Salle:  deleted successfully', 'Close', {
          duration: 1500,
        });
      },
      (error) => {
        console.error('Error occurred:', error);
        this.snackBar.open('Failed to delete salle', 'Close', {
          duration: 1500,
          panelClass: ['error-snackbar'],
        });
      }
    );
  }




  // Function to open the add salle dialog
  openAddSalleDialog(): void {
    const dialogRef = this.dialog.open(AddSalleDialogComponent, {
      width: '500px'
    });
    dialogRef.componentInstance.salleAdded.subscribe((newSalle: Salle) => {
      this.addSalle(newSalle);
    });
  }

  addSalle(newSalle: Salle): void {
    this.http.post('http://localhost:2222/RESERVATIONSALLE-SERVICE/ReservationSalle/add', newSalle).subscribe(
      () => {
        this.getData();
        this.snackBar.open('Salle added successfully', 'Close', { duration: 1500 });
      },
      (error) => {
        console.error('Error occurred:', error);
        this.snackBar.open('Failed to add salle', 'Close', { duration: 1500, panelClass: ['error-snackbar'] });



      },);}
}
