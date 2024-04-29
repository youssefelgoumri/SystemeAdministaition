import { Component } from '@angular/core';
import { AbsenceService } from 'src/app/services/absence.service';
import { Absence } from 'src/app/models/absence/absence';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from "@angular/material/snack-bar";
import { Router } from '@angular/router';
@Component({
  selector: 'app-gestion-absence',
  templateUrl: './gestion-absence.component.html',
  styleUrls: ['./gestion-absence.component.css']
})
export class GestionAbsenceComponent {
  absences: Absence[] = [];
  errorMessage: string = '';
  isSidebarOpen: string = "open";
  search!: Event;
  absenceForm!: FormGroup;
  successMessage: string = ''; // Nouvelle propriété pour stocker le message de succès
  profID!:number

  constructor(private route:Router ,private absenceService: AbsenceService, private fb: FormBuilder,    private snackBar: MatSnackBar
  ) {
    this.profID=parseInt(this.route.url.split("/")[2])
    this.createForm();
    this.isSidebarOpen="open";
  }
  createForm() {
    this.absenceForm = this.fb.group({
      etudiantId: ['', Validators.required],
      matiereId: ['', Validators.required],
      professeurId: ['', Validators.required],
      dateAbsence: ['', Validators.required],
      creneauHoraire: ['', Validators.required],
      presenceProfesseur: [false, Validators.required],
      justification: ['']
    });
  }

  addAbsence() {
    const formData = this.absenceForm.value;
    const newAbsence: Absence = {
      id: 0, // L'ID sera généré par le serveur
      etudiantId: formData.etudiantId,
      matiereId: formData.matiereId,
      professeurId: formData.professeurId,
      dateAbsence: formData.dateAbsence,
      creneauHoraire: formData.creneauHoraire,
      presenceProfesseur: formData.presenceProfesseur,
      justification: formData.justification
    };

    this.absenceService.addAbsence(newAbsence)
      .subscribe(
        (addedAbsence: Absence) => {
          this.absences.push(addedAbsence); // Ajouter l'absence à la liste des absences
          this.absenceForm.reset(); // Réinitialiser le formulaire après l'ajout
          this.successMessage = 'Absence ajoutée avec succès.'; // Définir le message de succès
          setTimeout(() => {
            this.successMessage = ''; // Effacer le message après quelques secondes
          }, 3000);
        },

        (error) => {
          this.errorMessage = 'Une erreur s\'est produite lors de l\'ajout de l\'absence.';
          console.error(error);
        }
      );
  }
  getAllAbsences(): void {
    this.absenceService.getAllAbsences()
      .subscribe(
        (absences: Absence[]) => {
          this.absences = absences;
        },
        (error) => {
          this.errorMessage = 'Une erreur s\'est produite lors de la récupération des absences.';
          console.error(error);
        }
      );
  }

  // Autres méthodes pour implémenter les fonctionnalités supplémentaires
  onSidebarToggle(isOpen: string) {
    this.isSidebarOpen = isOpen;
  }
  applyFilter(event: Event) {
    this.search=event;
    const filterValue = (this.search.target as HTMLInputElement).value;
  }
  ngOnInit(): void {
    this.getAllAbsences();
  }
}
