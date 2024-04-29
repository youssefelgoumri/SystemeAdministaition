import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Absence } from 'src/app/models/absence/absence';

@Component({
  selector: 'app-update-absence-dialog',
  templateUrl: './update-absence-dialog.component.html',
  styleUrls: ['./update-absence-dialog.component.css']
})
export class UpdateAbsenceDialogComponent {
  updateAbsenceForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UpdateAbsenceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Absence,
    private formBuilder: FormBuilder
  ) {
    this.updateAbsenceForm = this.formBuilder.group({
      etudiantId: [data.etudiantId, Validators.required],
      matiereId: [data.matiereId, Validators.required],
      professeurId: [data.professeurId, Validators.required],
      dateAbsence: [new Date(data.dateAbsence), Validators.required], // Utiliser new Date() pour convertir la date
      creneauHoraire: [data.creneauHoraire, Validators.required],
      justification: [data.justification]
    });
  }

  get formControls() {
    return this.updateAbsenceForm.controls;
  }
  formatDate(date: Date): string {
    if (date) {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    }
    return '';
  }

  onSave(): void {
    if (this.updateAbsenceForm.valid) {
      const updatedAbsence: Absence = {
        id: this.data.id,
        etudiantId: this.updateAbsenceForm.value.etudiantId,
        matiereId: this.updateAbsenceForm.value.matiereId,
        professeurId: this.updateAbsenceForm.value.professeurId,
        dateAbsence: this.updateAbsenceForm.value.dateAbsence,
        creneauHoraire: this.updateAbsenceForm.value.creneauHoraire,
        justification: this.updateAbsenceForm.value.justification,
        presenceProfesseur: false
      };

      this.dialogRef.close(updatedAbsence);
    } else {
      // Marquer tous les champs du formulaire comme touchés pour afficher les erreurs
      this.updateAbsenceForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }


}
