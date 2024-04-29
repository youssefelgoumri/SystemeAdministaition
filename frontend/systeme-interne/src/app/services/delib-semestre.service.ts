import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResultatSemestre } from '../models/SemestreDelibModel/resultat-semestre';

@Injectable({
  providedIn: 'root'
})
export class DelibSemestreService {

  constructor(private http:HttpClient) { }

  getAllDelib():Observable<any>{
    return this.http.get(environment.GATEWAY+"DELIBERATION-SEMESTRE-SERVICE/delibration/semestre")
  }
  getFiliereById(filiereID:any): Observable<any>{
    let url = `http://localhost:2222/STRUCTURE-ENSEIGNEMENT-SERVICE/filieres/${filiereID}` ;
    return this.http.get(url,{ headers: { "Content-Type": "application/json; charset=UTF-8"}});
  }

  getResult(rs:ResultatSemestre):Observable<any>{
    // /delibration/semestre/etdsemestre
    let url = `${environment.GATEWAY}DELIBERATION-SEMESTRE-SERVICE/delibration/semestre/add` ;
    
    return this.http.post(url,JSON.stringify(rs),
    { headers: { "Content-Type": "application/json; charset=UTF-8"}});
  }

  semestretoexcel(cne : string,semestreId : string) : Observable<any>{
    return this.http.get(`${environment.GATEWAY}DELIBERATION-SEMESTRE-SERVICE/delibration/semestre/generate/${semestreId}/${cne}`, { responseType: 'blob' });
  }

  getModules(): Observable<any>{
    let url = `${environment.GATEWAY+environment.MODULE_SERVICE}` ;
    return this.http.get(url);
  }
  getFilieres(): Observable<any>{
    let url = `${environment.GATEWAY+environment.FILIERE_SERVICE}` ;
    return this.http.get(url);
  }

}
