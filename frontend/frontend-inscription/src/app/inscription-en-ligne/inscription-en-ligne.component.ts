import { Component } from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {format} from 'date-fns';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { NgFor } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import Long from 'long';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFont from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { Router } from '@angular/router';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export interface Etablissement {
  codeName: string;
  nom: string;
}

export interface Filliere {
  id: Long;
  nom: string;
}

export interface Etudiant {
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
    dateInscription: string;
    etablissement: string;
    fillieres: string[];
    idEtablissement: string;
    idFillieres: Long[];
}

@Component({
  selector: 'app-inscription-en-ligne',
  standalone: true,
  imports: [MatSelectModule, HttpClientModule, NgFor, MatDatepickerModule, MatRadioModule, MatButtonModule, MatStepperModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './inscription-en-ligne.component.html',
  styleUrl: './inscription-en-ligne.component.css',
  providers: [provideNativeDateAdapter(MY_DATE_FORMATS), { provide: MAT_DATE_LOCALE, useValue: 'fr-FR'}]
})
export class InscriptionEnLigneComponent {
  firstFormGroup = this._formBuilder.group({
    nomEnArabe: ['', Validators.required],
    nomEnFrançais: ['', Validators.required],
    prénomEnArabe: ['', Validators.required],
    prénomEnFrançais: ['', Validators.required],
    cin: ['', Validators.required],
    nationalité: ['', Validators.required],
    dateDeNaissance: ['', Validators.required],
    lieuDeNaissanceEnArabe: ['', Validators.required],
    lieuDeNaissanceEnFrançais: ['', Validators.required],
    ville: ['', Validators.required],
    province: ['', Validators.required],
    massar: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    annéeBac: ['', Validators.required],
    sérieBac: ['', Validators.required],
    mention: ['', Validators.required],
    lycée: ['', Validators.required],
    lieu: ['', Validators.required],
    académie: ['', Validators.required]
  });
  isEditable = true;
  sexe = 'Homme';
  etablissements!: Etablissement[];
  fillieres!: Filliere[];
  thirdFormGroup = this._formBuilder.group({
    etablissement: [null, Validators.required],
    fillieres: [null, Validators.required]
  });

  constructor(private _formBuilder: FormBuilder, private http: HttpClient,private route:Router) {
    http.get<Etablissement[]>('http://localhost:2222/SERVICE-INSCRIPTIONENLIGNE/etudiants/choix_etablissement').subscribe(
      (etablissements) => {
        this.etablissements = etablissements;
      },
      (error) => {
        console.error('Une erreur s\'est produite lors du chargement des établissements :', error);
      }
    );
  }

  loadFilieresByEtablissement(etablissement: Etablissement) {
    this.http.get<Filliere[]>(`http://localhost:2222/SERVICE-INSCRIPTIONENLIGNE/etudiants/${etablissement.codeName}/filliers`).subscribe(
      (fillieres) => {
        this.fillieres = fillieres;
      },
      (error) => {
        console.error('Une erreur s\'est produite lors du chargement des filières :', error);
      }
    );
  }

  convertToRTL(text: string): string {
    var words = text.split(' ');
    var reversedWords = words.reverse();
    var rtlText = reversedWords.join(' ');
  
    return rtlText;
  }
  

  downloadPDF() {
    this.isEditable = false;

    const dateDeNaissance = this.firstFormGroup.value.dateDeNaissance;
    const formattedDate = dateDeNaissance ? format(dateDeNaissance, 'dd/MM/yyyy') : '';
    let etablissementChoisi:Etablissement = this.thirdFormGroup.get('etablissement')?.getRawValue();
    let fillieresChoisies:Filliere[] = this.thirdFormGroup.get('fillieres')?.getRawValue();

    const fonts = {
      Scheherazade: {
        normal: 'ScheherazadeNew-Regular.ttf',
        bold: 'ScheherazadeNew-Bold.ttf',
        italics: 'ScheherazadeNew-Medium.ttf',
        bolditalics: 'ScheherazadeNew-SemiBold.ttf'
      },
    };

    this.http.post<Etudiant>('http://localhost:2222/SERVICE-INSCRIPTIONENLIGNE/etudiants/add', {
      "massar": this.firstFormGroup.value.massar,
      "nomEnArabe": this.firstFormGroup.value.nomEnArabe,
      "prenomEnArabe": this.firstFormGroup.value.prénomEnArabe,
      "nomEnFrançais": this.firstFormGroup.value.nomEnFrançais,
      "prenomEnFrançais": this.firstFormGroup.value.prénomEnFrançais,
      "cin": this.firstFormGroup.value.cin,
      "nationalite": this.firstFormGroup.value.nationalité,
      "sexe": this.sexe,
      "dateNaissance": formattedDate.toString(),
      "dateInscription": format(new Date(), 'dd/MM/yyyy').toString(),
      "lieuNaissanceEnArabe": this.firstFormGroup.value.lieuDeNaissanceEnArabe,
      "lieuNaissanceEnFrançais": this.firstFormGroup.value.lieuDeNaissanceEnFrançais,
      "ville": this.firstFormGroup.value.ville,
      "province": this.firstFormGroup.value.province,
      "anneeBac": this.secondFormGroup.value.annéeBac,
      "serieBac": this.secondFormGroup.value.sérieBac,
      "mentionBac": this.secondFormGroup.value.mention,
      "lieuObtentionBac": this.secondFormGroup.value.lieu,
      "lycee": this.secondFormGroup.value.lycée,
      "academie": this.secondFormGroup.value.académie,
      "etablissement": etablissementChoisi?.nom,
      "fillieres": fillieresChoisies?.map((filliere: Filliere) => filliere.nom),
      "idEtablissement": etablissementChoisi?.codeName,
      "idFillieres": fillieresChoisies?.map((filliere: Filliere) => filliere.id)
  }).subscribe((response: Etudiant) => { 

    var docDefinition: TDocumentDefinitions = {
      info: {
      title: 'Reçu d\'inscription en ligne',
      author: response.etablissement,
      subject: 'informations d\'inscription lors de la phase en ligne',
      keywords: 'inscription en ligne',
      },
      pageSize: 'A4',
      pageOrientation: 'portrait',
      footer: { columns: [
        { text: '', width: '5%', },
        { text: 'Inscrit(e) le:', fontSize: 12, width: 'auto', },
        { text: response.dateInscription, fontSize: 12, },
        { text: 'Massar ou CNE:', fontSize: 12, width: 'auto', alignment: 'right', },
        { text: response.massar, fontSize: 12, width: 'auto', alignment: 'right', },
        { text: '', width: '5%', alignment:'right'},
      ]},
      content: [
          { canvas: [{ type: 'rect', x: 5, y: 0, w: 120, h: 155,}, { type: 'rect', x: 10, y: 5, w: 110, h: 145,},] },
          { text: 'Photo', absolutePosition: {x: 90, y: 110},},
          { text: `Reçu d\'inscription à l\'établissement\n${response.etablissement}`, fontSize: 18, bold: true, color: 'blue', absolutePosition: {x: 90, y: 60}, alignment: 'center'},
          { columns: [
            { text: 'Informations personnelle', color: 'orange',},
            { text: 'الشخصية المعلومات ', color: 'orange', alignment: 'right', },
            ]
          },
          { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 520, y2: 0,},] },
          { columns: [
            { text: `Nom en Français:${response.nomEnFrançais}`, width: '50%', },
            { text: this.convertToRTL(response.nomEnArabe), alignment: 'right'},
            { text: ':', alignment: 'right', width: 'auto', },
            { text: 'العائلي الإسم ', alignment: 'right', width: 'auto', },
            ]
          },
          { columns: [
            { text: `Prénom en Français:${response.prenomEnFrançais}`, width: '50%', },
            { text: this.convertToRTL(response.prenomEnArabe), alignment:'right'},
            { text: ':', alignment:'right', width: 'auto', },
            { text: 'الشخصي الإسم ', alignment:'right', width: 'auto', },
            ]
          },
          { text: `Lieu de naissance en Français:${response.lieuNaissanceEnFrançais}`, },
          {
            columns: [
              { text: this.convertToRTL(response.lieuNaissanceEnArabe), alignment: 'right', },
              { text: ':', alignment:'right', width: 'auto', },
              { text: 'الإزدياد مكان', alignment: 'right', width: 'auto', },
            ]
          },
          { columns: [
            { text: `Ville:${response.ville}`, },
            { text: `Province:${response.province}`, },
            { text: `Date de naissance:${response.dateNaissance}`, },
            ]
          },
          { columns: [
            { text: `CIN:${response.cin}`, },
            { text: `Nationalité:${response.nationalite}`, },
            { text: `Sexe:${response.sexe}`, },
            ]
          },
          { columns: [
            { text: 'Informations Baccalauréat', color: 'orange',},
            { text: 'البكالوريا معلومات ', color: 'orange', alignment: 'right', },
            ]
          },
          { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 520, y2: 0,},] },
          { 
            columns: [
              { text: `Série de Bac:${response.serieBac}`, },
              { text: `Mention:${response.mentionBac}`, },
            ]
          },
          { 
            columns: [
              { text: `Lycée:${response.lycee}`, },
              { text: `Année d'obtention de Bac:${response.anneeBac}`, },
            ]
          },
          { columns: [
            { text: `Lieu:${response.lieuObtentionBac}`, },
            { text: `Académie:${response.academie}`, },
            ]
          },
          { columns: [
            { text: 'Choix fillières', color: 'orange',},
            { text: 'الشعب إختيارات ', color: 'orange', alignment: 'right', },
            ]
          },
          { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 520, y2: 0,},] },
          {
            ol: response.fillieres?.map((nom: string) => nom) as any
          },
        ],
        defaultStyle: {
          color: 'black',
          font: 'Scheherazade',
          fontSize: 15,
          bold: false,
          alignment: 'left',
        },
      };

    pdfMake.createPdf(docDefinition, undefined, fonts, pdfFont.pdfMake.vfs).download('reçu.pdf');
    this.route.navigate(['welcome']);
  });
  }
}
