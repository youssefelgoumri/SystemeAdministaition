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
import { Module } from 'src/app/models/ModuleModel/module';
import { Filiere } from 'src/app/models/PlanDeValidationModel/filiere';

@Component({
  selector: 'app-manuel',
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
  templateUrl: './manuel.component.html',
  styleUrls: ['./manuel.component.css']
})
export class ManuelComponent implements OnInit {
  rr:RessultatRattrapage=new RessultatRattrapage();
  rre : ResultatRattrapageElement= new ResultatRattrapageElement();
  modules:Module[]=[];
  filieres : Filiere[]=[]
  
  // toppings  = new FormControl('',Validators.required);


  @Output()  addCanceled: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()  addok: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor(private snackBar: MatSnackBar,private DelibRattService:DelebrationrattrapageService,private _formBuilder: FormBuilder,public dialogRef: MatDialogRef<ManuelComponent>) {
    this.getElemetRatt();
    this.getAllFiliere();
    this.getAllModule();
  }
  
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  isEditable = false;
  onCancel(): void {
    console.log('Delete canceled');
    this.addCanceled.emit(false); // Emit false when delete canceled
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      cne: ['', Validators.required],
      filiereID: ['', Validators.required],
      moduleID: ['', Validators.required],
      semestreID: ['', Validators.required]
    });

    this.secondFormGroup = this._formBuilder.group({});
  
  // Dynamically add form controls for each element in pvo array
  this.pvo.forEach(pv => {
    const notecoursControlName = `notecours_${pv.elementID}`;
    const notetpControlName = `notetp_${pv.elementID}`;

    // Add form controls for Note Cours and Note TP
    this.secondFormGroup.addControl(notecoursControlName, this._formBuilder.control(''));
    this.secondFormGroup.addControl(notetpControlName, this._formBuilder.control(''));
  });
  }

  
  addRR(){
    this.pvo.forEach(pv => {
      const notecoursControlName = `notecours_${pv.elementID}`;
      const notetpControlName = `notetp_${pv.elementID}`;
  
      const notecoursValue = this.secondFormGroup.get(notecoursControlName)?.value;
      const notetpValue = this.secondFormGroup.get(notetpControlName)?.value;
  
      console.log(`Element ID: ${pv.elementID}, Note Cours: ${notecoursValue}, Note TP: ${notetpValue}`);
      // Do whatever you need with the retrieved values
      this.rre.cne=this.rr.cne;
      this.rre.filiereID=this.rr.filiereID;
      this.rre.moduleID=this.rr.moduleID;
      this.rre.semestreID=this.rr.semestreID;
      this.rre.elementID=pv.elementID;
      this.rre.noteExamratt=notecoursValue;
      this.rre.noteTPratt=notetpValue;
      this.DelibRattService.addFromExcelElement(this.rre).subscribe(
        (res)=>{},
        (err)=>{console.log(err)}
      )
    });
    console.log(this.rr)
      this.DelibRattService.addFromExcel(this.rr).subscribe(
        (res)=>{
                    this.dialogRef.close();
                    this.addok.emit(true);
                    this.snackBar.open('Resultats added successfully', 'Close', {
                      duration: 3000,
                    });
          }
        ,
        (err)=>{
          this.dialogRef.close();
          this.addok.emit(false);
          this.snackBar.open('Echec add Resultats', 'Close', {
            duration: 3000,
          });
        },)
  }

  pvo :ResultatOrdinaire[] =[]
  getElemetRatt(){
    console.log(this.rr)
    this.DelibRattService.getResultatORByid(this.rr.cne,this.rr.filiereID,this.rr.moduleID,this.rr.semestreID).
    subscribe(
      (res)=>{
        this.pvo=res
        this.pvo.forEach(pv => {
          const notecoursControlName = `notecours_${pv.elementID}`;
          const notetpControlName = `notetp_${pv.elementID}`;
    
          // Add form controls for Note Cours and Note TP
          this.secondFormGroup.addControl(notecoursControlName, this._formBuilder.control(''));
          this.secondFormGroup.addControl(notetpControlName, this._formBuilder.control(''));
        });
      },
      (err)=>{}
    )
  }

  getAllFiliere(){
    this.DelibRattService.getFilieres().subscribe(
      (filiere)=>{
        this.filieres=filiere},
        (err)=>{
          console.log(err)
        }
    );
  }

  getAllModule(){
    this.DelibRattService.getModules().subscribe(
      (mod)=>{
        this.modules=mod},
        (err)=>{
          console.log(err)
        }
    );
  }

}
