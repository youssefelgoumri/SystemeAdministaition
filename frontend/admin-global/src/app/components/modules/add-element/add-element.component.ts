import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-element',
  standalone: true,
  imports: [ CommonModule, MatSelectModule, MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './add-element.component.html',
  styleUrl: './add-element.component.css'
})
export class AddElementComponent {
  constructor(public dialogRef: MatDialogRef<AddElementComponent>, @Inject(MAT_DIALOG_DATA) public message: string, private formBuilder:FormBuilder) {}
  element = this.formBuilder.group({
    partieCours: ['', Validators.required],
    partieTPs: ['', Validators.required],
    coefficientTPs: ['', Validators.required],
    coefficientCours: ['', Validators.required],
    controbution: ['', Validators.required]
  });

  send(): void {
    this.dialogRef.close({ element:this.element.value });
  }
}
