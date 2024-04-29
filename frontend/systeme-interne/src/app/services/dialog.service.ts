import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import {Absence} from "../models/absence/absence"; // Importez votre composant de mise à jour d'absence
import {UpdateAbsenceDialogComponent} from "src/app/components/absence-admin/update-absence-dialog/update-absence-dialog.component"
@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openUpdateAbsenceDialog(absence: Absence): Observable<Absence | undefined> {
    const dialogRef = this.dialog.open(UpdateAbsenceDialogComponent, {
      width: '500px',
      data: absence
    });

    return dialogRef.afterClosed();
  }
}
