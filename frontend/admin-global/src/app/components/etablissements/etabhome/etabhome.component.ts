import {Component, Input, OnInit} from '@angular/core';
import {EtablissementService} from "../../../services/EtablissementServices/etablissement.service";
import {Router} from "@angular/router";
import {Etablissement} from "../../../models/etablissementModel/etablissement";
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';
import {map} from "rxjs";
import {faEdit, faSearch, faTrash} from "@fortawesome/free-solid-svg-icons";
import {SidebarComponent} from "../../sidebar/sidebar.component";
import {MatIconModule} from "@angular/material/icon";
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  EditeConfirmationDialogComponentComponent
} from "../../edite-confirmation-dialog-component/edite-confirmation-dialog-component.component";
import {
  DeleteConfirmationDialogComponentComponent
} from "../../delete-confirmation-dialog-component/delete-confirmation-dialog-component.component";
import {AddEtabsComponent} from "../add-etabs/add-etabs.component";






@Component({
  selector: 'app-login',
  templateUrl: './etabhome.component.html',
  styleUrls: ['./etabhome.component.css']
})
export class EtabhomeComponent implements AfterViewInit {

  delete = faTrash;
  edit = faEdit;

  etablissements: Etablissement[] = []
  displayedColumns: string[] = ['codeName', 'nom', 'ville', 'discipline', 'actions'];
  EtablissementSource: MatTableDataSource<Etablissement>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isSidebarOpen: string = "open";
  search!: Event;

  constructor(private EtabService: EtablissementService, private route: Router, private dialog: MatDialog, private http: HttpClient, private snackBar: MatSnackBar) {


    this.EtablissementSource = new MatTableDataSource(this.etablissements);
    // Assign the data to the data source for the table to render
    this.getData();
    this.EtablissementSource = new MatTableDataSource(this.etablissements);


  }


  ngAfterViewInit() {
    this.EtablissementSource.paginator = this.paginator;
    this.EtablissementSource.sort = this.sort;

  }

  // test if the sidebar is open or close


  onSidebarToggle(isOpen: string) {
    this.isSidebarOpen = isOpen;
    // console.log(this.isSidebarOpen)
  }

  applyFilter(event: Event) {
    // console.log(event);
    // console.log(this.search);
    this.search = event;
    const filterValue = (this.search.target as HTMLInputElement).value;
    this.EtablissementSource.filter = filterValue.trim().toLowerCase();

    if (this.EtablissementSource.paginator) {
      this.EtablissementSource.paginator.firstPage();
    }
  }

  getData() {
    this.EtabService.AllEtablisements()
    // .pipe(
    //   map((response: any[]) => {
    //     // Perform any necessary data transformation or mapping here
    //     return response.map(item => ({
    //       codeName: item.codeName,
    //       nom: item.nom,
    //       ville: item.ville,
    //       discipline : item.discipline

    //       // Map other properties as needed
    //     }));
    //   })
    // )
      .subscribe(
        (transformedData: Etablissement[]) => {
          this.etablissements = transformedData;
          this.EtablissementSource.data = this.etablissements;
          // console.log(this.etablissements);
          // console.log(this.EtablissementSource.data.at(1))
        },
        (error) => {
          console.error('Error occurred:', error);
        }
      );
  }

  showMoreRow(row: Etablissement) {
    console.log('showMore row:', row);
    this.route.navigateByUrl("etablissements/showmore/"+row.codeName);
  }

  updateRow(row: Etablissement): void {
    const dialogRef = this.dialog.open(EditeConfirmationDialogComponentComponent, {
      data: row // Pass the row data to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Updated row:', result);
        this.editEtablissement(result); // Call the editEtablissement function with the updated data
      } else {
        console.log('Edit canceled');
      }
    });
  }


  editEtablissement(updatedEtablissement: Etablissement) {
    const codeName = updatedEtablissement.codeName;

    this.http.put(`http://localhost:2222/ETABLISSEMENT-SERVICE/etablissements/edit/${codeName}`, updatedEtablissement).subscribe(
      () => {
        this.getData(); // Update the table data
        this.snackBar.open('Etablissement updated successfully', 'Close', {
          duration: 3000,
        });
      },
      (error) => {
        console.error('Error occurred:', error);
        this.snackBar.open('Failed to update etablissement', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
      }
    );
  }


  deleteRow(row: Etablissement) {
    this.openDeleteConfirmationDialog(row);
  }

  openDeleteConfirmationDialog(row: Etablissement): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponentComponent, {
      data: {row} // Pass the row object as data to the dialog component
    });

    dialogRef.componentInstance.deleteConfirmed.subscribe(result => {
      if (result) { // Check if result is true (delete confirmed)
        console.log('Delete row:', row);
        console.log('Code Name:', row.codeName);
        this.deleteEtablissement(row.codeName);
      } else {
        console.log('Deletion canceled');
      }
    });
  }


  deleteEtablissement(codeName: string) {
    this.http.delete(`http://localhost:2222/ETABLISSEMENT-SERVICE/etablissements/delete/${codeName}`).subscribe(
      () => {
        this.getData(); // Update the table data
        this.snackBar.open('Etablissement deleted successfully', 'Close', {
          duration: 3000,
        });
      },
      (error) => {
        console.error('Error occurred:', error);
        this.snackBar.open('Failed to delete etablissement', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
      }
    );
  }


  //open dialog si je click sur add etab button :
  openAddEtablissementDialog(): void {
    const dialogRef = this.dialog.open(AddEtabsComponent, {
      width: '700px', // Adjust the width as needed
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getData();
      console.log('The dialog was closed');
      // You can handle any actions after the dialog is closed here
    });

  }
}

