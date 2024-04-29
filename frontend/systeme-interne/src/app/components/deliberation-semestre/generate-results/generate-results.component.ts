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

@Component({
  selector: 'app-generate-results',
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
  templateUrl: './generate-results.component.html',
  styleUrls: ['./generate-results.component.css']
})
export class GenerateResultsComponent implements OnInit {
  rs:ResultatSemestre=new ResultatSemestre();
  
  // toppings  = new FormControl('',Validators.required);


  @Output()  addCanceled: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()  addok: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private snackBar: MatSnackBar,private DelibSemestreService:DelibSemestreService,private _formBuilder: FormBuilder,public dialogRef: MatDialogRef<GenerateResultsComponent>) {
    
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
      
      cne: ['', Validators.required],
      semestreID: ['', Validators.required]
    });
    
  }
  addRS(){
    this.DelibSemestreService.semestretoexcel(this.rs.cne,this.rs.semestreID)
    .subscribe((data: Blob) => {
      // Create a Blob object from the binary response
      const file = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
      // Create a download link for the Blob
      const downloadLink = document.createElement('a');
      const objectUrl = URL.createObjectURL(file);

      // Set the download link's href attribute to the Blob's object URL
      downloadLink.href = objectUrl;
      downloadLink.download = 'ResultatModuleSemestre'+this.rs.cne+"_"+this.rs.semestreID+"_"+'.xlsx'; // Set the desired file name
      
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
