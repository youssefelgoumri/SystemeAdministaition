import {Component, OnInit} from '@angular/core';
import {ProfesseurService} from "../../services/professeurServices/professeur.service";
import {Router} from "@angular/router";
import {Professeur} from "../../models/ProfesseurModel/professeur";

@Component({
  selector: 'app-professeurs',
  templateUrl: './professeurs.component.html',
  styleUrls: ['./professeurs.component.scss']
})
export class ProfesseursComponent implements OnInit{

  professeur:Professeur= new Professeur();
  exit : string="h"


  constructor(private ProfService:ProfesseurService,private route:Router) {
  }

  ngOnInit(): void {
    // this.exit="assia";
    // this.getProf();
  }


  getProf(){
    this.ProfService.getProfById(1).subscribe(
      data=>{
        if (data != null) {
          // this.professeur = data
          this.exit="yes "
        }
        else{
          this.exit="No"
        }

      },
      error => {
        alert("error request")
      }
    )
  }
}

