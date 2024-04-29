import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

let URL=environment.GATEWAY+environment.PROFESSEUR_SERVICE;

@Injectable({
  providedIn: 'root'
})
export class ProfesseurService {

  constructor(private http: HttpClient) {
  }


  getProfById(id: number): Observable<any> {
    return this.http.get(URL + id);
  }
}
