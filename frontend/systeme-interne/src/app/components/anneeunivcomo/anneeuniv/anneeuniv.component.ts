import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AnneeunivService } from 'src/app/services/anneeuniv.service';
import { AddanneeunivComponent } from '../addanneeuniv/addanneeuniv.component';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
// import * as variable from 'assert';

export class AnneeUniv{
  id!:number;
  anneeUniversitaire!:string;
  anneeCourante?:boolean;
  session?:Session[]
}
export class Session{
  id!:number;
  nom?:NomSession;
  typeSession?:TypeSession;
  semestres?:Semestre[]
}
export enum NomSession{
  Automne='Automne',
  Printemps='Printemps'
}

export enum TypeSession{
  Ordinaire='Ordinaire',
  Rattrapage='Rattrapage'
}

export class Semestre{
  id!:string;
}

@Component({
  selector: 'app-anneeuniv',
  templateUrl: './anneeuniv.component.html',
  styleUrls: ['./anneeuniv.component.css']
})
export class AnneeunivComponent {
  // myExtObject: any;  
  isSidebarOpen: string = "open";
  anneeUniv:AnneeUniv[]=[];
  delete=faTrash;


  onSidebarToggle(isOpen: string) {
    this.isSidebarOpen = isOpen;
  }
  applyFilter(event: Event) {
  }
  constructor(private anneeunivServie:AnneeunivService,
    private snackBar: MatSnackBar, private dialog: MatDialog,
    private datePipe: DatePipe){
      // const yearList = document.getElementById("todo-list");
    // this.myExtObject()
    // console.log(this.anneeUniv)
    this.anneeunivServie.getAllUniv().subscribe(
      (res)=>{
        this.anneeUniv=res
       
      },
      (err)=>{})
      this.anneeUniv.sort((a, b) => {
        if (a.anneeCourante && !b.anneeCourante) {
            return -1; // a comes before b
        } else if (!a.anneeCourante && b.anneeCourante) {
            return 1; // b comes before a
        } else {
            return 0; // No change in order if both have same anneeCourante value or if both are undefined/null
        }
    });
    console.log(this.anneeUniv)

  }
  addNewAnneUniv(){
    const dialogRef = this.dialog.open(AddanneeunivComponent, {
      width: '700px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.anneeunivServie.getAllUniv().subscribe(
        (res)=>{
          this.anneeUniv=res
          console.log(this.anneeUniv)
        },
        (err)=>{})
        this.anneeUniv.sort((a, b) => {
          if (a.anneeCourante && !b.anneeCourante) {
              return -1; // a comes before b
          } else if (!a.anneeCourante && b.anneeCourante) {
              return 1; // b comes before a
          } else {
              return 0; // No change in order if both have same anneeCourante value or if both are undefined/null
          }
      });console.log(this.anneeUniv)
    });
    
  }

  deleteAnnee(au: AnneeUniv){
    this.anneeunivServie.deleteUniv(au.id).subscribe(
      (res)=>{
        this.snackBar.open('Annee Universitaire supprimer', 'Close', { duration: 1500 });
        this.anneeunivServie.getAllUniv().subscribe(
          (res)=>{
            this.anneeUniv=res
            console.log(this.anneeUniv)
          },
          (err)=>{})
          this.anneeUniv.sort((a, b) => {
            if (a.anneeCourante && !b.anneeCourante) {
                return -1; // a comes before b
            } else if (!a.anneeCourante && b.anneeCourante) {
                return 1; // b comes before a
            } else {
                return 0; // No change in order if both have same anneeCourante value or if both are undefined/null
            }
        });console.log(this.anneeUniv)
      },
      (err)=>{
        this.snackBar.open('Failed delete Annee Universitaire ', 'Close', { duration: 1500 });
      
      });

  }


  
}
