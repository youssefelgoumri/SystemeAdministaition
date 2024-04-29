import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import { Professeur } from '../models/ProfModel/professeur';

let  _URLProf=environment.GATEWAY+environment.PROFESSEUR_SERVICE;
let  _URLEtab=environment.GATEWAY+environment.ETAB_SERVICE;
@Injectable({
  providedIn: 'root'
})
export class ProfesseurService {

  constructor(private http:HttpClient) { }

  getAllProf():Observable<any>{
    return this.http.get(_URLProf);
  }

  deleteProf(id :  number){
      let url = `${_URLProf}/delete/${id}` ;
      return this.http.delete(url);
  }

  addProf(prof : Professeur) : Observable<any>{
    return  this.http.post(_URLProf+"/add", JSON.stringify(prof),
    { headers: { "Content-Type": "application/json; charset=UTF-8"}});
  }

  editProf(prof : Professeur) : Observable<any>{
    return this.http.put(`${_URLProf}/edit/${prof.id}`,JSON.stringify(prof),
    { headers: { "Content-Type": "application/json; charset=UTF-8"}});
  }

  getAllEtablissement(): Observable<any>{
    return this.http.get(_URLEtab)
  }

  getProfByid(id:number):Observable<any>{
    return this.http.get(`${_URLProf}/${id}`);
  }

  updateProfessor(prof : Professeur) : Observable<any> {
    return this.http.put(_URLProf+"/edit/"+prof.id,JSON.stringify(prof),
    { headers: { "Content-Type": "application/json; charset=UTF-8"}});
  }

  getalletudient():Observable<any>{

    return this.http.get(environment.GATEWAY+"/SERVICE-INSCRIPTIONADMINISTRATIVE/etudiantsAdministratifs")
  }
}
