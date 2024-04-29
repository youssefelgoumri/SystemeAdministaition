import {Component, ElementRef, Renderer2} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DatePipe} from "@angular/common";
import {Salle} from "../../../models/Sallesmodel/salle";

@Component({
  selector: 'app-free-salles',
  templateUrl: './free-salles.component.html',
  styleUrls: ['./free-salles.component.css']
})
export class FreeSallesComponent {
  consultData: any = {};
  salles: Salle[] = [];
  isSidebarOpen: string = "open";
  search!: Event;
  constructor(private http: HttpClient,private datePipe: DatePipe) {
    this.isSidebarOpen="open";
  }
  onSidebarToggle(isOpen: string) {
    this.isSidebarOpen = isOpen;
  }
  applyFilter(event: Event) {
    this.search=event;
    const filterValue = (this.search.target as HTMLInputElement).value;
  }

  onConsult(): void {
    // Validate the input data
    if (!this.consultData.dateDebut || !this.consultData.dateFin) {
      console.error('Please enter valid date and time ranges.');
      return;
    }

    // Convert input dates to Date objects
    const dateDebut = new Date(this.consultData.dateDebut);
    const dateFin = new Date(this.consultData.dateFin);

    // Check if end date is greater than start date
    if (dateFin < dateDebut) {
      console.error('End date and time must be greater than start date and time.');
      return;
    }

    // Check if dates are the same
    if (dateDebut.toDateString() === dateFin.toDateString()) {
      // Check if start time is greater than end time
      if (dateDebut.getTime() >= dateFin.getTime()) {
        console.error('Start time must be earlier than end time on the same day.');
        return;
      }
    }



    this.consultData.dateDebut = this.datePipe.transform(this.consultData.dateDebut, 'yyyy-MM-dd HH:mm:ss');
    this.consultData.dateFin = this.datePipe.transform(this.consultData.dateFin, 'yyyy-MM-dd HH:mm:ss');
    // Log the entered dates to the console
    console.log('Date Début:', this.consultData.dateDebut);
    console.log('Date Fin:', this.consultData.dateFin);

    // Construct the URL with the endpoint for searching free salles
    const url = 'http://localhost:2222/RESERVATIONSALLE-SERVICE/ReservationSalle/freeSalles';

    // Send the HTTP POST request to search for free salles
    this.http.post<any[]>(url, this.consultData).subscribe(
      (response) => {
        console.log('Free salles search successful:', response);
        this.salles = response; // Store the response in the salles array
        console.log('Free salles search successful:', this.salles);
      },
      (error) => {
        console.error('Error occurred during free salles search:', error);
        // Handle the error appropriately, e.g., display an error message to the user
      }
    );
  }
}
