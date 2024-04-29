import { Component } from '@angular/core';
import {Reservation} from "../../../models/reservationModel/reservation";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-prof-reserve-salle',
  templateUrl: './prof-reserve-salle.component.html',
  styleUrls: ['./prof-reserve-salle.component.css']
})
export class ProfReserveSalleComponent {
  reservations: Reservation[] = [];
  profId: number | null = null;
  isSidebarOpen: string = "open";
  search!: Event;
  constructor(private http: HttpClient) {
    this.isSidebarOpen="open";
  }
  onSidebarToggle(isOpen: string) {
    this.isSidebarOpen = isOpen;
  }
  applyFilter(event: Event) {
    this.search=event;
    const filterValue = (this.search.target as HTMLInputElement).value;
  }

  fetchReservations(): void {
    if (this.profId !== null) {
      const url = `http://localhost:2222/RESERVATIONSALLE-SERVICE/ReservationSalle/${this.profId}/profreserved`;

      this.http.get<Reservation[]>(url)
        .subscribe(reservations => {
          this.reservations = reservations;
        });
    } else {
      console.error('Professor ID is not valid.');
    }
  }
}
