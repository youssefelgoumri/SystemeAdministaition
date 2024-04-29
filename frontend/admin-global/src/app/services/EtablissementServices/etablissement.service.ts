import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Etablissement} from "../../models/etablissementModel/etablissement";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

let _URL=environment.GATEWAY+environment.ETAB_SERVICE;
let _URLmod = environment.GATEWAY+environment.MODULE_SERVICE;
let _URLFil = environment.GATEWAY+environment.FILIERE_SERVICE

@Injectable({
  providedIn: 'root'
})
export class EtablissementService {

  constructor(private http: HttpClient) { }

  AllEtablisements():Observable<any>{
    // console.log(this.http.get("http://localhost:2222/ETABLISSEMENT-SERVICE/etablissements"))
    return this.http.get(_URL);
  }

  getEtabByCodeName(codeName : string):Observable<any>{
    return this.http.get(_URL+`/${codeName}`)
  }

  deleteFiliereFromEtab(codename:string,idfiliere:number):Observable<any>{
    return this.http.post(_URL+"/deleteFiliereFromEtab/"+codename+"/"+idfiliere,
    { headers: { "Content-Type": "application/json; charset=UTF-8"}});
  }

  addEtab(e : Etablissement):Observable<any>{
    return this.http.post(_URL+"/add",JSON.stringify(e),
    { headers: { "Content-Type": "application/json; charset=UTF-8"}});
  }
  getAllfiliere():Observable<any>{
    return this.http.get(_URLFil);
  }

  affectFiliereToEtab( codeName: string,  idfiliere: number):Observable<any> {
    return this.http.post(_URL+"/affectFiliere/"+idfiliere+"/to/"+codeName,
    { headers: { "Content-Type": "application/json; charset=UTF-8"}});
  }
  }
// }http://localhost:2222/ETABLISSEMENT-SERVICE/etablissements/affectFiliere/1/to/FSM
