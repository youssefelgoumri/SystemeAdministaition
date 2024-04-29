import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AddElementComponent } from '../add-element/add-element.component';

export interface Responsable{
  id: number;
  nom: string ;
  prenom: string ;
}

export interface Element{
  id: number;
  partieCours: string;
  partieTPs: string;
  coefficientCours: number;
  coefficientTPs: number;
  controbution: number;
}

@Component({
  selector: 'app-add-module',
  standalone: true,
  imports: [ CommonModule, MatSelectModule, MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './add-module.component.html',
  styleUrl: './add-module.component.css'
})
export class AddModuleComponent {
  element: Element[] = [];
  module = this.formBuilder.group({
    intitule: ['', Validators.required],
    responsable: [null, Validators.required],
    contributionTP: ['', Validators.required],
    contributionCours: ['', Validators.required],
    element: [this.element, Validators.required]
  });
  responsables!: Responsable[];
  addElementIsClicked: boolean = false;
  enregistrerIsClicked: boolean = false;
  el!: Element;

  constructor(public dialogRef: MatDialogRef<AddModuleComponent>, @Inject(MAT_DIALOG_DATA) public message: string, private formBuilder:FormBuilder, private http: HttpClient, private elementDialog: MatDialog) {
    http.get<Responsable[]>('http://localhost:2222/SERVICE-MODULE/responsables').subscribe(
      (responsables) => {
        this.responsables = responsables;
      },
      (error) => {
        console.error('Une erreur s\'est produite lors du chargement des responsables :', error);
      }
    );
  }
  
  send(): void {
    if (this.enregistrerIsClicked){
      this.dialogRef.close({ module:this.module.value });
    }
      
    this.enregistrerIsClicked = true;
  }

  add(): void {
    this.addElementIsClicked = true;
    this.enregistrerIsClicked = true;
    const dialogRef = this.elementDialog.open(AddElementComponent, {
      width: '50%',
      data: 'Veuillez remplir tous les champs'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result){
            this.element.push(result.element);
            this.module.patchValue({ element: this.element });
      }
    });
  }
}
