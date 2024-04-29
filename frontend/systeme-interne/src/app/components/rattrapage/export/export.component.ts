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
import { Module } from 'src/app/models/ModuleModel/module';
import { Filiere } from 'src/app/models/PlanDeValidationModel/filiere';

@Component({
  selector: 'app-export',
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
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent {
  rr:RessultatRattrapage=new RessultatRattrapage();
  @Output()  addCanceled: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()  addok: EventEmitter<boolean> = new EventEmitter<boolean>();
  isEditable = false;
  modules:Module[]=[];
  filieres : Filiere[]=[]

  constructor(private snackBar: MatSnackBar,private DelibRattService:DelebrationrattrapageService,private _formBuilder: FormBuilder,public dialogRef: MatDialogRef<ExportComponent>) {
    this.getAllFiliere();
    this.getAllModule();
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

  firstFormGroup!: FormGroup;
  onCancel(): void {
    console.log('Delete canceled');
    this.addCanceled.emit(false); // Emit false when delete canceled
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      filiereID: ['', Validators.required],
      moduleID: ['', Validators.required],
      semestreID: ['', Validators.required]
    });
  }
  Export(){
    this.DelibRattService.moduletoexcel(this.rr.filiereID,this.rr.moduleID,this.rr.semestreID)
    .subscribe((data: Blob) => {
      // Create a Blob object from the binary response
      const file = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
      // Create a download link for the Blob
      const downloadLink = document.createElement('a');
      const objectUrl = URL.createObjectURL(file);

      // Set the download link's href attribute to the Blob's object URL
      downloadLink.href = objectUrl;
      downloadLink.download = 'ResultatRatt'+this.rr.filiereID+"_"+this.rr.moduleID+"_"+this.rr.semestreID+'.xlsx'; // Set the desired file name
      
      // Append the download link to the body and click it programmatically
      document.body.appendChild(downloadLink);
      downloadLink.click();
  
      // Clean up
      URL.revokeObjectURL(objectUrl);
      document.body.removeChild(downloadLink);
      this.dialogRef.close();
      this.addok.emit(true);
      this.snackBar.open('Generate successfully', 'Close', {
        duration: 3000,
      });
    },
    (err)=>{
      this.dialogRef.close();
      this.addok.emit(false);
      this.snackBar.open('Echec Generate', 'Close', {
        duration: 3000,
      });
    }

    );
    
  }
}
