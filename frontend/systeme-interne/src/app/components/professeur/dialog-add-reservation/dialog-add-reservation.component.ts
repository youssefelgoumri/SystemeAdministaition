import {Salle} from "../../../models/Sallesmodel/salle";
import {Reservation} from "../../../models/reservationModel/reservation";
import {SalleserviceService} from "../../../services/salleservice.service";
import {HttpClient} from "@angular/common/http";
import {Component, EventEmitter, Inject, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatStep, MatStepper, MatStepperModule} from "@angular/material/stepper";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import { Router } from 'express';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-add-reservation',
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
  templateUrl: './dialog-add-reservation.component.html',
  styleUrls: ['./dialog-add-reservation.component.css'],
})
export class DialogAddReservationComponent  {
  currentDate! :string|null;
  newReservation: Reservation = new Reservation();
  salles: Salle[]=[];
  @Output() reservationAdded: EventEmitter<Reservation> = new EventEmitter<Reservation>();
  selectedSalleId: number | null = null;
  isEditable = false;
  idProf! : number
  dateDebut!:any
  dateFin!:any
  salleid!:number

  constructor(
    private salleserviceService: SalleserviceService,
    private http: HttpClient, private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogAddReservationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,private datePipe: DatePipe
  ) {
  
    this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm');
    this.getData();
    // console.log(data)
    this.idProf=data;
    console.log(this.currentDate)
    
    // this.cdr.detectChanges();
  }
  firstFormGroup!: FormGroup;

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      datadebu: ['', Validators.required],
      datafin: ['', Validators.required],
      salle: ['', Validators.required]
    });
  }
  validate(){
    if (this.firstFormGroup.invalid){
      if(this.firstFormGroup.get('datefin')?.hasError("dateBeforeToday")){
        alert("La date de fin doit être supérieure à la")
    }
    if(this.firstFormGroup.get('datadebu')?.hasError("dateBeforeToday")){
      alert("La date de fin doit être supérieure à la")
  }
  }
}
  dateBeforeTodayValidator() {
    return (control: FormControl) => {
      const currentDate = new Date();
      const inputDate = new Date(control.value);

      
      if (inputDate < currentDate) {
        console.log(inputDate)
      console.log(currentDate)
        return 'dateBeforeToday';
      }
      return null;
    };
  }
  onAdd(): void {
    this.addReservation(this.newReservation);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  getData() {
    this.salleserviceService.allSalles()
      .subscribe(
        (transformedData) => {
          this.salles=transformedData;
          // console.log(transformedData);
        },
        (error) => {
          console.error('Error occurred:', error);
        }
      );
  }

  sendReserve :any={}
  add:boolean=false;
  addReservation(newReservation: Reservation): void {
    // const currentDate = new Date();
    // Convert input dates to Date objects
    const dateDebut = new Date(this.sendReserve.dateDebut);
    const dateFin = new Date(this.sendReserve.dateFin);
      
      this.sendReserve.dateDebut= this.datePipe.transform(this.newReservation.date_debut, 'yyyy-MM-dd HH:mm:ss');
      this.sendReserve.dateFin= this.datePipe.transform(this.newReservation.date_fin, 'yyyy-MM-dd HH:mm:ss');
      this.sendReserve.idProf=this.idProf;
      
      if (!this.sendReserve.dateDebut || !this.sendReserve.dateFin) {
        this.snackBar.open('Please enter valid date and time ranges.', 'Close', { duration: 1500 });
        // this.add=false;
            // this.dialogRef.close();
        // console.error('Please enter valid date and time ranges.');
        // return;
      }else{
        // Check if end date is greater than start date
        if (dateFin < dateDebut) {
          this.snackBar.open('End date and time must be greater than start date and time.', 'Close', { duration: 1500 });
              // this.dialogRef.close();
          // console.error('End date and time must be greater than start date and time.');
          // return;
        }else{
          // Check if dates are the same
          if(dateDebut.toDateString() === dateFin.toDateString()) {
            // Check if start time is greater than end time
            if (dateDebut.getTime() >= dateFin.getTime()) {
              this.snackBar.open('Start time must be earlier than end time on the same day.', 'Close', { duration: 1500 });
                // this.dialogRef.close();
              // console.error('Start time must be earlier than end time on the same day.');
              // return;
            }
          }
            else{
              this.http.post(`http://localhost:2222/RESERVATIONSALLE-SERVICE/ReservationSalle/${this.salleid}/reserve`, this.sendReserve).subscribe(
                (res) => {
                  console.log(res);
                  // Afficher un message de succès
                  this.snackBar.open('Reservation added successfully', 'Close', { duration: 1500 });
                  this.dialogRef.close();
                },
                (error) => {
                  console.error('Error occurred:', error);
                  // Afficher un message d'erreur
                  this.snackBar.open('Reservation not added', 'Close', { duration: 1500 });
                  this.dialogRef.close();
                }
              );
            }
          }
        
        }
    // Envoyer une demande POST pour réserver la salle avec l'ID de la salle sélectionnée
    
  }



}
