import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {Router} from "@angular/router";
import {AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatStep, MatStepper, MatStepperModule} from "@angular/material/stepper";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import { Plandevalidation } from 'src/app/models/PlanDeValidationModel/plandevalidation';
import { Plandevalidationid } from 'src/app/models/PlanDeValidationModel/plandevalidationid';
import { PvserviceService } from 'src/app/services/pvservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { Module } from 'src/app/models/PlanDeValidationModel/module';
import { CommonModule } from '@angular/common';
import { Element } from 'src/app/models/PlanDeValidationModel/element';
import { Filiere } from 'src/app/models/PlanDeValidationModel/filiere';
import { Semestre } from 'src/app/models/PlanDeValidationModel/semestre';




@Component({
  selector: 'app-addpv',
  standalone: true,
  imports: [
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    CommonModule,

  ],
  templateUrl: './addpv.component.html',
  styleUrls: ['./addpv.component.css']
})
export class AddpvComponent implements OnInit{
  


  @Output()  addCanceled: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private PvService:PvserviceService,private _formBuilder: FormBuilder, private router: Router ,public dialogRef: MatDialogRef<AddpvComponent>,private snackBar: MatSnackBar) {}
  firstFormGroup = this._formBuilder.group({
    moduleId: ['', Validators.required],
    cne: ['', Validators.required],
    filiereID: ['', Validators.required],
    semestreID: ['', Validators.required]
  });
  secondFormGroup = this._formBuilder.group({
    elementId: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    noteExam: ['', [Validators.required, this.validateNote]],
    noteTP: ['', [Validators.required, this.validateNote]]
  });

  pv = new Plandevalidation();
  pvid = new Plandevalidationid();

  modules: any[] = []; // Initialize modules array
  //selectedModuleId!: string; // Variable to hold the selected module's moduleId
  newModule: Module = new Module();

  elements: any[] = []; // Initialize modules array
  newElement: Element = new Element();

  filieres: any[] = []; // Initialize modules array
  newFiliere: Filiere = new Filiere();

  semestres: any[] = []; // Initialize modules array
  newSemestre: Semestre = new Semestre();

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
    this.getElements();
  }


  getElements(){
    this.PvService.getElementsOfModule(this.pvid.moduleID)
      .subscribe(
        (data) => {
          this.elements = data; // Assign fetched data to modules array
          console.log(this.elements);
        },
        (error) => {
          console.error('Error occurred:', error);
        }
      );
  }

  saveElementData(){
    const elementData = this.secondFormGroup.value;
    console.log(elementData);
    this.pvid.elementID = Number(elementData.elementId);
    this.pv.elementID = Number(elementData.elementId);
    this.pv.id=this.pvid;
  }

  validateNote(control: AbstractControl): { [key: string]: boolean } | null {
    const note = control.value;
    if (isNaN(note) || note < 0 || note > 20) {
      return { 'invalidNote': true };
    }
    return null;
  }

  send(){
    const notes = this.thirdFormGroup.value;
    console.log(notes);
    this.pv.noteExam=Number(notes.noteExam);
    this.pv.noteTP=Number(notes.noteTP);
    console.log(this.pv);
    console.log(notes.noteExam);

    if (notes.noteTP!="" && this.pv.noteTP >= 0 && this.pv.noteTP <= 20 && notes.noteExam!="" && this.pv.noteExam >= 0 && this.pv.noteExam <= 20) {
      this.pv = this.addPlanDeValidation(this.pv);
      this.closeStepperAndFormGroups();
    }
    else{
      this.snackBar.open('Failed to add note', 'Close', { duration: 1500, panelClass: ['error-snackbar'] });

    }


  }

  closeStepperAndFormGroups() {
    console.log('Done');
    this.addCanceled.emit(false); // Emit false when delete canceled
    this.dialogRef.close();

    this.router.navigate(['/notes']).then(() => {
      // Reload the page to ensure table gets updated
      window.location.reload();
  });
  }


  addPlanDeValidation(newPV : Plandevalidation) : any{
    

    this.PvService.addPlanDeValidation(newPV).subscribe(
      data=>{
        this.snackBar.open('Note added successfully', 'Close', { duration: 1500 });

      },
      error => {

        this.snackBar.open('Failed to add note', 'Close', { duration: 1500, panelClass: ['error-snackbar'] });

      }

    );
  }


}
