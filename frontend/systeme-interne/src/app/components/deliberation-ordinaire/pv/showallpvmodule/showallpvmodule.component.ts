import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';
import {map} from "rxjs";
import {faEdit, faSearch, faTrash} from "@fortawesome/free-solid-svg-icons";
import { MatSnackBar } from '@angular/material/snack-bar';
//import { DeletedialogComponent } from '../deletedialog/deletedialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Etablissement } from 'src/app/models/ProfModel/etablissement';
import { PvserviceService } from 'src/app/services/pvservice.service';
import { AddpvmoduleComponent } from '../addpvmodule/addpvmodule.component';
import { Plandevalidationmodule } from 'src/app/models/PlanDeValidationModel/plandevalidationmodule';
import { Module } from 'src/app/models/PlanDeValidationModel/module';
import { Filiere } from 'src/app/models/PlanDeValidationModel/filiere';
import { Element } from 'src/app/models/PlanDeValidationModel/element';
import { Plandevalidation } from 'src/app/models/PlanDeValidationModel/plandevalidation';


@Component({
  selector: 'app-showallpvmodule',
  templateUrl: './showallpvmodule.component.html',
  styleUrls: ['./showallpvmodule.component.css']
})
export class ShowallpvmoduleComponent implements AfterViewInit{
  db:boolean=false;
  dc:boolean=false;
  dg:boolean=false;
  di:boolean=false;
  dm:boolean=false;
  dp:boolean=false;


  isFormPopupOpen: boolean = false;
  isdisciplinaireOpenEdit : boolean =false;
  
  displayStyle = "none";
  isFormPopupOpenEdit : boolean = false;
  isFormPopupOpenShowMore : boolean = false;

  pvs: Plandevalidationmodule[]=[];
  pvToAdd : Plandevalidationmodule=new Plandevalidationmodule();
  pvToEdit : Plandevalidationmodule=new Plandevalidationmodule();
  selectedPV : Plandevalidationmodule=new Plandevalidationmodule();

  displayedColumns: string[] = ['CNE', 'semestre', 'filiereNom','moduleIntitule' , 'elements', 'noteselements','noteFinale','resultat', 'exporter'];
  PlandevalidationmoduleSource: MatTableDataSource<Plandevalidationmodule>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  isSidebarOpen: string = "open";
  search!: Event;

  constructor(private PvService:PvserviceService, private dialog: MatDialog,private route:Router,private snackBar: MatSnackBar) {
    this.PlandevalidationmoduleSource = new MatTableDataSource(this.pvs);

    // Assign the data to the data source for the table to render
    this.getData();
    this.PlandevalidationmoduleSource = new MatTableDataSource(this.pvs);

    this.isSidebarOpen="open";
    


  }
  
  ngAfterViewInit() {
    this.PlandevalidationmoduleSource.paginator = this.paginator;
    this.PlandevalidationmoduleSource.sort = this.sort;
  }


  onSidebarToggle(isOpen: string) {
    this.isSidebarOpen = isOpen;
  }

  applyFilter(event: Event) {
    this.search=event;
    const filterValue = (this.search.target as HTMLInputElement).value;
    this.PlandevalidationmoduleSource.filter = filterValue.trim().toLowerCase();

    if (this.PlandevalidationmoduleSource.paginator) {
      this.PlandevalidationmoduleSource.paginator.firstPage();
    }
    
  }

  getData() {
    this.PvService.getAllPVsModule()
      .subscribe(
        (data) => {
          this.pvs = data;
          this.enrichPvsWithModuleIntitule();
          this.enrichPvsWithFiliereNom();
          //this.enrichPvmWithElements();
          this.enrichPvsWithElements();
          
          this.PlandevalidationmoduleSource.data = this.pvs;
          console.log(this.pvs);
          // console.log(this.PlanDeValidationSource.data.at(1))
        },
        (error) => {
          console.error('Error occurred:', error);
        }
      );
  }

  enrichPvsWithModuleIntitule() {
    // Iterate over each item in the pvs array
    this.pvs.forEach((pv: Plandevalidationmodule) => {
      // Fetch module data for each moduleID
      this.PvService.getModuleById(pv.moduleID).subscribe(
        (moduleData : Module) => {
          pv.moduleIntitule = moduleData ? moduleData.intitule : '';
        },
        (error: any) => {
          console.error('Error occurred while fetching module:', error);
        }
      );
    });
  }

  enrichPvsWithFiliereNom() {
    // Iterate over each item in the pvs array
    this.pvs.forEach((pv: Plandevalidationmodule) => {
      // Fetch module data for each moduleID
      this.PvService.getFiliereById(pv.filiereID).subscribe(
        (filiereData : Filiere) => {
          pv.filiereNom = filiereData ? filiereData.nom : '';
        },
        (error: any) => {
          console.error('Error occurred while fetching filiere:', error);
        }
      );
    });
  }

  //we will not use this anymore
  enrichPvmWithElements() {
    
    // Iterate over each item in the pvs array
    this.pvs.forEach((pv: Plandevalidationmodule) => {
      // Fetch module data for each moduleID
      this.PvService.getElementsOfModule(pv.moduleID).subscribe(
        (elementData : Element[]) => {
          pv.elements = elementData ? elementData : [];
          console.log(pv.elements);

        },
        (error: any) => {
          console.error('Error occurred while fetching filiere:', error);
        }
      );
    });
  }

  enrichPvsWithElements() {
    // Iterate over each item in the pvs array
    this.pvs.forEach((pv: Plandevalidationmodule) => {
      // Fetch module data for each moduleID
      this.PvService.getallPVElementsByPVid(pv).subscribe(
        (pvsData : Plandevalidation[]) => {
          pv.planDeValidationsElements = pvsData ? pvsData : [];
          console.log("pv");

          console.log(pv);

          
          pv.planDeValidationsElements.forEach((pvelt: Plandevalidation) => {
            // Fetch module data for each moduleID
            this.PvService.getElementById(pvelt.elementID).subscribe(
              (elementData : Element) => {
                pvelt.partieCours = elementData ? elementData.partieCours : '';
              },
              (error: any) => {
                console.error('Error occurred while fetching element:', error);
              }
            );

          });

          console.log(pv);


        },
        (error: any) => {
          console.error('Error occurred while fetching elements:', error);
        }
      );
    });
  }

  


  Close(){
    this.isFormPopupOpenShowMore = false;
    this.displayStyle = "none";
    this.getData();
    this.db=false;
    this.dc=false;
    this.dg=false;
    this.di=false;
    this.dm=false;
    this.dp=false;
  }

  /*deleteRow(row: Plandevalidation){
    this.openDeleteConfirmationDialog(row);
  }
  private openDeleteConfirmationDialog(row: Plandevalidation): void {
    const dialogRef = this.dialog.open(DeletedialogComponent, {
      data: { row } // Pass the row object as data to the dialog component
    });
    dialogRef.componentInstance.deleteConfirmed.subscribe(result => {
      if (result) { // Check if result is true (delete confirmed)
        console.log('Delete row:', row);
        this.deleteProf(row);
      } else {
        console.log('Deletion canceled');
      }
    });

  }*/


  deletePlanDeValidation(row: Plandevalidationmodule){
    this.PvService.deletePlanDeValidationModule(row.id).subscribe(() => {
      this.getData(); // Update the table data
      this.snackBar.open('Professor deleted successfully', 'Close', {
        duration: 3000,
      });
    },
    (error) => {
      console.error('Error occurred:', error);
      this.snackBar.open('Failed to delete professor', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
      });
    });
  }
















  closeFormPopupEdit(){
    this.isFormPopupOpenEdit = false;
    this.displayStyle = "none";
    //this.getData();
    this.db=false;
    this.dc=false;
    this.dg=false;
    this.di=false;
    this.dm=false;
    this.dp=false;
    //this.passwordsMatch=true;
  }


  openAddPVDialog() : void {
    const dialogRef = this.dialog.open(AddpvmoduleComponent, {
      width: '700px', // Adjust the width as needed
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // You can handle any actions after the dialog is closed here
    });

  }

  closeFormPopup() {
    this.isFormPopupOpen = false;
    this.displayStyle = "none";
    //this.passwordsMatch=true;
  }



  addPlanDeValidation(newPV : Plandevalidationmodule) : any{
    

    this.PvService.addPlanDeValidationModule(newPV).subscribe(
      data=>{
        this.getData();
        this.snackBar.open('PV added successfully', 'Close', { duration: 1500 });

      },
      error => {

        console.error('Error occurred:', error);
        this.snackBar.open('Failed to add pv', 'Close', { duration: 1500, panelClass: ['error-snackbar'] });

      }

    );
  }






  exporterPVtoexcel(moduleId : number): any{

    let module:Module = new Module();
      this.PvService.getModuleById(moduleId).subscribe(
        (data : Module) => {
          module = data; // Assign fetched data to modules array
          console.log(module);
        },
        (error: any) => {
          console.error('Error occurred:', error);
        }
      );


    this.PvService.moduletoexcel(moduleId).subscribe((data: Blob) => {
      // Create a Blob object from the binary response
      const file = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
      // Create a download link for the Blob
      const downloadLink = document.createElement('a');
      const objectUrl = URL.createObjectURL(file);

      // Set the download link's href attribute to the Blob's object URL
      downloadLink.href = objectUrl;
      downloadLink.download = 'ResultatOrdinaire'+module.intitule+'.xlsx'; // Set the desired file name
      
      // Append the download link to the body and click it programmatically
      document.body.appendChild(downloadLink);
      downloadLink.click();
  
      // Clean up
      URL.revokeObjectURL(objectUrl);
      document.body.removeChild(downloadLink);
    });
  }

  
  
}

