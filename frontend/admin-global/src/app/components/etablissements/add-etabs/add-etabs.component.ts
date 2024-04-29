import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatStep, MatStepper, MatStepperModule} from "@angular/material/stepper";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import { EtablissementService } from 'src/app/services/EtablissementServices/etablissement.service';
import { Router } from 'express';
import { Etablissement } from 'src/app/models/etablissementModel/etablissement';
import { Filiere } from 'src/app/models/etablissementModel/FiliereModel/filiere';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-etabs',
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
  templateUrl: './add-etabs.component.html',
  styleUrl: './add-etabs.component.css'
})
export class AddEtabsComponent {

  etablissement:Etablissement=new Etablissement();
  filieres : Filiere[]=[];
  
  // toppings  = new FormControl('',Validators.required);


  @Output()  addCanceled: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private snackBar: MatSnackBar,private EtabService:EtablissementService,private _formBuilder: FormBuilder,public dialogRef: MatDialogRef<AddEtabsComponent>) {
    this.getAllfiliere();
    // console.log(this.affecteFiliereToetabe())
    // this.toppingList.
  }
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    // secondCtrl: ['', Validators.required],
    toppings: ['', Validators.required]
  });
  isEditable = false;
  onCancel(): void {
    console.log('Delete canceled');
    this.addCanceled.emit(false); // Emit false when delete canceled
    this.dialogRef.close();
  }

  getAllfiliere(){
    this.EtabService.getAllfiliere().subscribe(
      (res)=>{
        this.filieres=res
        console.log(this.filieres)
      },
      (err)=>{});
  }

  addEtablissement(){
    const selectedItems = this.secondFormGroup.controls.toppings.value;

      this.EtabService.addEtab(this.etablissement).subscribe(
        (res)=>{
          this.etablissement=res;
          this.filieres.forEach(item => {
            if(selectedItems!=null){
              if(selectedItems.includes(item.nom)){
                this.EtabService.affectFiliereToEtab(this.etablissement.codeName, item.id).subscribe(
                  (res)=>{
                    this.dialogRef.close();
                    this.snackBar.open('Etablissement added successfully', 'Close', {
                      duration: 3000,
                    });
                  },
                  (err)=>{console.log("error")
                  this.snackBar.open('Echec affect filieres', 'Close', {
                    duration: 3000,
                  });
                }
                );
                
              }
            }
          });


        },
        (err)=>{
          this.snackBar.open('Echec add etab', 'Close', {
            duration: 3000,
          });
        },)
  }

}
