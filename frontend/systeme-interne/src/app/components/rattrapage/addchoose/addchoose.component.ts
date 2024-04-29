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
  selector: 'app-addchoose',
  templateUrl: './addchoose.component.html',
  styleUrls: ['./addchoose.component.css']
})
export class AddchooseComponent {
  @Output() chooseConfirmed: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public dialogRef: MatDialogRef<AddchooseComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    // const row = this.data.row;
    // console.log('Row to delete:', row);
  }


  onExcel(): void {
    console.log('onExcel');
    this.chooseConfirmed.emit(true); // Emit true when delete confirmed
    this.dialogRef.close();
  }

  onManuel(): void {
    console.log('onManuel');
    this.chooseConfirmed.emit(false); // Emit false when delete canceled
    this.dialogRef.close();
  }
}

