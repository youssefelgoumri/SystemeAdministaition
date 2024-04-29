import { Component, OnInit } from '@angular/core';
import {MatDialogActions, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { FiliereService } from "../../../services/filieres/filiere-service.service";
import { ResponsableFiliereService } from '../../../services/filieres/responsable/responsable.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-add',
  standalone: true,
    imports: [
        MatDialogActions ,
       MatDialogModule,
      ReactiveFormsModule,
      CommonModule
    ],
  templateUrl: './dialog-add.component.html',
  styleUrl: './dialog-add.component.css'
})
export class DialogAddComponent {
  filiereForm!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<DialogAddComponent>,
    private fb: FormBuilder,
    private filiereService: FiliereService,
    private responsableService: ResponsableFiliereService
  ){}
  ngOnInit(): void {
    this.filiereForm = this.fb.group({
      nom: ['', Validators.required],
      nombreAnnees: ['', Validators.required],
      nombreSemestresParAnnee: ['', Validators.required],
      nomResponsable: ['', Validators.required],
      prenomResponsable: ['', Validators.required],
      semestres: this.fb.array([])
    });
  }

  get semestres(): FormArray {
    return this.filiereForm.get('semestres') as FormArray;
  }

  addSemestre(): void {
    this.semestres.push(this.fb.group({
      nomSemestre: ['', Validators.required],
      modulesIds: this.fb.array([])
    }));
  }

  removeSemestre(index: number): void {
    this.semestres.removeAt(index);
  }

  addModule(semestreIndex: number): void {
    const modules = this.semestres.at(semestreIndex).get('modulesIds') as FormArray;
    modules.push(this.fb.control(''));
  }

  removeModule(semestreIndex: number, moduleIndex: number): void {
    const modules = this.semestres.at(semestreIndex).get('modulesIds') as FormArray;
    modules.removeAt(moduleIndex);
  }
  onSubmit(): void {
    if (this.filiereForm.valid) {
      const filiereData = this.filiereForm.value;
      // Récupérer les données du responsable à partir du formulaire ou d'où vous les obtenez
      const responsableData = {
        // Les détails du responsable, par exemple :
        id:0,
        nom: filiereData.nomResponsable,
        prenom: filiereData.prenomResponsable
        // Ajoutez d'autres champs si nécessaire
      };

      // Créer d'abord le responsable
      this.responsableService.createResponsableFiliere(responsableData).subscribe(responsable => {
        // Utiliser l'ID du responsable créé pour remplir le champ responsableId
        filiereData.responsableId = responsable.id;
        // Ensuite, créer la filière avec les données du formulaire
        this.filiereService.addFiliere(filiereData,responsable.id).subscribe(() => {
          // Fermer la fenêtre modale après l'ajout de la filière
          this.dialogRef.close();
        });
      });
    }
  }


  onCancel(): void {
    this.dialogRef.close();
  }
}

