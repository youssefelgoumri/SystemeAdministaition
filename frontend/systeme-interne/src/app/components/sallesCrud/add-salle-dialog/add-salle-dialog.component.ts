import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import {Salle} from "../../../models/Sallesmodel/salle";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TypeSalle} from "../../../models/Sallesmodel/TypeSalle";

@Component({
  selector: 'app-add-salle-dialog',
  templateUrl: './add-salle-dialog.component.html',
  styleUrls: ['./add-salle-dialog.component.css']
})
export class AddSalleDialogComponent {
  newSalle: Salle = new Salle();

  salleTypes = Object.values(TypeSalle);

  @Output() salleAdded: EventEmitter<Salle> = new EventEmitter<Salle>();

  constructor(
    public dialogRef: MatDialogRef<AddSalleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onAdd(): void {
    // Log the value of newSalle before emitting salleAdded event
    console.log('New Salle:', this.newSalle);

    // Emit the new salle data if newSalle is truthy
    if (this.newSalle && this.newSalle.nom && this.newSalle.typeSalle && this.newSalle.description) {
      console.log('Salle added:', this.newSalle);
      this.salleAdded.emit(this.newSalle);
    } else {
      console.log('Add Salle canceled');
    }

    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
