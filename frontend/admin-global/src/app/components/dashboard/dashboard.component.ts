import {Component, OnInit} from '@angular/core';
import {Etablissement} from "../../models/etablissementModel/etablissement";
import {MatTableDataSource} from "@angular/material/table";
import {EtablissementService} from "../../services/EtablissementServices/etablissement.service";
import {Filiere} from "../../models/filiereModel/filiere";
import {FiliereService} from "../../services/filieres/filiere-service.service";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Module } from 'src/app/models/etablissementModel/ModuleModel/module';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  isSidebarOpen: string = "open";
  etablissements: Etablissement[] = [];
  modules: Module[] = [];
  EtablissementSource: MatTableDataSource<Etablissement>;
  filieres:Filiere[]=[];
  filiereDataSource: MatTableDataSource<Filiere>;
  constructor(private EtabService: EtablissementService,private filiereService: FiliereService,private http:HttpClient) {

    this.EtablissementSource = new MatTableDataSource(this.etablissements);
    // Assign the data to the data source for the table to render
    this.getData();
    this.EtablissementSource = new MatTableDataSource(this.etablissements);
    this.filiereDataSource = new MatTableDataSource<Filiere>();
    this.loadFilieres();
    this.filiereDataSource = new MatTableDataSource<Filiere>();
    this.getAllModule()
  }
  ngOnInit(): void {
  }
  applyFilter(event: Event) {
  }
  onSidebarToggle(isOpen: string) {
    this.isSidebarOpen = isOpen;
    // console.log(this.isSidebarOpen)
  }

  getData() {
    this.EtabService.AllEtablisements()
      .subscribe(
        (transformedData: Etablissement[]) => {
          this.etablissements = transformedData;
          this.EtablissementSource.data = this.etablissements;
          // console.log(this.etablissements);
          // console.log(this.EtablissementSource.data.at(1))
        },
        (error) => {
          console.error('Error occurred:', error);
        }
      );
  }

  loadFilieres(){
    this.filiereService.getAllFilieres()
      .subscribe(filieres => {
        this.filieres=filieres
      console.log("Données récupérées :", filieres); // Afficher les données récupérées dans la console
      this.filiereDataSource.data = this.filieres;
    });
  }

  getAllModule() {
    this.getModules()
      .subscribe(
        (transformedData: Module[]) => {
          this.modules = transformedData;
          // this.EtablissementSource.data = this.etablissements;
          // console.log(this.etablissements);
          // console.log(this.EtablissementSource.data.at(1))
        },
        (error) => {
          console.error('Error occurred:', error);
        }
      );
  }


  getModules(): Observable<any>{
    let url = `${environment.GATEWAY+environment.MODULE_SERVICE}` ;
    return this.http.get(url);
  }

}
