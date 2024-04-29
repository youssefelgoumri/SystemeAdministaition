import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddModuleComponent } from '../add-module/add-module.component';
import { DeleteModuleConfirmationComponent } from '../delete-module-confirmation/delete-module-confirmation.component';

export interface Responsable{
  id: number;
  nom: string ;
  prenom: string ;
  modules: Module[];
}

export interface Element{
  id: number;
  partieCours: string;
  partieTPs: string;
  coefficientCours: number;
  coefficientTPs: number;
  controbution: number;
  module: Module;
}

export interface Module{
  id: number;
  intitule:  string;
  elementsModule: Element[];
  responsableModule: Responsable;
}

@Component({
    selector: 'app-modules-home',
    templateUrl: './modules-home.component.html',
    styleUrl: './modules-home.component.css'
})
export class ModulesHomeComponent implements AfterViewInit {
  modules: Module[] = []
  displayedColumns: string[] = ['intitulé', 'nombre élément', 'nom responsable', 'actions'];
  ModulesSource!: MatTableDataSource<Module>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isSidebarOpen: string = "open";
  search!: Event;

  constructor(private route: Router, private dialog: MatDialog, private http: HttpClient, private snackBar: MatSnackBar) {
    this.ModulesSource = new MatTableDataSource(this.modules);

    http.get<Module[]>('http://localhost:2222/SERVICE-MODULE/modules').subscribe(
      (modules) => {
        this.modules = modules;
        this.ModulesSource.data =this.modules;
      },
      (error) => {
        console.error('Une erreur s\'est produite lors du chargement des modules :', error);
      }
    );
    this.ModulesSource = new MatTableDataSource(this.modules);
  }

  ngAfterViewInit() {
    this.ModulesSource.paginator = this.paginator;
    this.ModulesSource.sort = this.sort;
  }

  onSidebarToggle(isOpen: string) {
    this.isSidebarOpen = isOpen;
  }

  applyFilter(event: Event) {
    this.search = event;
    const filterValue = (this.search.target as HTMLInputElement).value;
    this.ModulesSource.filter = filterValue.trim().toLowerCase();

    if (this.ModulesSource.paginator) {
      this.ModulesSource.paginator.firstPage();
    }
  }

  showMoreRow(row: Module) {
    this.route.navigateByUrl("modules/"+ row.id + "/elements");
  }

  updateRow(row: Module): void {
  //   const dialogRef = this.dialog.open(EditeConfirmationDialogComponentComponent, {
  //     data: row // Pass the row data to the dialog
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       console.log('Updated row:', result);
  //       this.editEtablissement(result); // Call the editEtablissement function with the updated data
  //     } else {
  //       console.log('Edit canceled');
  //     }
  //   });
  }


  // editEtablissement(updatedEtablissement: Etablissement) {
  //   const codeName = updatedEtablissement.codeName;

  //   this.http.put(`http://localhost:2222/SERVICE-MODULE/modules/edit/${codeName}`, updatedEtablissement).subscribe(
  //     () => {
  //       this.getData(); // Update the table data
  //       this.snackBar.open('Etablissement updated successfully', 'Close', {
  //         duration: 3000,
  //       });
  //     },
  //     (error) => {
  //       console.error('Error occurred:', error);
  //       this.snackBar.open('Failed to update etablissement', 'Close', {
  //         duration: 3000,
  //         panelClass: ['error-snackbar'],
  //       });
  //     }
  //   );
  // }


  deleteRow(row: Module) {
    const dialogRef = this.dialog.open(DeleteModuleConfirmationComponent, {
      height: '25%',
      width: '40%',
      data: `êtes vous certain(e) de vouloir supprimer le module intitulé\n${row.intitule}?`
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.response){
        this.http.delete(`http://localhost:2222/SERVICE-MODULE/modules/delete/${row.id}`).subscribe(() => {
          this.http.get<Module[]>('http://localhost:2222/SERVICE-MODULE/modules').subscribe(
            (modules) => {
              this.modules = modules;
              this.ModulesSource.data =this.modules;
            },
            (error) => {
              console.error('Une erreur s\'est produite lors du chargement des modules :', error);
            }
          );
          this.ModulesSource = new MatTableDataSource(this.modules);
          this.ngAfterViewInit();
          this.snackBar.open('Module supprimer avec succe', 'Fermer', { duration: 2000 });
        },
        (error) => {
          console.error('Une erreur s\'est produite lors de la suppression du module :', error);
          this.snackBar.open('La suppression du module a échoué', 'Fermer', {
                    duration: 2500,
                    panelClass: ['error-snackbar'],
                  });
        });
      }
    });

  }

  openAddModuleDialog(){
    const dialogRef = this.dialog.open(AddModuleComponent, {
            width: '50%',
          });
          dialogRef.afterClosed().subscribe(result => {
            if (result){
              console.log(result);
              this.http.post<Module>('http://localhost:2222/SERVICE-MODULE/modules/add', {
                "intitule": result.module.intitule,
                "responsableModule": {
                  "id": result.module.responsable.id,
                  "nom": result.module.responsable.nom,
                  "prenom": result.module.responsable.prenom
                }
              }).subscribe(
                (module) => {
                  if (result.module.contributionCours && result.module.contributionTP){
                    this.http.post<Element>('http://localhost:2222/SERVICE-MODULE/elements/add', {
                      "coefficientCours": result.module.contributionCours,
                      "coefficientTPs": result.module.contributionTP,
                      "module": {
                        "id": module.id
                      }
                    }).subscribe();
                  }
                  else {
                    result.module.element.map((element:Element)=>{
                      this.http.post<Element>('http://localhost:2222/SERVICE-MODULE/elements/add', {
                        "partieCours": element.partieCours,
                        "partieTPs": element.partieTPs,
                        "coefficientCours": element.coefficientCours,
                        "coefficientTPs": element.coefficientTPs,
                        "contribution": element.controbution,
                        "module": {
                          "id": module.id
                        }
                      }).subscribe(
                        (element) => {
                          this.http.get<Module[]>('http://localhost:2222/SERVICE-MODULE/modules').subscribe(
                            (modules) => {
                              this.modules = modules;
                              this.ModulesSource.data =this.modules;
                            },
                            (error) => {
                              console.error('Une erreur s\'est produite lors du chargement des modules :', error);
                            }
                          );
                        },
                        (error) => {
                          console.error('Une erreur s\'est produite lors d\'ajout de cet élément :', error);
                        }
                      );
                    });
                  }
                  
                  this.modules.push(module);
                  this.ModulesSource.data =this.modules;
                },
                (error) => {
                  console.error('Une erreur s\'est produite lors d\'ajout du module :', error);
                }
              );
            }
          });
  }
}