import {Component, NgModule, ViewChild} from '@angular/core';
import { Absence } from 'src/app/models/absence/absence';
import { AbsenceService } from 'src/app/services/absence.service';
import {faEdit, faPrint, fas, faTrash} from "@fortawesome/free-solid-svg-icons";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import { MatDialogModule } from '@angular/material/dialog';
import {DialogService } from "src/app/services/dialog.service"
import {MatSnackBar} from "@angular/material/snack-bar";
import {jsPDF}  from 'jspdf';
import { ProfesseurService } from 'src/app/services/professeur.service'; // Importez le service de professeur
import { map } from 'rxjs/operators';
import { ModuleService } from 'src/app/services/module.service'; // Importez le service de module
import { EtudiantService } from 'src/app/services/etudiant.service'; // Importez le service d'étudiant

@Component({
  selector: 'app-absence-admin',
  templateUrl: './absence-admin.component.html',
  styleUrls: ['./absence-admin.component.css']
})

export class AbsenceAdminComponent {
  isSidebarOpen: string = 'open';
  displayedColumns: string[] = ['id', 'etudiantId', 'matiereId', 'professeurId', 'dateAbsence', 'creneauHoraire', 'justification', 'actions'];
  AbsenceSource: Absence[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  search!: Event;
  delete=faTrash;
  edit=faEdit;
  print=faPrint;
  constructor(private absenceService: AbsenceService, private snackBar: MatSnackBar, private dialogService: DialogService, private professeurService: ProfesseurService, private moduleService: ModuleService,private etudiantService: EtudiantService ) { }

  ngOnInit(): void {
    this.fetchAllAbsences();
  }

  onSidebarToggle(event: string) {
    this.isSidebarOpen = event;
  }

  applyFilter(event: Event) {

  }

  openFormPopup() {
    // Logic to open form popup
  }

  deleteRow(row: Absence) {
    // Logique pour supprimer la filière
    const confirmation = confirm("Voulez-vous vraiment supprimer cette Absence ?");
    if (confirmation) {
      this.absenceService.deleteAbsence(row.id).subscribe(() => {
        this.snackBar.open("Absence supprimée avec succès", "Fermer", {
          duration: 2000,
        });
        // Recharger les filières après suppression
        this.fetchAllAbsences();
      });
    }
  }

  updateRow(row: Absence) {
    this.dialogService.openUpdateAbsenceDialog(row).subscribe(updatedAbsence => {
      if (updatedAbsence) {
        // Si l'utilisateur a confirmé la mise à jour et fourni les détails mis à jour
        // Appeler le service pour mettre à jour l'absence
        this.absenceService.updateAbsence(row.id, updatedAbsence).subscribe(
          updated => {
            // Si la mise à jour est réussie, vous pouvez mettre à jour la liste des absences
            this.fetchAllAbsences();
          },
          error => {
            console.error('Erreur lors de la mise à jour de l\'absence : ', error);
            // Gérer les erreurs de mise à jour
          }
        );
      }
    });  }
  generatePdf(absences: any[]) {
    const doc = new jsPDF();
    doc.text('Rapport d\'absence des étudiants', 10, 10);

    let yPos = 20;
    absences.forEach((absence, index) => {
      yPos += 10;
      doc.text(`Absence ${index + 1}:`, 10, yPos);
      yPos += 5;
      doc.text(`ID de l'étudiant: ${absence.etudiantId}`, 15, yPos);
      yPos += 5;
      doc.text(`Matière: ${absence.matiereId}`, 15, yPos);
      yPos += 5;
      doc.text(`Date d'absence: ${absence.dateAbsence}`, 15, yPos);
      // Ajoutez d'autres informations d'absence si nécessaire
    });


    doc.save('rapport_absences.pdf');
  }
  async generatePdfForStudent(absences: Absence[], etudiantId: string) {
    const doc = new jsPDF();
    const marginLeft = 10;
    const marginTop = 20;
    let yPos = marginTop;

    // Ajout du logo au centre du document
    const logoImg = new Image();
    logoImg.src = 'assets/logo.png'; // Chemin vers votre fichier image
    const imgWidth =50; // Largeur de l'image
    const imgHeight = 30; // Hauteur de l'image
    const centerX = (doc.internal.pageSize.getWidth() / 2) - (imgWidth / 2); // Centre de la page en X
    doc.addImage(logoImg, 'PNG', centerX, yPos, imgWidth, imgHeight);

    yPos += imgHeight + 10; // Ajuster la position Y pour commencer après le logo
    let totalAbsences = 0;

    for (const absence of absences) {
      const professeur = await this.professeurService.getProfByid(absence.professeurId).toPromise();
      const module = await this.moduleService.getModuleById(absence.matiereId).toPromise();
      const nomProfesseur = professeur ? `${professeur.nom} ${professeur.prenom}` : "Inconnu";
      const nomModule = module ? module.intitule : "Inconnu";
      const etudiant = await this.etudiantService.getEtudiantByMassar(etudiantId).toPromise();
      const nomEtudiant = etudiant ? `${etudiant.nomEnFrançais} ${etudiant.prenomEnFrançais}` : "Inconnu";
      totalAbsences++;

      doc.setTextColor(0, 0, 255); // Couleur du texte en bleu
      doc.setFontSize(16);
      doc.text(`Rapport des absences pour l'étudiant ${etudiantId} ${nomEtudiant}`, marginLeft, yPos);

      doc.setTextColor(0, 0, 0); // Couleur du texte en noir
      doc.setFontSize(12);
      yPos += 10;

      doc.text(`Date d'absence : ${absence.dateAbsence}`, marginLeft, yPos);
      doc.text(`Module : ${nomModule}`, marginLeft, yPos + 5);
      doc.text(`Créneau horaire : ${absence.creneauHoraire}`, marginLeft, yPos + 10);
      doc.text(`Présence du professeur : ${nomProfesseur}`, marginLeft, yPos + 15);
      doc.text(`Justification : ${absence.justification}`, marginLeft, yPos + 20);

      yPos += 30;

    }
    console.log("Total des absences de l'étudiant:", totalAbsences); // Afficher le total des absences dans la console

    if (totalAbsences > 3) {
      console.log("L'étudiant a dépassé deux absences.");

      doc.setTextColor(255, 0, 0); // Couleur du texte en rouge
      doc.setFontSize(14);
      doc.text("Attention : L'étudiant a dépassé 3 absences.", marginLeft, yPos + 10);
    }
    doc.save(`rapport_absences_etudiant_${etudiantId}.pdf`);
  }

  generatePdfReport() {
    this.generatePdf(this.AbsenceSource);
  }

  generatePdfReportForStudent(etudiantId: string) {
    const absencesForStudent = this.AbsenceSource.filter(absence => absence.etudiantId === etudiantId);
    this.generatePdfForStudent(absencesForStudent, etudiantId);
  }



  fetchAllAbsences() {
    this.absenceService.getAllAbsences().subscribe(
      (data: Absence[]) => {
        this.AbsenceSource = data;
      },
      error => {
        console.log('Error fetching absences: ', error);
      }
    );
  }

}
