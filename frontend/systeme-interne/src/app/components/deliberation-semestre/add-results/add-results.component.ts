import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatStep, MatStepper, MatStepperModule} from "@angular/material/stepper";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import { Router } from 'express';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DelebrationrattrapageService } from 'src/app/services/delebrationrattrapage.service';
import { RessultatRattrapage } from 'src/app/models/RattModel/ressultat-rattrapage';
import { ResultatRattrapageElement } from 'src/app/models/RattModel/resultat-rattrapage-element';
import { ResultatOrdinaire } from 'src/app/models/RattModel/resultat-ordinaire';
import { error } from 'jquery';
import { ResultatSemestre } from 'src/app/models/SemestreDelibModel/resultat-semestre';
import { DelibSemestreService } from 'src/app/services/delib-semestre.service';
import { Module } from 'src/app/models/ModuleModel/module';
import { Filiere } from 'src/app/models/PlanDeValidationModel/filiere';

@Component({
  selector: 'app-add-results',
  standalone: true,
  imports: [
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatSelectModule
  ],
  templateUrl: './add-results.component.html',
  styleUrls: ['./add-results.component.css']
})
export class AddResultsComponent implements OnInit {
  rs:ResultatSemestre=new ResultatSemestre();
  
  // toppings  = new FormControl('',Validators.required);
  // modules:Module[]=[];
  filieres : Filiere[]=[]

  @Output()  addCanceled: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()  addok: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor(private snackBar: MatSnackBar,private DelibSemestreService:DelibSemestreService,private _formBuilder: FormBuilder,public dialogRef: MatDialogRef<AddResultsComponent>) {
    this.getAllFiliere();
    // this.getAllModule();
  }
  
  
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  isEditable = false;
  onCancel(): void {
    // console.log('Delete canceled');
    this.addCanceled.emit(false); // Emit false when delete canceled
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      
      filiereID: ['', Validators.required],
      semestreID: ['', Validators.required]
    });
    
  }
  addRS(){
    this.DelibSemestreService.getResult(this.rs).subscribe(
      (res)=>{
        this.dialogRef.close();
        this.snackBar.open('Results added successfully', 'Close', {
          duration: 3000,
        });
      },
      (err)=>{
        this.dialogRef.close();
        this.snackBar.open('Failed added', 'Close', {
          duration: 3000,
        });
      }
    )
  }

  getAllFiliere(){
    this.DelibSemestreService.getFilieres().subscribe(
      (filiere)=>{
        this.filieres=filiere},
        (err)=>{
          console.log(err)
        }
    );
  }

 

}
