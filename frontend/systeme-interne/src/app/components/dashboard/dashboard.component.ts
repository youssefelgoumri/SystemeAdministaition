import { Component } from '@angular/core';
import {Professeur} from "../../models/ProfModel/professeur";
import {Etablissement} from "../../models/ProfModel/etablissement";
import {map} from "rxjs";
import {ProfesseurService} from "../../services/professeur.service";
import {MatTableDataSource} from "@angular/material/table";
import {Salle} from "../../models/Sallesmodel/salle";
import {SalleserviceService} from "../../services/salleservice.service";
export interface Etudient{
  massar:string;

}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  isSidebarOpen: string = "open";
  professeurs: Professeur[]=[];
  etablissements: Etablissement[]=[];
  salles: Salle[]=[];
  etudients:Etudient[]=[]
  ProfesseurSource: MatTableDataSource<Professeur>;
  SalleSource: MatTableDataSource<Salle>;
  etudientsSource: MatTableDataSource<Etudient>;
  constructor(private ProfService:ProfesseurService,private salleserviceService: SalleserviceService) {
    this.ProfesseurSource = new MatTableDataSource(this.professeurs);
    // Assign the data to the data source for the table to render
    this.getData();
    this.ProfesseurSource = new MatTableDataSource(this.professeurs);
    this.SalleSource = new MatTableDataSource(this.salles);
    // Assign the data to the data source for the table to render
    this.getData1();
    this.SalleSource = new MatTableDataSource(this.salles);

    this.getAllEtude();
    this.etudientsSource = new MatTableDataSource(this.etudients);

  }

  onSidebarToggle(isOpen: string) {
    this.isSidebarOpen = isOpen;
  }
  applyFilter(event: Event) {
  }
  getAllEtude(){
    this.ProfService.getalletudient()
      .subscribe(
        (transformedData: Etudient[]) => {
          this.etudients = transformedData;
          // console.log(this.etablissements);
          // console.log(this.EtablissementSource.data.at(1))
        },
        (error) => {
          console.error('Error occurred:', error);
        }
      );
  }

  //
  getData() {
    this.ProfService.getAllProf()
      .subscribe(
        (data) => {
          this.professeurs = data;
          this.ProfesseurSource.data = this.professeurs;
          // console.log(this.professeurs);
          // console.log(this.ProfesseurSource.data.at(1))
        },
        (error) => {
          console.error('Error occurred:', error);
        }
      );
  }

  getData1() {
    this.salleserviceService.allSalles().pipe(
      map((response: any[]) => {
        return response.map(item => ({
          idSalle: item.idSalle,
          nom: item.nom,
          typeSalle: item.typeSalle,
          description: item.description
        }));
      })
    )
      .subscribe(
        (transformedData: Salle[]) => {
          this.salles = transformedData;
          this.SalleSource.data = this.salles;
        },
        (error) => {
          console.error('Error occurred:', error);
        }
      );
  }


}
