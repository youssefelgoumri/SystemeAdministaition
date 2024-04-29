import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Departement } from 'src/app/models/ProfModel/departement';
import { Etablissement } from 'src/app/models/ProfModel/etablissement';
import { Professeur } from 'src/app/models/ProfModel/professeur';
import { ProfesseurService } from 'src/app/services/professeur.service';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-prof-profile',
  templateUrl: './prof-profile.component.html',
  styleUrls: ['./prof-profile.component.css']
})
export class ProfProfileComponent implements OnInit{

  professeur! : Professeur;
  nom!:string;
  prenom! : string;
  currentpassword!:string;
  newpassword!:string;
  confpassword!:string;
  passwordsMatch:boolean=false;
  ischangepassword:boolean=false;
  hidePassword: boolean = true;
  etablissements : Etablissement[]=[]
  departements = ['Département_de_Biologie', 'Département_de_Chimie',
    'Département_de_Géologie',
     'Département_d_Informatique',
     'Département_de_Mathématiques',
     'Département_de_Physique',
  ]
  db:boolean=false;
  dc:boolean=false;
  dg:boolean=false;
  di:boolean=false;
  dm:boolean=false;
  dp:boolean=false;
  profID!:number
  isSidebarOpen1: string = "open";
  search!: Event;
  constructor(private ProfService : ProfesseurService,private route:Router,private snackBar: MatSnackBar){
    this.profID=parseInt(this.route.url.split("/")[2])
    this.getProfConnected(this.profID);
    this.getAllEtab();
    this.isSidebarOpen1="open"

  }
  ngOnInit(): void {
    console.log(this.professeur.discipline)

  }
  applyFilter(event: Event) {
    this.search=event;
    const filterValue = (this.search.target as HTMLInputElement).value;
  }


  checkPasswordsMatch(): void {
    this.passwordsMatch = this.newpassword === this.confpassword;
    if(this.passwordsMatch==false){
      this.iserror=true
    } else this.iserror=false
  console.log(this.newpassword);
  console.log(this.passwordsMatch)
  }

  togglePasswordVisibility(){
    this.hidePassword = !this.hidePassword;
  }
  error:string=""
  iserror:boolean=false;
  changePass:boolean=false;
  okchange:string=""

  changePassword(){
    if(this.newpassword === this.confpassword){
      this.iserror=false
      if(this.currentpassword===this.professeur.password){
        this.closechangepassword();
        this.professeur.password=this.newpassword;
        this.updateProf();

      }
      else{
        this.error="Votre mot de passe actuel est incorrect."
        this.iserror=true
      }
    } else {
        this.error="not matched."
        this.iserror=true

    }



  }
  closechangepassword(){
    this.ischangepassword=false;
  }
  openchangepassword(){
    this.ischangepassword=true;
    console.log(this.departements);
  }

  getProfConnected(id:number){
    this.ProfService.getProfByid(id).subscribe(
      data =>{this.professeur=data
        this.nom=this.professeur.nom
        this.prenom=this.professeur.prenom
        this.db=false;
        this.dc=false;
        this.dg=false;
        this.di=false;
        this.dm=false;
        this.dp=false;
        if(this.professeur.discipline.includes (Departement.Département_de_Biologie) ){
          this.db=true;
        }
        if(this.professeur.discipline.includes (Departement.Département_de_Chimie) ){
          this.dc=true
        }
        if(this.professeur.discipline.includes (Departement.Département_de_Géologie) ){
          this.dg=true
        }
        if(this.professeur.discipline.includes (Departement.Département_d_Informatique) ){
          this.di=true
        }
        if(this.professeur.discipline.includes (Departement.Département_de_Mathématiques) ){
          this.dm=true
        }
        if(this.professeur.discipline.includes (Departement.Département_de_Physique) ){
          this.dp=true
        }
      }
      ,erreur =>{console.log("Erreur lors de la récupération du profil")}


    )
  }

  getAllEtab(){
    this.ProfService.getAllEtablissement().pipe(
      map((response: any[]) => {
        // Perform any necessary data transformation or mapping here
        return response.map(item => ({
          codeName: item.codeName,
          nom: item.nom,
          ville: item.ville,
          discipline : item.discipline
          // Map other properties as needed
        }));
      })
    )
      .subscribe(
        (transformedData: Etablissement[]) => {
          this.etablissements = transformedData;
          // console.log(this.etablissements);
          // console.log(this.EtablissementSource.data.at(1))
        },
        (error) => {
          console.error('Error occurred:', error);
        }
      );
  }
  isSidebarOpen: string = "open";
  onSidebarToggle(isOpen: string) {
    this.isSidebarOpen = isOpen;
  }

  updateProf(){
    if (this.db==true){
      this.professeur.discipline.push(Departement.Département_de_Biologie);
      console.log("edit",this.professeur.discipline)

    }
    if (this.dg) {
      this.professeur.discipline.push(Departement.Département_de_Géologie);
      console.log("edit",this.professeur.discipline)

    }
    if (this.dm) {
      this.professeur.discipline.push(Departement.Département_de_Mathématiques);
      console.log("edit",this.professeur.discipline)

    }
    if (this.dp) {
      this.professeur.discipline.push(Departement.Département_de_Physique);
      console.log("edit",this.professeur.discipline)

    }
    if (this.dc){
      this.professeur.discipline.push(Departement.Département_de_Chimie);
      console.log("edit",this.professeur.discipline)

    }
    this.ProfService.updateProfessor(this.professeur).subscribe(
      data =>{
        this.professeur=data;
        this.professeur.discipline=[];

    if (this.di){
      this.professeur.discipline.push(Departement.Département_d_Informatique);
      console.log("edit",this.professeur.discipline)
    }
        this.snackBar.open('the changes has been successfully saved', 'Close', {
          duration: 3000,
        });
        this.getProfConnected(this.profID)
      }
      ,erreur =>{
        this.snackBar.open('the changes has not saved ', 'Close', {
          duration: 3000,
        });
      // return false
    }
    )
  }

  isInputValid:boolean=false;

  checkInput(){
    this.isInputValid = true;
    console.log(this.isInputValid)

  }
  cancel(){
    this.isInputValid = false;
    this.getProfConnected(this.profID);
    this.getAllEtab();
  }
  save(){
    this.isInputValid = false;
    this.updateProf();
  }






}
