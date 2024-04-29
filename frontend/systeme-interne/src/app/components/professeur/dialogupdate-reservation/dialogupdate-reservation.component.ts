import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {Salle} from "../../../models/Sallesmodel/salle";
import {Reservation} from "../../../models/reservationModel/reservation";

@Component({
  selector: 'app-dialogupdate-reservation',
  templateUrl: './dialogupdate-reservation.component.html',
  styleUrls: ['./dialogupdate-reservation.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
  ]})
export class DialogupdateReservationComponent {
  updateReservation: Reservation; // Define a variable to hold the updated data

  @Output() editConfirmed: EventEmitter<Reservation> = new EventEmitter<Reservation>();
  @Output() editCanceled: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    public dialogRef: MatDialogRef<DialogupdateReservationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Reservation // Inject the data of the selected row
  ) {
    // Initialize the updatedReservation with a copy of the data of the selected row
    this.updateReservation = { ...data };
  }

  onSave(): void {
    // Implement the save functionality to send the updated data back to the parent component
    this.dialogRef.close(this.updateReservation);
    this.editConfirmed.emit(this.updateReservation);
  }

  onCancel(): void {
    // Close the dialog without saving changes
    this.dialogRef.close();
    this.editCanceled.emit();
  }
}
