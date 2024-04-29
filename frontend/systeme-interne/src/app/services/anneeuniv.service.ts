import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AnneeUniv } from '../components/anneeunivcomo/anneeuniv/anneeuniv.component';

let _URL=environment.GATEWAY+environment.ANNEE_UNIV
@Injectable({
  providedIn: 'root'
})
export class AnneeunivService {

  constructor(private http:HttpClient) { }

  getAllUniv():Observable<any>{
    return this.http.get(_URL+"/all");
  }

  addUniv(anneeUniversitaire: AnneeUniv): Observable<any> {
    return this.http.post(_URL+"/add",JSON.stringify(anneeUniversitaire),
    { headers: { "Content-Type": "application/json; charset=UTF-8"}});
  }

  deleteUniv(id:number):Observable<any>{
    return this.http.delete(_URL+"/delete/"+id);
  }

  editUniv(anneeUniversitaire:AnneeUniv):Observable<any>{
    return this.http.put(_URL+"/edit/"+anneeUniversitaire.id,JSON.stringify(anneeUniversitaire),
    { headers: { "Content-Type": "application/json; charset=UTF-8"}});
  }
}
