import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialogActions} from '@angular/material/dialog';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Filiere } from "../../../models/filiereModel/filiere";
import {MatFormFieldModule} from "@angular/material/form-field";
import { MatSnackBar } from '@angular/material/snack-bar';
import { FiliereService } from '../../../services/filieres/filiere-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    CommonModule,
    MatDialogActions
  ],
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.css'
})
export class EditDialogComponent implements OnInit {
  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Filiere,
    private filiereService: FiliereService,
    private snackBar: MatSnackBar
  ) {
    this.editForm = this.fb.group({
      nom: [data.nom, Validators.required],
      nombreAnnees: [data.nombreAnnees, Validators.required],
      nombreSemestresParAnnee: [data.nombreSemestresParAnnee, Validators.required],
      nomResponsable: [data.responsable.nom, Validators.required],
      prenomResponsable: [data.responsable.prenom, Validators.required],
      semestres: this.fb.array([]) // Initialize empty semestres array
    });

    // Populate semestres array
    data.semestres.forEach(semestre => {
      const semestreFormGroup = this.fb.group({
        nomSemestre: [semestre.nomSemestre, Validators.required],
        modulesIds: this.fb.array(semestre.modulesIds.map(id => this.fb.control(id)))
      });
      (this.editForm.get('semestres') as FormArray).push(semestreFormGroup);
      console.log('Nom du semestre ajouté :', semestre.nomSemestre); // Log the value of nomSemestre

    });}

  ngOnInit(): void {
  }

  get semestres(): FormArray {
    return this.editForm.get('semestres') as FormArray;
  }



    addSemestre(): void {
      this.semestres.push(this.fb.group({
        nomSemestre: ['', Validators.required],
        modulesIds: this.fb.array([this.fb.control('')])
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
    if (this.editForm.valid) {
      const updatedFiliereData = this.editForm.value;
      const updatedFiliere: Filiere = {
        id: this.data.id,
        nom: updatedFiliereData.nom,
        nombreAnnees: updatedFiliereData.nombreAnnees,
        nombreSemestresParAnnee: updatedFiliereData.nombreSemestresParAnnee,
        responsable: {
          id: this.data.responsable.id,
          nom: updatedFiliereData.nomResponsable,
          prenom: updatedFiliereData.prenomResponsable
        },
        semestres: updatedFiliereData.semestres.map((semestre: any) => ({
          id: semestre.id, // Ajoutez une propriété id si nécessaire
          nomSemestre: semestre.nomSemestre,
          modulesIds: semestre.modulesIds.map((moduleId: any) => moduleId)
        }))      };

      this.filiereService.editFiliere(this.data.id, updatedFiliere).subscribe(() => {
        this.snackBar.open('Filière mise à jour avec succès', 'Fermer', { duration: 2000 });
        this.dialogRef.close(updatedFiliere);
      }, error => {
        console.error('Erreur lors de la mise à jour de la filière:', error);
        this.snackBar.open("Une erreur s'est produite lors de la mise à jour de la filière", 'Fermer', { duration: 2000 });
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
