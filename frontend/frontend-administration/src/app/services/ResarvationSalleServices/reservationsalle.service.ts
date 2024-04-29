import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import { Salle } from '../../models/ReservationSalleModel/salle';

let URL=environment.GATEWAY+environment.RESERVATIONSALLE_SERVICE;

@Injectable({
  providedIn: 'root'
})

export class ReservationsalleService {

  constructor(private http: HttpClient) { }
  
  getAllSalles(): Observable<Salle[]> {
    return this.http.get<Salle[]>(URL);
  }

  getSalleById(id: number): Observable<Salle> {
    return this.http.get(URL + id);
  }

  addSalle(salle: Salle): Observable<Salle> {
    return this.http.post<Salle>(URL+`/add`, salle);
  }
  

}
