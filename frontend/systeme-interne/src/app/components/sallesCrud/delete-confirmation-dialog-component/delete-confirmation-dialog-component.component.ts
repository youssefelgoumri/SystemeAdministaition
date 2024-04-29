import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef
} from "@angular/material/dialog";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-delete-confirmation-dialog-component',
  templateUrl: './delete-confirmation-dialog-component.component.html',
  styleUrls: ['./delete-confirmation-dialog-component.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
  ],

})
export class DeleteConfirmationDialogComponentComponent {

  @Output() deleteConfirmed: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public dialogRef: MatDialogRef<DeleteConfirmationDialogComponentComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    const row = this.data.row;
    console.log('Row to delete:', row);
  }


  onConfirm(): void {
    console.log('Delete confirmed');
    this.deleteConfirmed.emit(true); // Emit true when delete confirmed
    this.dialogRef.close();
  }

  onCancel(): void {
    console.log('Delete canceled');
    this.deleteConfirmed.emit(false); // Emit false when delete canceled
    this.dialogRef.close();
  }
}
