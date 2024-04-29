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
  selector: 'app-appchoose',
  templateUrl: './appchoose.component.html',
  styleUrls: ['./appchoose.component.css']
})
export class AppchooseComponent {
  @Output() chooseapp: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public dialogRef: MatDialogRef<AppchooseComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    // const row = this.data.row;
    // console.log('Row to delete:', row);
  }


  add(): void {
    console.log('add');
    this.chooseapp.emit(true); // Emit true when delete confirmed
    this.dialogRef.close();
  }

  export(): void {
    console.log('export');
    this.chooseapp.emit(false); // Emit false when delete canceled
    this.dialogRef.close();
  }
}

