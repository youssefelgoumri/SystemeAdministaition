import { Component, EventEmitter, Output, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogRef} from '@angular/material/dialog';
import { Etablissement } from "../../models/etablissementModel/etablissement";
import {NgForm} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-edite-confirmation-dialog-component',
  standalone: true,
  imports: [
    MatDialogActions,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './edite-confirmation-dialog-component.component.html',
  styleUrl: './edite-confirmation-dialog-component.component.css'
})
export class EditeConfirmationDialogComponentComponent {
  updatedEtablissement: Etablissement; // Define a variable to hold the updated data

  @Output() editConfirmed: EventEmitter<Etablissement> = new EventEmitter<Etablissement>();
  @Output() editCanceled: EventEmitter<void> = new EventEmitter<void>();
  // Inside your component class


  constructor(
    public dialogRef: MatDialogRef<EditeConfirmationDialogComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Etablissement // Inject the data of the selected row
  ) {
    // Initialize the updatedEtablissement with the data of the selected row
    this.updatedEtablissement = { ...data };
  }

  onSave(): void {
    // Implement the save functionality to send the updated data back to the parent component
    this.dialogRef.close(this.updatedEtablissement);
    this.editConfirmed.emit(this.updatedEtablissement);
  }

  onCancel(): void {
    // Close the dialog without saving changes
    this.dialogRef.close();
    this.editCanceled.emit();
  }
}
