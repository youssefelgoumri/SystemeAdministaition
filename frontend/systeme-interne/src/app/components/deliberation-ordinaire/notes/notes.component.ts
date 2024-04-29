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
import { Plandevalidation } from 'src/app/models/PlanDeValidationModel/plandevalidation';
import { PvserviceService } from 'src/app/services/pvservice.service';
import { AddpvComponent } from '../pv/addpv/addpv.component';
import { Module } from 'src/app/models/PlanDeValidationModel/module';
import { Filiere } from 'src/app/models/PlanDeValidationModel/filiere';
import { Element } from 'src/app/models/PlanDeValidationModel/element';
import { ShowallpvComponent } from '../pv/showallpv/showallpv.component';
import { Plandevalidationmodule } from 'src/app/models/PlanDeValidationModel/plandevalidationmodule';
import { Plandevalidationid } from 'src/app/models/PlanDeValidationModel/plandevalidationid';
import { EditpvComponent } from '../pv/editpv/editpv.component';
import { Plandevalidationmoduleid } from 'src/app/models/PlanDeValidationModel/plandevalidationmoduleid';
import { AddchooseComponent } from '../../rattrapage/addchoose/addchoose.component';
import { ImportfileComponent } from '../../rattrapage/importfile/importfile.component';
import { ImportpvfileComponent } from '../pv/importpvfile/importpvfile.component';



@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements AfterViewInit{
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

  pvs: Plandevalidation[]=[];
  pvToAdd : Plandevalidation=new Plandevalidation();
  pvToEdit : Plandevalidation=new Plandevalidation();
  selectedPV : Plandevalidation=new Plandevalidation();

  modules: any[] = []; // Initialize modules array
  //selectedModuleId!: string; // Variable to hold the selected module's moduleId
  newModule: Module = new Module();

  displayedColumns: string[] = ['CNE', 'semestre', 'filiereNom','moduleIntitule' ,'partieCours','noteExam','noteTP','noteFinale','resultat',  'actions'];
  PlanDeValidationSource: MatTableDataSource<Plandevalidation>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  isSidebarOpen: string = "open";
  search!: Event;

  constructor(private PvService:PvserviceService,private router: Router, private dialog: MatDialog,private route:Router,private snackBar: MatSnackBar) {
    this.PlanDeValidationSource = new MatTableDataSource(this.pvs);
    

    // Assign the data to the data source for the table to render
    this.getData();
    this.PlanDeValidationSource = new MatTableDataSource(this.pvs);
    console.log(this.pvs)
    console.log(this.PlanDeValidationSource)
    
    this.isSidebarOpen="open";
    
    this.getModuleData();

  }
  
  ngAfterViewInit() {
    this.PlanDeValidationSource.paginator = this.paginator;
    this.PlanDeValidationSource.sort = this.sort;
  }


  onSidebarToggle(isOpen: string) {
    this.isSidebarOpen = isOpen;
  }

  applyFilter(event: Event) {
    this.search=event;
    const filterValue = (this.search.target as HTMLInputElement).value;
    this.PlanDeValidationSource.filter = filterValue.trim().toLowerCase();

    if (this.PlanDeValidationSource.paginator) {
      this.PlanDeValidationSource.paginator.firstPage();
    }
    
  }

  getData() {
    this.PvService.getAllPVs()
      .subscribe(
        (data) => {
          this.pvs = data;
          this.enrichPvsWithModuleIntitule();
          this.enrichPvsWithFiliereNom();
          this.enrichPvsWithElementName();
          
          this.PlanDeValidationSource.data = this.pvs;
          console.log(this.pvs);
          // console.log(this.PlanDeValidationSource.data.at(1))
        },
        (error) => {
          console.error('Error occurred:', error);
        }
      );
  }


  getModuleData() {
    this.PvService.getAllModules()
      .subscribe(
        (data) => {
          this.modules = data; // Assign fetched data to modules array
          console.log(this.modules);
        },
        (error) => {
          console.error('Error occurred:', error);
        }
      );
  }
  

  enrichPvsWithModuleIntitule() {
    // Iterate over each item in the pvs array
    this.pvs.forEach((pv: Plandevalidation) => {
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
    this.pvs.forEach((pv: Plandevalidation) => {
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

  enrichPvsWithElementName() {
    // Iterate over each item in the pvs array
    this.pvs.forEach((pv: Plandevalidation) => {
      // Fetch module data for each moduleID
      this.PvService.getElementById(pv.elementID).subscribe(
        (elementData : Element) => {
          pv.partieCours = elementData ? elementData.partieCours : '';
        },
        (error: any) => {
          console.error('Error occurred while fetching element:', error);
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


  deletePlanDeValidation(row: Plandevalidation){
    this.PvService.deletePlanDeValidation(row.id).subscribe(() => {
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
    const dialogRef = this.dialog.open(AddpvComponent, {
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



  addPlanDeValidation(newPV : Plandevalidation) : any{
    

    this.PvService.addPlanDeValidation(newPV).subscribe(
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


  


  openPVModule() : void {
    this.router.navigate(['/showallpvmodule']).then(() => {
      // Reload the page to ensure table gets updated
      window.location.reload();
   });

  }



  exporterPVtoexcel(): any{
    this.PvService.toexcel().subscribe((data: Blob) => {
      // Create a Blob object from the binary response
      const file = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
      // Create a download link for the Blob
      const downloadLink = document.createElement('a');
      const objectUrl = URL.createObjectURL(file);
  
      // Set the download link's href attribute to the Blob's object URL
      downloadLink.href = objectUrl;
      downloadLink.download = 'ResultatOrdinaire.xlsx'; // Set the desired file name
      
      // Append the download link to the body and click it programmatically
      document.body.appendChild(downloadLink);
      downloadLink.click();
  
      // Clean up
      URL.revokeObjectURL(objectUrl);
      document.body.removeChild(downloadLink);
    });
  }

  pve : Plandevalidation = new Plandevalidation();
  pvm : Plandevalidationmodule = new Plandevalidationmodule();
  pid : Plandevalidationid = new Plandevalidationid();
  pmid : Plandevalidationmoduleid = new Plandevalidationmoduleid();

  showMoreRow(row : Plandevalidation):void {
    this.pid.cne = row.cne;
    this.pid.filiereID = row.filiereID;
    this.pid.moduleID = row.moduleID;
    this.pid.semestreID = row.semestreID;
    this.pid.elementID = row.elementID;

    this.pmid.cne = row.cne;
    this.pmid.filiereID = row.filiereID;
    this.pmid.moduleID = row.moduleID;
    this.pmid.semestreID = row.semestreID;

    this.pvm.id = this.pmid;

    this.PvService.getPlanDeValidationModule(this.pmid).subscribe(
      (res : any)=>{
        this.pvm=res;
        console.log(this.pvm);
      });



    console.log(this.pid)

    this.PvService.getPlanDeValidation(this.pid).subscribe(
      (res : any)=>{
        this.pve=res;
          this.PvService.getModuleById(row.moduleID).subscribe(
            (respv : Module)=> {
              this.pve.moduleIntitule= respv.intitule;
            },(err : any)=>{})
            this.PvService.getElementById(row.elementID).subscribe(
              (rese : Element)=> {
                this.pve.partieCours= rese.partieCours;
              },(err : any)=>{})
        
        console.log(this.pve);
        
        const dialogRef = this.dialog.open(EditpvComponent, {
          data: this.pve // Pass the row data to the dialog
        });
    
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            console.log('Updated row:', result);
            this.editElemet(result,this.pvm); // Call the editEtablissement function with the updated data
          } else {
            console.log('Edit canceled');
          }
        });
      });
    
  }


  editElemet(row  : Plandevalidation,pvm : Plandevalidationmodule) {
    
    
      this.PvService.editPlanDeValidation(row).subscribe(
        (res)=>{
          
          
        },
        (err)=>{console.error(pvm)
          // this.snackBar.open('Failed to update elements', 'Close', {
          //   duration: 3000,
          //   panelClass: ['error-snackbar'],
          // });
        }
      );
      this.snackBar.open('Notes updated successfully', 'Close', { duration: 1500 });

      setTimeout(() => {
        this.PvService.editPlanDeValidationModule(pvm).subscribe((res)=>{
          this.getData();
        }
        );
        window.location.reload();
      }, 1500);

  }



  add(){
    
        const dialogRef = this.dialog.open(AddchooseComponent, {
          width: '300px', // Adjust the width as needed
        });
        dialogRef.componentInstance.chooseConfirmed.subscribe(result => {
          if (result) {
            const importdia = this.dialog.open(ImportpvfileComponent, {
              width: '300px', // Adjust the width as needed
            });
            importdia.componentInstance.deleteConfirmed.subscribe(result => {
              if (result) {
                
                
                // this.snackBar.open('Resultats added successfully', 'Close', {
                //   duration: 3000,
                // });
                //this.getData();

                setTimeout(() => {
                  this.getData();

                  window.location.reload();
                }, 2000);

                //location.reload();
              } else {
                this.snackBar.open('Add Canceled', 'Close', {
                  duration: 3000,
                });
                
              }
              
            });
          } else {
            const dialogRef = this.dialog.open(AddpvComponent, {
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
