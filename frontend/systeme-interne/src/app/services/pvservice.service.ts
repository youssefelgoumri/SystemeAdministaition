import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import { Plandevalidation } from '../models/PlanDeValidationModel/plandevalidation';
import { Plandevalidationid } from '../models/PlanDeValidationModel/plandevalidationid';
import { Plandevalidationmodule } from '../models/PlanDeValidationModel/plandevalidationmodule';
import { Plandevalidationmoduleid } from '../models/PlanDeValidationModel/plandevalidationmoduleid';


let  _URLpv=environment.GATEWAY+environment.DELIB_ORDINAIRE_SERVICE;
let  _URLPvModule=environment.GATEWAY+environment.DELIB_ORDINAIRE_SERVICE;
let  _URLEtab=environment.GATEWAY+environment.ETAB_SERVICE;

@Injectable({
  providedIn: 'root'
})
export class PvserviceService {

  constructor(private http:HttpClient) { }

  getAllPVs():Observable<any>{
    let url = `${_URLpv}/elements` ;
    return this.http.get(url);
  }

  deletePlanDeValidation(pvid : Plandevalidationid){
      let url = `${_URLpv}/element/delete` ;
      return this.http.delete(url);
  }

  addPlanDeValidation(pv : Plandevalidation) : Observable<any>{
    return  this.http.post(_URLpv+"/element/add", JSON.stringify(pv),
    { headers: { "Content-Type": "application/json; charset=UTF-8"}});
  }

  editPlanDeValidation(pv : Plandevalidation) : Observable<any>{
    return this.http.put(`${_URLpv}/element/edit`,JSON.stringify(pv),
    { headers: { "Content-Type": "application/json; charset=UTF-8"}});
  }

  toexcel() : Observable<any>{
    return this.http.get(`${_URLpv}/toexcel`, { responseType: 'blob' });
  }



  getAllPVsModule():Observable<any>{
    let url = `${_URLPvModule}/modules` ;
    return this.http.get(url);
  }

  deletePlanDeValidationModule(pvmoduleid : Plandevalidationmoduleid){
      let url = `${_URLPvModule}/module/delete` ;
      return this.http.delete(url);
  }

  addPlanDeValidationModule(pvmodule : Plandevalidationmodule) : Observable<any>{
    return  this.http.post(_URLPvModule+"/module/add", JSON.stringify(pvmodule),
    { headers: { "Content-Type": "application/json; charset=UTF-8"}});
  }

  editPlanDeValidationModule(pvmodule : Plandevalidationmodule) : Observable<any>{
    return this.http.put(`${_URLPvModule}/module/edit`,JSON.stringify(pvmodule),
    { headers: { "Content-Type": "application/json; charset=UTF-8"}});
  }

  moduletoexcel(moduleID : number) : Observable<any>{
    return this.http.get(`${_URLPvModule}/moduletoexcel/${moduleID}`, { responseType: 'blob' });
  }
  
  getAllModules(): Observable<any>{
    let url = `http://localhost:2222/SERVICE-MODULE/modules` ;
    return this.http.get(url);
  }

  getModuleById(moduleId : number): any{
    let url = `http://localhost:2222/SERVICE-MODULE/modules/${moduleId}` ;
    return this.http.get(url);
  }

  getElementsOfModule(moduleId : number) : Observable<any>{
    let url = `${_URLpv}/${moduleId}/elements` ;
    return this.http.get(url);
  }

  getAllFilieres(): Observable<any>{
    // let url = `http://localhost:5555/filieres` ;
    let url = `${environment.GATEWAY+environment.FILIERE_SERVICE}` ;
    return this.http.get(url);
  }

  getFiliereById(filiereId:number): any{
    // let url = `http://localhost:5555/filieres/${filiereId}` ;
    let url = `${environment.GATEWAY+environment.FILIERE_SERVICE}/${filiereId}` ;
    return this.http.get(url);
  }

  getAllSemestres(): Observable<any>{
    let url = `http://localhost:2222/STRUCTURE-ENSEIGNEMENT-SERVICE/semestres` ;
    return this.http.get(url);
  }

  getElementById(elementId:number): any{
    let url = `http://localhost:2222/SERVICE-MODULE/elements/${elementId}` ;
    return this.http.get(url);
  }


  getallPVElementsByPVid(pvm:Plandevalidationmoduleid): Observable<Plandevalidation[]>{
    let url = `${_URLpv}/module/pvelements` ;
    
    return  this.http.post<Plandevalidation[]>(url, JSON.stringify(pvm),
    { headers: { "Content-Type": "application/json; charset=UTF-8"}})
  }

  getPlanDeValidation(ids: Plandevalidationid): Observable<Plandevalidation> {
    const url = `${_URLpv}/element/ids`;
    
    return  this.http.post<Plandevalidation>(url, JSON.stringify(ids),
    { headers: { "Content-Type": "application/json; charset=UTF-8"}})
  }

  getPlanDeValidationModule(ids: Plandevalidationmoduleid): Observable<Plandevalidationmodule> {
    const url = `${_URLpv}/module/ids`;
    
    return  this.http.post<Plandevalidationmodule>(url, JSON.stringify(ids),
    { headers: { "Content-Type": "application/json; charset=UTF-8"}})
  }

  addFromExcel(pvm : Plandevalidationmodule):Observable<any>{
    // /http://localhost:9999/delibration/rattrapages/module/add 

    return this.http.post(_URLpv +"/module/add",JSON.stringify(pvm),
    { headers: { "Content-Type": "application/json; charset=UTF-8"}});
  }

  addFromExcelElement(pv : Plandevalidation):Observable<any>{
    // /http://localhost:9999/delibration/rattrapages/module/add 

    return this.http.post(_URLpv +"/addAll",JSON.stringify(pv),
    { headers: { "Content-Type": "application/json; charset=UTF-8"}});
  }
}
