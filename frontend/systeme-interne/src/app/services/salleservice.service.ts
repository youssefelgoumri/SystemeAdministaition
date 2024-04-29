import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SalleserviceService {
  constructor(private http: HttpClient) { }
  allSalles():Observable<any>{
    return this.http.get("http://localhost:2222/RESERVATIONSALLE-SERVICE/ReservationSalle");
  }


}
