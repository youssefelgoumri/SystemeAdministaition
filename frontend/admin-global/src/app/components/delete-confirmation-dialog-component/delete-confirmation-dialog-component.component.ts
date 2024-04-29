import { Component, EventEmitter, Output, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-delete-confirmation-dialog-component',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions
  ],
  templateUrl: './delete-confirmation-dialog-component.component.html',
  styleUrl: './delete-confirmation-dialog-component.component.css'
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
