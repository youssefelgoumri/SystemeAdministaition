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
  DeleteConfirmationDialogComponentComponent
} from "../../delete-confirmation-dialog-component/delete-confirmation-dialog-component.component";
import { Filiere } from 'src/app/models/etablissementModel/FiliereModel/filiere';


@Component({
  selector: 'app-showmore',
  templateUrl: './showmore.component.html',
  styleUrl: './showmore.component.css'
})
export class ShowmoreComponent implements AfterViewInit{

  delete=faTrash;
  edit=faEdit;

  etablissement: Etablissement=new Etablissement();
  displayedColumns: string[] = ['id', 'nom', 'nombreAnnees', 'nombreSemestresParAnnee','responsable','actions'];
  FilieresSource: MatTableDataSource<Filiere>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isSidebarOpen: string = "open";
  search!: Event;
  codeName!:string;

  constructor(private EtabService:EtablissementService,private route:Router,private snackBar:MatSnackBar) {
    const currentUrl = this.route.url;
    this.codeName=currentUrl.split("/")[3]
    // console.log("fjds==="+currentUrl.split("/")[3])


    this.FilieresSource = new MatTableDataSource(this.etablissement.filieres);
    // Assign the data to the data source for the table to render
    this.getData();
    this.FilieresSource = new MatTableDataSource(this.etablissement.filieres);

    
  }


  ngAfterViewInit() {
    this.FilieresSource.paginator = this.paginator;
    this.FilieresSource.sort = this.sort;

  }
  // test if the sidebar is open or close


  onSidebarToggle(isOpen: string) {
    this.isSidebarOpen = isOpen;
    // console.log(this.isSidebarOpen)
  }

  applyFilter(event: Event) {
    // console.log(event);
    // console.log(this.search);
    this.search=event;
    const filterValue = (this.search.target as HTMLInputElement).value;
    this.FilieresSource.filter = filterValue.trim().toLowerCase();

    if (this.FilieresSource.paginator) {
      this.FilieresSource.paginator.firstPage();
    }
  }

  getData() {
    this.EtabService.getEtabByCodeName(this.codeName)
      .subscribe(
        (transformedData: Etablissement) => {
          this.etablissement = transformedData;
          this.FilieresSource.data = this.etablissement.filieres;
          // console.log(this.etablissement);
          // console.log(this.FilieresSource.data.at(1))
        },
        (error) => {
          console.error('Error occurred:', error);
        }
      );
  }

  showMoreRow(row: Filiere){
    // console.log('showMore row:', row);
    this.route.navigateByUrl("etablissements/showmore/"+this.codeName+"/"+row.id);
  }

  return(){
    this.route.navigateByUrl("etablissements")
  }

  deleteRow(row : Filiere){
    this.EtabService.deleteFiliereFromEtab(this.codeName, row.id).subscribe(
      (data)=>{
        this.getData();
        this.snackBar.open('Filiere deleted successfully', 'Close', {
          duration: 3000,
        });
      },
      (err)=>{
        this.snackBar.open('Failed to delete Filiere', 'Close', {
          duration: 3000,
        });
        console.log(err)}
    )

  }



  




  
}

