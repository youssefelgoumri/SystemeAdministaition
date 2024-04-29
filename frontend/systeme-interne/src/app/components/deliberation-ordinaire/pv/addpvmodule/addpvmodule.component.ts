import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatStep, MatStepper, MatStepperModule} from "@angular/material/stepper";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import { Plandevalidationmodule } from 'src/app/models/PlanDeValidationModel/plandevalidationmodule';
import { Plandevalidationmoduleid } from 'src/app/models/PlanDeValidationModel/plandevalidationmoduleid';
import { PvserviceService } from 'src/app/services/pvservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotesComponent } from '../../notes/notes.component';
import { ShowallpvComponent } from '../showallpv/showallpv.component';
import { Module } from 'src/app/models/PlanDeValidationModel/module';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { Filiere } from 'src/app/models/PlanDeValidationModel/filiere';





@Component({
  selector: 'app-addpvmodule',
  standalone: true,
  imports: [
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CommonModule,

  ],
  templateUrl: './addpvmodule.component.html',
  styleUrls: ['./addpvmodule.component.css']
})
export class AddpvmoduleComponent implements OnInit{
  

  @Output()  addCanceled: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private PvService:PvserviceService,private _formBuilder: FormBuilder, private router: Router,public dialogRef: MatDialogRef<AddpvmoduleComponent>,private snackBar: MatSnackBar) {}
  firstFormGroup = this._formBuilder.group({
    moduleId: ['', Validators.required],
    cne: ['', Validators.required],
    filiereID: ['', Validators.required],
    semestreID: ['', Validators.required]
  });
  secondFormGroup = this._formBuilder.group({
    elementId: ['', Validators.required],
  });
  

  pv = new Plandevalidationmodule();
  pvid = new Plandevalidationmoduleid();

  modules: any[] = []; // Initialize modules array
  //selectedModuleId!: string; // Variable to hold the selected module's moduleId
  newModule: Module = new Module();

  filieres: any[] = []; // Initialize modules array
  newFiliere: Filiere = new Filiere();
  


  ngOnInit(): void {
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

      this.PvService.getAllFilieres()
      .subscribe(
        (data) => {
          this.filieres = data; // Assign fetched data to modules array
          console.log(this.filieres);
        },
        (error) => {
          console.error('Error occurred:', error);
        }
      );
  }
  


  
  isEditable = false;
  onCancel(): void {
    console.log('Delete canceled');
    this.addCanceled.emit(false); // Emit false when delete canceled
    this.dialogRef.close();
  }


  saveModuleData(){
    const moduleData = this.firstFormGroup.value;
    console.log(moduleData);
    this.pvid.cne = String(moduleData.cne);
    this.pvid.semestreID = String(moduleData.semestreID);
    this.pvid.filiereID = Number(moduleData.filiereID);
    this.pvid.moduleID = Number(moduleData.moduleId);
    console.log(this.pvid);

    this.pv.cne = String(moduleData.cne);
    this.pv.semestreID = String(moduleData.semestreID);
    this.pv.filiereID = Number(moduleData.filiereID);
    this.pv.moduleID = Number(moduleData.moduleId);

    this.pv.id = this.pvid;

  }


  send(){
    console.log(this.pv);

    this.pv = this.addPlanDeValidationModule(this.pv);

  }

  closeStepperAndFormGroups() {
    console.log('Done');
    this.addCanceled.emit(false); // Emit false when delete canceled
    this.dialogRef.close();

    this.router.navigate(['/showallpvmodule']).then(() => {
      // Reload the page to ensure table gets updated
      window.location.reload();
  });
  }


  addPlanDeValidationModule(newPV : Plandevalidationmodule) : any{
    

    this.PvService.addPlanDeValidationModule(newPV).subscribe(
      data=>{
        this.pv=data;
        console.log(this.pv);
        if(this.pv == null){
          this.snackBar.open('Module missing notes of elements', 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
    
          setTimeout(() => {
            console.log('Done');
              this.addCanceled.emit(false); // Emit false when delete canceled
              this.dialogRef.close();
    
              this.router.navigate(['/notes']).then(() => {
                // Reload the page to ensure table gets updated
                window.location.reload();
            });
        }, 3000);
    
        }
        else{
          this.snackBar.open('Note added successfully', 'Close', { duration: 1500 });

          setTimeout(() => {
            this.closeStepperAndFormGroups();
          }, 1500);

    
        }
      },
      error => {

        this.snackBar.open('Failed to add note', 'Close', { duration: 1500, panelClass: ['error-snackbar'] });

      }

    );
  }
  


}
