import { Component, Inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export interface Diplome{
  dateObtention: string;
  diplome: string;
  specialite: string;
  universite: string;
  etablissement: string;
  ville: string;
  mention: string;
  massar: string;
}

@Component({
  selector: 'app-ajouter-diplome',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './ajouter-diplome.component.html',
  styleUrl: './ajouter-diplome.component.css'
})
export class AjouterDiplomeComponent {
  diplome = this.formBuilder.group({
    dateObtention: [this.data.objet==null ? '': this.data.objet.dateObtention, Validators.required],
    diplome: [this.data.objet==null ? '': this.data.objet.diplome, Validators.required],
    specialite: [this.data.objet==null ? '': this.data.objet.specialite, Validators.required],
    universite: [this.data.objet==null ? '': this.data.objet.universite, Validators.required],
    etablissement: [this.data.objet==null ? '': this.data.objet.etablissement, Validators.required],
    ville: [this.data.objet==null ? '': this.data.objet.ville, Validators.required],
    mention: [this.data.objet==null ? '': this.data.objet.mention, Validators.required],
    massar: ['', Validators.required],
  });
  constructor(public dialogRef: MatDialogRef<AjouterDiplomeComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder:FormBuilder) {}
  message = this.data.message;
  
  send(): void {
    this.dialogRef.close({
      diplome:this.diplome.value
    });
  }
}
