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
import { DelebrationrattrapageService } from 'src/app/services/delebrationrattrapage.service';
import { RessultatRattrapage } from 'src/app/models/RattModel/ressultat-rattrapage';
import { ShowresultatelementComponent } from '../showresultatelement/showresultatelement.component';
import { ResultatRattrapageElement } from 'src/app/models/RattModel/resultat-rattrapage-element';
import { AddchooseComponent } from '../addchoose/addchoose.component';
import { ImportfileComponent } from '../importfile/importfile.component';
import { ManuelComponent } from '../manuel/manuel.component';
import { AppComponent } from 'src/app/app.component';
import { ExportComponent } from '../export/export.component';
import { AppchooseComponent } from '../appchoose/appchoose.component';



@Component({
  selector: 'app-resultatratt',
  templateUrl: './resultatratt.component.html',
  styleUrls: ['./resultatratt.component.css']
})
export class ResultatrattComponent implements AfterViewInit {

  delete = faTrash;
  edit = faEdit;

  resultatRattrapages: RessultatRattrapage[] = []
  displayedColumns: string[] = ['CNE', 'module', 'semestre', 'filiere','note_ordinaire','note_rattrapage','note_final','statut', 'actions'];
  ResultatRattrapageSource: MatTableDataSource<RessultatRattrapage>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isSidebarOpen: string = "open";
  search!: Event;

  constructor(private RattService: DelebrationrattrapageService, private route: Router, private dialog: MatDialog, private http: HttpClient, private snackBar: MatSnackBar) {


    this.ResultatRattrapageSource = new MatTableDataSource(this.resultatRattrapages);
    // Assign the data to the data source for the table to render
    this.getData();
    this.ResultatRattrapageSource = new MatTableDataSource(this.resultatRattrapages);


  }


  ngAfterViewInit() {
    this.ResultatRattrapageSource.paginator = this.paginator;
    this.ResultatRattrapageSource.sort = this.sort;

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
    this.ResultatRattrapageSource.filter = filterValue.trim().toLowerCase();

    if (this.ResultatRattrapageSource.paginator) {
      this.ResultatRattrapageSource.paginator.firstPage();
    }
  }

  getData() {
    this.RattService.getAllResultatModule()
      .subscribe(
        (transformedData: RessultatRattrapage[]) => {
          this.resultatRattrapages = transformedData;
          this.resultatRattrapages .forEach((element) => {
            this.RattService.getFiliereById(element.filiereID).subscribe(
              (res)=> {
                element.filiere= res.nom;
              },(err)=>{});
            this.RattService.getModuleById(element.moduleID).subscribe(
              (resr)=> {
                element.module= resr.intitule;
              },(err)=>{})

            
          });
          this.ResultatRattrapageSource.data = this.resultatRattrapages;
          // console.log(this.ressultatRattrapages);
          // console.log(this.ResultatRattrapageSource.data.at(1))
        },
        (error) => {
          console.error('Error occurred:', error);
        }
      );
  }

  rre : ResultatRattrapageElement[]=[]
  showMoreRow(row : RessultatRattrapage):void {
    this.RattService.getResultatRattByid(row.cne,row.filiereID,row.moduleID,row.semestreID).subscribe(
      (res)=>{
        this.rre=res;
        this.rre.forEach(e=>{
          this.RattService.getModuleById(e.moduleID).subscribe(
            (resr)=> {
              e.module= resr.intitule;
            },(err)=>{})
            this.RattService.getElementById(e.elementID).subscribe(
              (resr)=> {
                e.elementintitule= resr.partieCours;
              },(err)=>{})
        })
        const dialogRef = this.dialog.open(ShowresultatelementComponent, {
          data: this.rre // Pass the row data to the dialog
        });
    
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            console.log('Updated row:', result);
            this.editElemet(result,row); // Call the editEtablissement function with the updated data
          } else {
            console.log('Edit canceled');
          }
        });
      });
    
  }
  editElemet(row  : ResultatRattrapageElement[],rr : RessultatRattrapage) {
    
    row.forEach(element => {
      console.log(element)
      this.RattService.editElement(element).subscribe(
        (res)=>{
          
          
        },
        (err)=>{console.error(err)
          // this.snackBar.open('Failed to update elements', 'Close', {
          //   duration: 3000,
          //   panelClass: ['error-snackbar'],
          // });
        }
      )
    });
    this.RattService.editModule(rr).subscribe((res)=>{
      this.getData();
      this.snackBar.open('elements updated successfully', 'Close', {
        duration: 3000,
      });
    
    }
    );

    

  }

  add(){
    const dialogapp = this.dialog.open(AppchooseComponent, {
      width: '300px', // Adjust the width as needed
    });
    dialogapp.componentInstance.chooseapp.subscribe(result => {
      if (result) {
        const dialogRef = this.dialog.open(AddchooseComponent, {
          width: '300px', // Adjust the width as needed
        });
        dialogRef.componentInstance.chooseConfirmed.subscribe(result => {
          if (result) {
            const importdia = this.dialog.open(ImportfileComponent, {
              width: '300px', // Adjust the width as needed
            });
            importdia.componentInstance.deleteConfirmed.subscribe(result => {
              if (result) {
                
                
                // this.snackBar.open('Resultats added successfully', 'Close', {
                //   duration: 3000,
                // });
                location.reload();
              } else {
                this.snackBar.open('Add Canceled', 'Close', {
                  duration: 3000,
                });
                
              }
              
            });
          } else {
            const dialogRef = this.dialog.open(ManuelComponent, {
              width: '700px', // Adjust the width as needed
            });
            dialogRef.afterClosed().subscribe(result => {
              this.getData();
              console.log('The dialog was closed');
              // You can handle any actions after the dialog is closed here
            });
          }
        });
      }
      else{
        const dialogRef = this.dialog.open(ExportComponent, {
          width: '700px', // Adjust the width as needed
        });
        dialogRef.afterClosed().subscribe(result => {
          this.getData();
          console.log('The dialog was closed');
          // You can handle any actions after the dialog is closed here
        });
      }
    });
    
    
  }
}

 

  


  

