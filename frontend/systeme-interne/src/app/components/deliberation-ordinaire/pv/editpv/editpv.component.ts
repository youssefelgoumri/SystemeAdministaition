import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Plandevalidation } from 'src/app/models/PlanDeValidationModel/plandevalidation';
import { ShowallpvComponent } from '../showallpv/showallpv.component';

@Component({
  selector: 'app-editpv',
  templateUrl: './editpv.component.html',
  styleUrls: ['./editpv.component.css']
})
export class EditpvComponent {

  pv: Plandevalidation = new Plandevalidation(); // Define a variable to hold the updated data

  @Output() editConfirmed: EventEmitter<Plandevalidation> = new EventEmitter<Plandevalidation>();
  @Output() editCanceled: EventEmitter<void> = new EventEmitter<void>();
  // Inside your component class


  constructor(
    public dialogRef: MatDialogRef<EditpvComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Plandevalidation // Inject the data of the selected row
  ) {
    // Initialize the updatedEtablissement with the data of the selected row
    console.log(data);
    this.pv = data;  }

  onSave(): void {
    // Implement the save functionality to send the updated data back to the parent component
    this.dialogRef.close(this.pv);
    this.editConfirmed.emit(this.pv);
  }

  onCancel(): void {
    // Close the dialog without saving changes
    this.dialogRef.close();
    this.editCanceled.emit();
  }

  isInputValid:boolean=false;
  updateROE(){
    this.isInputValid = true;
  }

}
