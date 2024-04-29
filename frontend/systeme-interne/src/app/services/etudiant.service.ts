import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Etudiant } from 'src/app/models/Etudiant/etudiant';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
  private apiUrl = 'http://localhost:2222/SERVICE-INSCRIPTIONADMINISTRATIVE/etudiantsAdministratifs'; // Remplacez l'URL par l'API réelle

  constructor(private http: HttpClient) {
  }

  // Méthode pour récupérer un étudiant par son massar
  getEtudiantByMassar(massar: string): Observable<Etudiant> {
    const url = `${this.apiUrl}/${massar}`;
    return this.http.get<Etudiant>(url);
  }
}
