import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { Filiere } from "../../../models/filiereModel/filiere";
import { FiliereService } from "../../../services/filieres/filiere-service.service";
import { DialogAddComponent } from "../dialog-add/dialog-add.component";
import { Module } from "../../../models/filiereModel/ModuleModel/module"; // Importez le modèle de Module si ce n'est pas déjà fait

import { EditDialogComponent } from "../edit-dialog/edit-dialog.component";
import {ModuleService} from "../../../services/filieres/module.service";

@Component({
  selector: 'app-filieres',
  templateUrl: './filieres.component.html',
  styleUrls: ['./filieres.component.css']
})
export class FilieresComponent implements OnInit {
  filiereDataSource: MatTableDataSource<Filiere>;
  modules: Module[] = []; // Ajoutez la liste des modules
  displayedColumns: string[] = ['id', 'nom', 'nombreAnnees', 'nombreSemestresParAnnee', 'semestres', 'responsable', 'actions'];
  isSidebarOpen: string = "open";
  modulen: { [key: number]: Module } = {};

  search!: Event;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private filiereService: FiliereService, private snackBar: MatSnackBar, private dialog: MatDialog, private moduleService: ModuleService
  ) {
    this.filiereDataSource = new MatTableDataSource<Filiere>();
    this.loadFilieres();
    this.loadModules();


  }

  ngOnInit() {
    this.loadFilieres();
    this.loadModules();

  }

  loadFilieres(): void {
    this.filiereService.getAllFilieres().subscribe(filieres => {
      console.log("Données récupérées :", filieres); // Afficher les données récupérées dans la console
      this.filiereDataSource.data = filieres;
      this.filiereDataSource.paginator = this.paginator;
      this.filiereDataSource.sort = this.sort;
    });
  }
  loadModules(): void {
    this.moduleService.getAllModules().subscribe(modules => {
      console.log("Modules chargés :", modules);
      this.modules = modules;
      this.modules.forEach(module => {
        this.modulen[module.id] = module;
      });
    });
  }
  getModuleName(moduleId: number): string {
    console.log('Récupération du nom du module pour l\'ID', moduleId);
    const module = this.modulen[moduleId];
    return module ? module.intitule : '';
  }

  openAddFiliereDialog(): void {
    const dialogRef = this.dialog.open(DialogAddComponent, {
      width: '900px',
      height: '500px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.loadFilieres();

    });
  }
  ngAfterViewInit(): void {
    this.filiereDataSource.paginator = this.paginator;
    this.filiereDataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    this.search=event;
    const filterValue = (this.search.target as HTMLInputElement).value;
    this.filiereDataSource.filter = filterValue.trim().toLowerCase();
    if (this.filiereDataSource.paginator) {
      this.filiereDataSource.paginator.firstPage();
    }
  }

  /*clearFilter(): void {
    this.search = '';
    this.applyFilter();
  }*/

  onSidebarToggle(isOpen: string) {
    this.isSidebarOpen = isOpen;
  }

  editFiliere(filiere: Filiere): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '500px',
      data: filiere
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.filiereService.editFiliere(result.id, result).subscribe(updatedFiliere => {
          this.snackBar.open("Filière mise à jour avec succès", "Fermer", {
            duration: 2000,
          });
          // Assurez-vous que les données sont correctement mises à jour dans la source de données
          const index = this.filiereDataSource.data.findIndex(f => f.id === updatedFiliere.id);
          if (index !== -1) {
            this.filiereDataSource.data[index] = updatedFiliere;
            this.filiereDataSource.data = [...this.filiereDataSource.data];
          }
        }, error => {
          console.error("Erreur lors de la mise à jour de la filière:", error);
          this.snackBar.open("Une erreur s'est produite lors de la mise à jour de la filière", "Fermer", {
            duration: 2000,
          });
        });
      }
    });
  }


  deleteFiliere(filiere: Filiere): void {
    // Logique pour supprimer la filière
    const confirmation = confirm("Voulez-vous vraiment supprimer cette filière ?");
    if (confirmation) {
      this.filiereService.deleteFiliere(filiere.id).subscribe(() => {
        this.snackBar.open("Filière supprimée avec succès", "Fermer", {
          duration: 2000,
        });
        // Recharger les filières après suppression
        this.loadFilieres();
      });
    }
  }

}
