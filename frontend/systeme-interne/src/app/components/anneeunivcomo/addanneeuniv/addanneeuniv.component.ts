import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { AnneeUniv } from '../anneeuniv/anneeuniv.component';
import { AnneeunivService } from 'src/app/services/anneeuniv.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-addanneeuniv',
  standalone: true,
  imports: [
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatSelectModule,
  ],
  templateUrl: './addanneeuniv.component.html',
  styleUrls: ['./addanneeuniv.component.css']
})
export class AddanneeunivComponent {
  // @Output() newadd: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() addConfirmed: EventEmitter<boolean> = new EventEmitter<boolean>();

  anneeUnivToAdd:AnneeUniv = new  AnneeUniv();
  isSidebarOpen: string = "open";
  isEditable = false;

  onSidebarToggle(isOpen: string) {
    this.isSidebarOpen = isOpen;
  }
  constructor(private anneeunivServie:AnneeunivService,
    private snackBar: MatSnackBar, private dialog: MatDialog,
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<AddanneeunivComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder:FormBuilder){}

  addnew(){
    console.log(this.anneeUnivToAdd)
    this.anneeunivServie.addUniv(this.anneeUnivToAdd).subscribe(
      (res)=>{
        this.anneeUnivToAdd=res
        console.log(this.anneeUnivToAdd)
        this.snackBar.open('Annee Universitaire est courante', 'Close', { duration: 1500 });
        this.addConfirmed.emit(true);
        this.dialogRef.close();
      },
      (err)=>{})
  }
  firstFormGroup!: FormGroup;

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      datadebu: ['', Validators.required],
    });
  }
  onCancel(){
    this.addConfirmed.emit(false);
    this.dialogRef.close();
    console.log(this.anneeUnivToAdd)

  }
}
