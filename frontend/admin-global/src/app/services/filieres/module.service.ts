import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Module } from 'src/app/models/filiereModel/ModuleModel/module';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  private apiUrl = 'http://localhost:2222/SERVICE-MODULE/modules'; // Remplacez l'URL par l'API réelle

  constructor(private http: HttpClient) { }
  getAllModules(): Observable<Module[]> {
    const url = `${this.apiUrl}`;
    return this.http.get<Module[]>(url);
  }
  // Méthode pour récupérer un module par son ID
  getModuleById(moduleId: number): Observable<Module> {
    const url = `${this.apiUrl}/${moduleId}`;
    return this.http.get<Module>(url);
  }

}
