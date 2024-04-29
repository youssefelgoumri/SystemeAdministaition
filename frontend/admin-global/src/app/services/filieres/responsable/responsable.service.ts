import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Responsable } from 'src/app/models/filiereModel/responsable';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResponsableFiliereService {
  private baseUrl = environment.GATEWAY+environment.RESPO_SERVICE;

  constructor(private http: HttpClient) { }

  getAllResponsableFilieres(): Observable<Responsable[]> {
    return this.http.get<Responsable[]>(this.baseUrl);
  }

  createResponsableFiliere(responsableFiliere: Responsable): Observable<Responsable> {
    return this.http.post<Responsable>(this.baseUrl, responsableFiliere);
  }

  getResponsableFiliereById(responsableFiliereId: number): Observable<Responsable> {
    return this.http.get<Responsable>(`${this.baseUrl}/${responsableFiliereId}`);
  }

  updateResponsableFiliere(responsableFiliereId: number, responsableFiliere: Responsable): Observable<Responsable> {
    return this.http.put<Responsable>(`${this.baseUrl}/${responsableFiliereId}`, responsableFiliere);
  }

  deleteResponsableFiliere(responsableFiliereId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${responsableFiliereId}`);
  }
}
