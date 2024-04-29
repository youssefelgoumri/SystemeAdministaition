import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import Long from 'long';
import { ConfirmationDeleteComponent } from '../confirmation-delete/confirmation-delete.component';
import { MatDialog } from '@angular/material/dialog';
import { AjouterDiplomeComponent } from '../ajouter-diplome/ajouter-diplome.component';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

export interface Diplome{
  id: Long;
  dateObtention: string;
  diplome: string;
  specialite: string;
  universite: string;
  etablissement: string;
  ville: string;
  mention: string;
  massar: string;
}

export interface Etudiant{
  massar: string;
  nomEnArabe: string;
  prenomEnArabe: string;
  nomEnFrançais: string;
  prenomEnFrançais: string;
  cin: string;
  nationalite: string;
  sexe: string;
  dateNaissance: string;
  lieuNaissanceEnArabe: string;
  lieuNaissanceEnFrançais: string;
  ville: string;
  province: string;
  anneeBac: any;
  serieBac: string;
  mentionBac: string;
  lieuObtentionBac: string;
  lycee: string;
  academie: string;
  etablissement: string;
  fillieres: string[];
  idEtablissement: string;
  idFillieres: Long[];
  anneeUniversitaire: string;
  etape: string;
  bourse: boolean;
  diplomes: Diplome[];
  adressePersonnelle: string;
  telephone: string;
  mail: string;
  adresseParents: string;
  dateInscription: string;
}

@Component({
  selector: 'app-inscription-administrative',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, CommonModule, MatSidenavModule, MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatRadioModule, HttpClientModule],
  templateUrl: './inscription-administrative.component.html',
  styleUrl: './inscription-administrative.component.css'
})
export class InscriptionAdministrativeComponent{
  massar!: string;
  etudiant!: any;
  infosEtudiant!: FormGroup;
  sexe!: string;
  bourse!: string;
  diplomes!: Diplome[];
  diplome!: Diplome;
  isEditMode: boolean = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, public dialog: MatDialog) {}

  onKeyUp(event: KeyboardEvent) {
    if (event.key == 'Enter') {
      this.http.get<Etudiant>(`http://localhost:2222/SERVICE-INSCRIPTIONADMINISTRATIVE/etudiantsAdministratifs/${this.massar}`).subscribe(
      (response) => { 
        this.etudiant = response;
        this.sexe = response.sexe;
        this.diplomes = response.diplomes;
        if (response.bourse != null)
          this.bourse = response.bourse === true ? "true": "false";
        this.infosEtudiant = this.formBuilder.group({
          nomEnArabe: [response.nomEnArabe, Validators.required],
          nomEnFrançais: [response.nomEnFrançais, Validators.required],
          prénomEnArabe: [response.prenomEnArabe, Validators.required],
          prénomEnFrançais: [response.prenomEnFrançais, Validators.required],
          cin: [response.cin, Validators.required],
          nationalité: [response.nationalite, Validators.required],
          dateDeNaissance: [response.dateNaissance, Validators.required],
          lieuDeNaissanceEnArabe: [response.lieuNaissanceEnArabe, Validators.required],
          lieuDeNaissanceEnFrançais: [response.lieuNaissanceEnFrançais, Validators.required],
          ville: [response.ville, Validators.required],
          province: [response.province, Validators.required],
          massar: [response.massar, Validators.required],
          annéeBac: [response.anneeBac, Validators.required],
          sérieBac: [response.serieBac, Validators.required],
          mention: [response.mentionBac, Validators.required],
          lycée: [response.lycee, Validators.required],
          lieu: [response.lieuObtentionBac, Validators.required],
          académie: [response.academie, Validators.required],
          anneeUniversitaire: [response.anneeUniversitaire, Validators.required],
          etape: [response.etape, Validators.required],
          telephone: [response.telephone, Validators.required],
          adressePersonnelle: [response.adressePersonnelle, Validators.required],
          adresseParents: [response.adresseParents, Validators.required],
          mail: [response.mail, Validators.required]
        });
      },
      (error) => {
        this.http.post<Etudiant>(`http://localhost:2222/SERVICE-INSCRIPTIONADMINISTRATIVE/etudiantsAdministratifs/add/${this.massar}`, {
      "massar": this.massar}).subscribe((response: Etudiant) => {
        this.etudiant = response;
        this.sexe = response.sexe;
        if (response.bourse != null)
          this.bourse = response.bourse === true ? "true": "false";
        this.infosEtudiant = this.formBuilder.group({
          nomEnArabe: [response.nomEnArabe, Validators.required],
          nomEnFrançais: [response.nomEnFrançais, Validators.required],
          prénomEnArabe: [response.prenomEnArabe, Validators.required],
          prénomEnFrançais: [response.prenomEnFrançais, Validators.required],
          cin: [response.cin, Validators.required],
          nationalité: [response.nationalite, Validators.required],
          dateDeNaissance: [response.dateNaissance, Validators.required],
          lieuDeNaissanceEnArabe: [response.lieuNaissanceEnArabe, Validators.required],
          lieuDeNaissanceEnFrançais: [response.lieuNaissanceEnFrançais, Validators.required],
          ville: [response.ville, Validators.required],
          province: [response.province, Validators.required],
          massar: [response.massar, Validators.required],
          annéeBac: [response.anneeBac, Validators.required],
          sérieBac: [response.serieBac, Validators.required],
          mention: [response.mentionBac, Validators.required],
          lycée: [response.lycee, Validators.required],
          lieu: [response.lieuObtentionBac, Validators.required],
          académie: [response.academie, Validators.required],
          anneeUniversitaire: [response.anneeUniversitaire, Validators.required],
          etape: [response.etape, Validators.required],
          telephone: [response.telephone, Validators.required],
          adressePersonnelle: [response.adressePersonnelle, Validators.required],
          adresseParents: [response.adresseParents, Validators.required],
          mail: [response.mail, Validators.required]
        });
      });
      }
      );
    }
  }

  modifierEtudiant(){
    if (this.isEditMode)
      this.http.put(`http://localhost:2222/SERVICE-INSCRIPTIONADMINISTRATIVE/etudiantsAdministratifs/edit/${this.etudiant.massar}`, {
      "massar": this.infosEtudiant.value.massar,
      "nomEnArabe": this.infosEtudiant.value.nomEnArabe,
      "prenomEnArabe": this.infosEtudiant.value.prénomEnArabe,
      "nomEnFrançais": this.infosEtudiant.value.nomEnFrançais,
      "prenomEnFrançais": this.infosEtudiant.value.prénomEnFrançais,
      "cin": this.infosEtudiant.value.cin,
      "nationalite": this.infosEtudiant.value.nationalité,
      "sexe": this.sexe,
      "dateNaissance": this.infosEtudiant.value.dateDeNaissance,
      "lieuNaissanceEnArabe": this.infosEtudiant.value.lieuDeNaissanceEnArabe,
      "lieuNaissanceEnFrançais": this.infosEtudiant.value.lieuDeNaissanceEnFrançais,
      "ville": this.infosEtudiant.value.ville,
      "province": this.infosEtudiant.value.province,
      "anneeBac": this.infosEtudiant.value.annéeBac,
      "serieBac": this.infosEtudiant.value.sérieBac,
      "mentionBac": this.infosEtudiant.value.mention,
      "lieuObtentionBac": this.infosEtudiant.value.lieu,
      "lycee": this.infosEtudiant.value.lycée,
      "academie": this.infosEtudiant.value.académie,
      "bourse": this.bourse == "true" ? true: false,
      "anneeUniversitaire": this.infosEtudiant.value.anneeUniversitaire,
      "etape": this.infosEtudiant.value.etape,
      "adressePersonnelle": this.infosEtudiant.value.adressePersonnelle,
      "telephone": this.infosEtudiant.value.telephone,
      "mail": this.infosEtudiant.value.mail,
      "adresseParents": this.infosEtudiant.value.adresseParents
    }).subscribe(response => {this.etudiant = null;});
    this.isEditMode = !this.isEditMode;
  }

  confirmDelete() {
    const dialogRef = this.dialog.open(ConfirmationDeleteComponent, {
      width: '30%',
      data: 'Êtes-vous sûr de vouloir supprimer cet étudiant ?'
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result.response) {
        this.http.delete(`http://localhost:2222/SERVICE-INSCRIPTIONADMINISTRATIVE/etudiantsAdministratifs/delete/${this.etudiant.massar}`).subscribe(response => this.etudiant=null);
      }
    });
  }

  ajouterDiplome(){
    const dialogRef = this.dialog.open(AjouterDiplomeComponent, {
      width: '30%',
      data: {message:'Veuillez remplir tous les champs', objet: null}
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.diplome.massar = this.etudiant.massar;
        this.http.post<Diplome>(`http://localhost:2222/SERVICE-INSCRIPTIONADMINISTRATIVE/etudiantsAdministratifs/${this.etudiant.massar}/diplomes/add`, result.diplome).subscribe(
          response => {this.diplomes.push(response);}
        );
      }
    });
  }
    
  modifierDiplome(id: Long){
    const dialogRef = this.dialog.open(AjouterDiplomeComponent, {
      width: '30%',
      data: {message:'Veuillez remplir tous les champs', objet: this.diplomes.find(diplome=> diplome.id==id)}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.diplome.massar = this.etudiant.massar;
        this.http.put<Diplome>(`http://localhost:2222/SERVICE-INSCRIPTIONADMINISTRATIVE/etudiantsAdministratifs/diplomes/edit/${id}`, result.diplome).subscribe(
          response => {this.diplomes = this.diplomes.filter(diplome => diplome.id!=id);this.diplomes.push(response);}
        );
      }
    });
  }

  supprimerDiplome(id: Long){
    this.http.delete(`http://localhost:2222/SERVICE-INSCRIPTIONADMINISTRATIVE/etudiantsAdministratifs/diplomes/delete/${id}`).subscribe(
      response => {this.diplomes = this.diplomes.filter(diplome => diplome.id!=id);}
      );
  }
}
