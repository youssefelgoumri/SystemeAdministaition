import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResultatRattrapageElement } from '../models/RattModel/resultat-rattrapage-element';
import { RessultatRattrapage } from '../models/RattModel/ressultat-rattrapage';

let _URL=environment.GATEWAY+environment.DELEB_RATT_SERVICE;
let _URLDO=environment.GATEWAY+environment.DELEB_OR_SERVICE
@Injectable({
  providedIn: 'root'
})
export class DelebrationrattrapageService {

  constructor(private http:HttpClient) { }

  getAllResultatModule():Observable<any>{
    return this.http.get(_URL+"/module")
  }
// resultatelmmod/{CNE},{FiliereID},{ModuleID},{SemestreID}
  getResultatRattByid(cne:string,FiliereID:number,moduleID:number,semestreID:string):Observable<any>{
    return this.http.post(_URL+"/resultatelmmod/"+cne+","+FiliereID+","+moduleID+","+semestreID,
    { headers: { "Content-Type": "application/json; charset=UTF-8"}});
  }

  editElement(rre : ResultatRattrapageElement):Observable<any>{
    return this.http.put(_URL+"/element/edit",JSON.stringify(rre),
    { headers: { "Content-Type": "application/json; charset=UTF-8"}});
  }

  editModule(rr : RessultatRattrapage):Observable<any>{
    return this.http.put(_URL+"/module/edit",JSON.stringify(rr),
    { headers: { "Content-Type": "application/json; charset=UTF-8"}});
  }

  addFromExcel(rr : RessultatRattrapage):Observable<any>{
    // /http://localhost:9999/delibration/rattrapages/module/add 

    return this.http.post(_URL +"/module/add",JSON.stringify(rr),
    { headers: { "Content-Type": "application/json; charset=UTF-8"}});
  }

  addFromExcelElement(rre : ResultatRattrapageElement):Observable<any>{
    // /http://localhost:9999/delibration/rattrapages/module/add 

    return this.http.post(_URL +"/element/add",JSON.stringify(rre),
    { headers: { "Content-Type": "application/json; charset=UTF-8"}});
  }

  // elmmod/{CNE},{ModuleID},{FiliereID},{SemestreID}
  getResultatORByid(cne:string,FiliereID:number,moduleID:number,semestreID:string):Observable<any>{
    return this.http.get(_URLDO+"/elmmod/"+cne+","+moduleID+","+FiliereID+","+semestreID);
  }

  getModuleById(moduleId : number): Observable<any>{
    let url = `${environment.GATEWAY+environment.MODULE_SERVICE}/${moduleId}` ;
    return this.http.get(url);
  }
  getModules(): Observable<any>{
    let url = `${environment.GATEWAY+environment.MODULE_SERVICE}` ;
    return this.http.get(url);
  }
  getFilieres(): Observable<any>{
    let url = `${environment.GATEWAY+environment.FILIERE_SERVICE}` ;
    return this.http.get(url);
  }

  getElementById(elementID : number): Observable<any>{
    let url = `${environment.GATEWAY}SERVICE-MODULE/elements/${elementID}` ;
    return this.http.get(url);
  }
  getFiliereById(filiereID:any): Observable<any>{
    let url = `${environment.GATEWAY+environment.FILIERE_SERVICE}/${filiereID}` ;
    return this.http.get(url);
  }

  // @GetMapping("module/toexcel/{filiereid},{moduleId},{semestreId}")
  moduletoexcel(filiereid : number,moduleId : number,semestreId : string) : Observable<any>{
    return this.http.get(`${_URL}/module/toexcel/${filiereid},${moduleId},${semestreId}`, { responseType: 'blob' });
  }


}
