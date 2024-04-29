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
  selector: 'app-choose',
  templateUrl: './choose.component.html',
  styleUrls: ['./choose.component.css']
})
export class ChooseComponent {

  @Output() chooseConfirmed: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public dialogRef: MatDialogRef<ChooseComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  onadd(){
    this.chooseConfirmed.emit(true); // Emit true when delete confirmed
    this.dialogRef.close();
  }

  onexcel(){
    this.chooseConfirmed.emit(false); // Emit true when delete confirmed
    this.dialogRef.close();
  }
}
