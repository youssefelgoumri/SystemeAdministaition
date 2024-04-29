import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Filiere } from 'src/app/models/filiereModel/filiere';
import { Semestre } from 'src/app/models/filiereModel/semestre';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FiliereService {
  private baseUrl = environment.GATEWAY+environment.FILIERE_SERVICE;

  constructor(private http: HttpClient) { }

  getAllFilieres(): Observable<Filiere[]> {
    return this.http.get<Filiere[]>(this.baseUrl);
  }

  getFiliereById(filiereId: number): Observable<Filiere> {
    return this.http.get<Filiere>(`${this.baseUrl}/${filiereId}`);
  }

  addFiliere(filiere: Filiere, responsableId: number): Observable<Filiere> {
    return this.http.post<Filiere>(`${this.baseUrl}/add?responsableId=${responsableId}`, filiere);
  }

  editFiliere(id: number, filiere: Filiere): Observable<Filiere> {
    return this.http.put<Filiere>(`${this.baseUrl}/${id}`, filiere);
  }

  deleteFiliere(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
