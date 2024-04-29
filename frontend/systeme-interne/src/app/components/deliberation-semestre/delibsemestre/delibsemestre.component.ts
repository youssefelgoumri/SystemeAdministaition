import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';
import {map} from "rxjs";
import {faEdit, faSearch, faTrash} from "@fortawesome/free-solid-svg-icons";
import {MatIconModule} from "@angular/material/icon";
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResultatSemestre } from 'src/app/models/SemestreDelibModel/resultat-semestre';
import { DelibSemestreService } from 'src/app/services/delib-semestre.service';
import { ChooseComponent } from '../choose/choose.component';
import { AddResultsComponent } from '../add-results/add-results.component';
import { GenerateResultsComponent } from '../generate-results/generate-results.component';

@Component({
  selector: 'app-delibsemestre',
  templateUrl: './delibsemestre.component.html',
  styleUrls: ['./delibsemestre.component.css']
})
export class DelibsemestreComponent  implements AfterViewInit{
  rs: ResultatSemestre[] = []
  displayedColumns: string[] = ['CNE', 'semestreID', 'filiere', 'note_finale','statut'];
  ResultatSemestreSource: MatTableDataSource<ResultatSemestre>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isSidebarOpen: string = "open";
  search!: Event;

  constructor(private DelibSemestreService: DelibSemestreService, private route: Router, private dialog: MatDialog, private http: HttpClient, private snackBar: MatSnackBar) {


    this.ResultatSemestreSource = new MatTableDataSource(this.rs);
    // Assign the data to the data source for the table to render
    this.getData();
    this.ResultatSemestreSource = new MatTableDataSource(this.rs);


  }


  ngAfterViewInit() {
    this.ResultatSemestreSource.paginator = this.paginator;
    this.ResultatSemestreSource.sort = this.sort;

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
    this.ResultatSemestreSource.filter = filterValue.trim().toLowerCase();

    if (this.ResultatSemestreSource.paginator) {
      this.ResultatSemestreSource.paginator.firstPage();
    }
  }

  getData() {
    this.DelibSemestreService.getAllDelib()
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
        (transformedData: ResultatSemestre[]) => {
          this.rs = transformedData;
          this.rs.forEach(element=>{
            this.DelibSemestreService.getFiliereById(element.filiereID).subscribe(
              (res)=> {
                element.filiere= res.nom;
              },(err)=>{console.error(err)});
          })
          
          this.ResultatSemestreSource.data = this.rs;
          // console.log(this.rs);
          // console.log(this.ResultatSemestreSource.data.at(1))
        },
        (error) => {
          console.error('Error occurred:', error);
        }
      );
  }

  

  


  


  //open dialog si je click sur add etab button :
  openAddEtablissementDialog(): void {
    const dialogapp = this.dialog.open(ChooseComponent, {
      width: '300px', // Adjust the width as needed
    });
    dialogapp.componentInstance.chooseConfirmed.subscribe(result => {
      if (result) {
        const dialogRef = this.dialog.open(AddResultsComponent, {
          width: '700px', // Adjust the width as needed
        });
        dialogRef.afterClosed().subscribe(result => {
          this.getData();
          // You can handle any actions after the dialog is closed here
        });
      }
      else{
        const dialogRef = this.dialog.open(GenerateResultsComponent, {
          width: '700px', // Adjust the width as needed
        });
        dialogRef.afterClosed().subscribe(result => {
          this.getData();
          // You can handle any actions after the dialog is closed here
        });
      }});
  }
}

