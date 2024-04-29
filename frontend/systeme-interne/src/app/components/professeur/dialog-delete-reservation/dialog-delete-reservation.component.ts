import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-delete-reservation',
  templateUrl: './dialog-delete-reservation.component.html',
  styleUrls: ['./dialog-delete-reservation.component.css']
})
export class DialogDeleteReservationComponent {
  @Output() deleteConfirmed: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public dialogRef: MatDialogRef<DialogDeleteReservationComponent>,
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
