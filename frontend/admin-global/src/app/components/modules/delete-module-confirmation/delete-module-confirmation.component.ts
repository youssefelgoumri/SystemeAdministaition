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
  selector: 'app-delete-module-confirmation',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose],
  templateUrl: './delete-module-confirmation.component.html',
  styleUrl: './delete-module-confirmation.component.css'
})
export class DeleteModuleConfirmationComponent {
  constructor(public dialogRef: MatDialogRef<DeleteModuleConfirmationComponent>, @Inject(MAT_DIALOG_DATA) public message: string) {}

  accepter(): void {
    this.dialogRef.close({response:true});
  }
}
