import { Component , Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-delete',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose],
  templateUrl: './confirmation-delete.component.html',
  styleUrl: './confirmation-delete.component.css'
})
export class ConfirmationDeleteComponent {
  
  constructor(public dialogRef: MatDialogRef<ConfirmationDeleteComponent>, @Inject(MAT_DIALOG_DATA) public message: string) {}

  accepter(): void {
    this.dialogRef.close({response:true});
  }
}
