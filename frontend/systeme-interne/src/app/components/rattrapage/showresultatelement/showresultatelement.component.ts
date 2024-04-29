import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResultatRattrapageElement } from 'src/app/models/RattModel/resultat-rattrapage-element';

@Component({
  selector: 'app-showresultatelement',
  templateUrl: './showresultatelement.component.html',
  styleUrls: ['./showresultatelement.component.css']
})
export class ShowresultatelementComponent {
  rrelist: ResultatRattrapageElement[]=[]; // Define a variable to hold the updated data

  @Output() editConfirmed: EventEmitter<ResultatRattrapageElement[]> = new EventEmitter<ResultatRattrapageElement[]>();
  @Output() editCanceled: EventEmitter<void> = new EventEmitter<void>();
  // Inside your component class


  constructor(
    public dialogRef: MatDialogRef<ShowresultatelementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ResultatRattrapageElement[] // Inject the data of the selected row
  ) {
    // Initialize the updatedEtablissement with the data of the selected row
    console.log(data);
    this.rrelist = data.slice();  }

  onSave(): void {
    // Implement the save functionality to send the updated data back to the parent component
    this.dialogRef.close(this.rrelist);
    this.editConfirmed.emit(this.rrelist);
  }

  onCancel(): void {
    // Close the dialog without saving changes
    this.dialogRef.close();
    this.editCanceled.emit();
  }

  isInputValid:boolean=false;
  updateRRE(){
    this.isInputValid = true;
  }
}
