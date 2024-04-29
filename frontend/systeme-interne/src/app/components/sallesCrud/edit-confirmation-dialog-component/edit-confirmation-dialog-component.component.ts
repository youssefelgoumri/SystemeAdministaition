import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {CommonModule} from "@angular/common";
import {Salle} from "../../../models/Sallesmodel/salle";
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-edit-confirmation-dialog-component',
  templateUrl: './edit-confirmation-dialog-component.component.html',
  styleUrls: ['./edit-confirmation-dialog-component.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
  ],
})
export class EditConfirmationDialogComponentComponent {
  updateSalle: Salle; // Define a variable to hold the updated data

  @Output() editConfirmed: EventEmitter<Salle> = new EventEmitter<Salle>();
  @Output() editCanceled: EventEmitter<void> = new EventEmitter<void>();
  // Inside your component class


  constructor(
    public dialogRef: MatDialogRef<EditConfirmationDialogComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Salle // Inject the data of the selected row
  ) {
    // Initialize the updatedEtablissement with the data of the selected row
    this.updateSalle = { ...data };
  }

  onSave(): void {
    // Implement the save functionality to send the updated data back to the parent component
    this.dialogRef.close(this.updateSalle);
    this.editConfirmed.emit(this.updateSalle);
  }

  onCancel(): void {
    // Close the dialog without saving changes
    this.dialogRef.close();
    this.editCanceled.emit();
  }
}
