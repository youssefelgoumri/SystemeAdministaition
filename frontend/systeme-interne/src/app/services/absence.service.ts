import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Absence } from 'src/app/models/absence/absence';

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {
  private baseUrl = 'http://localhost:2020/absences'; // Assurez-vous de mettre à jour l'URL de votre API

  constructor(private http: HttpClient) { }

  addAbsence(absence: Absence): Observable<any> {
    return this.http.post(`${this.baseUrl}/`, absence);
  }

  getAllAbsences(): Observable<Absence[]> {
    return this.http.get<Absence[]>(`${this.baseUrl}/`);
  }

  getAbsenceById(absenceId: number): Observable<Absence> {
    return this.http.get<Absence>(`${this.baseUrl}/${absenceId}`);
  }

  updateAbsence(absenceId: number, updatedAbsence: Absence): Observable<Absence> {
    return this.http.put<Absence>(`${this.baseUrl}/${absenceId}`, updatedAbsence);
  }

  deleteAbsence(absenceId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${absenceId}`);
  }

  downloadAbsenceReportForEtudiant(etudiantId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/rapport/${etudiantId}`, { responseType: 'blob' });
  }

  generateRapportPDF(etudiantId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/rapportpdf/${etudiantId}`, { responseType: 'blob' });
  }
}
