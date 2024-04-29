import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import {Reservation} from "../../models/reservationModel/reservation";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  faDashboard = faHome
  isClickeddashboard: boolean = false;
  isClickedprofesseur: boolean = false;
  isGestionRessourcesClicked: boolean = false;
  isConsultationClicked: boolean = false;
  isDeliberationClicked: boolean = false;
  isConsultationClickedlist: boolean = false;
  isClickedabsence:boolean = false;
  isClickedanneeuniv:boolean = false;


  @Output() sidebarToggle = new EventEmitter<string>();

  isSideBarOpen: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private cdr: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    // this.dashboard();
    const currentUrl = this.router.url;

    if (currentUrl.split("/")[1] == "dashboard") {
      this.isClickedprofesseur = false;
      this.isClickeddashboard = true;
      this.isGestionRessourcesClicked = false;
      this.isConsultationClicked = false;
      this.isDeliberationClicked = false;
      this.isClickedabsence=false;
    }
    if (currentUrl.split("/")[1] == "professeur") {
      this.isClickedprofesseur = true;
      this.isClickeddashboard = false;
      this.isGestionRessourcesClicked = false;
      this.isConsultationClicked = false;
      this.isDeliberationClicked = false;
      this.isClickedabsence=false

    }
    if (currentUrl.split("/")[1] == "absencesadmin") {
      this.isClickedprofesseur = false;
      this.isClickeddashboard = false;
      this.isGestionRessourcesClicked = false;
      this.isConsultationClicked = false;
      this.isDeliberationClicked = false;
      this.isClickedabsence=true;

    }
    if (currentUrl.split("/")[1] == "salle") {
      this.isClickedprofesseur = false;
      this.isClickeddashboard = false;
      this.isGestionRessourcesClicked = true;
      this.isConsultationClicked = false;
      this.isDeliberationClicked = false;
      this.isClickedabsence=false;

    }

    // /notes/rattrapage
    if (currentUrl.split("/")[1] == "anneeuniv") {
      this.isClickedprofesseur = false;
      this.isClickeddashboard = false;
      this.isGestionRessourcesClicked = false;
      this.isConsultationClicked = false;
      this.isDeliberationClicked = false;
      this.isClickedabsence=false
      this.isClickedanneeuniv=true
    }
    // if ( ["freeSalles","reservedSalles" ,"reservationprof"].includes(currentUrl.split("/")[1])) {
    //   this.isDeliberationClicked = false;
    //   this.isClickeddashboard = false;
    //   this.isClickedprofesseur = false;
    //   this.isGestionRessourcesClicked = false;
    //   this.isConsultationClicked = true;
    // }

    // if (currentUrl.split("/")[1] == "freeSalles") {
    //   this.isDeliberationClicked = true;
    //   this.isClickeddashboard = false;
    //   this.isClickedprofesseur = false;
    //   this.isGestionRessourcesClicked = false;
    //   this.isConsultationClicked = false;
    // }

    // if (currentUrl.split("/")[1] == "reservedSalles") {
    //   this.isDeliberationClicked = true;
    //   this.isClickeddashboard = false;
    //   this.isClickedprofesseur = false;
    //   this.isGestionRessourcesClicked = false;
    //   this.isConsultationClicked = false;
    // }
  }
  anneeuniv(){
    this.isClickedprofesseur = false;
    this.isClickeddashboard = false;
    this.isGestionRessourcesClicked = false;
    this.isConsultationClicked = false;
    this.isDeliberationClicked = false;
    this.isClickedabsence=false
    this.isClickedanneeuniv=true
    this.router.navigate(['/anneeuniv']);
  }


  dashboard() {
    this.isClickeddashboard = true;
    this.isClickedprofesseur = false;
    this.router.navigate(['/dashboard']);
  }

  professeur() {
    this.isClickedprofesseur = true;
    this.isClickeddashboard = false;
    this.router.navigate(['/professeur']);
    // this.router.navigateByUrl("professeurs");
    console.log(this.isClickedprofesseur)
    this.cdr.detectChanges();
  }
  absenceadmin() {
    this.isClickedabsence = true;
    this.isClickeddashboard = false;
    this.router.navigate(['/absencesadmin']);
    console.log(this.isClickedabsence)
    this.cdr.detectChanges();
  }
  openPopup() {
    this.isSideBarOpen = true;
    this.sidebarToggle.emit("close");
  }

  closePopup() {
    this.isSideBarOpen = false;
    this.sidebarToggle.emit("open");

  }

  gestionRessources() {
    this.isGestionRessourcesClicked = !this.isGestionRessourcesClicked;
  }

  navigateToSalles() {
    this.isGestionRessourcesClicked = !this.isGestionRessourcesClicked;
    // Perform any other actions you want when navigating to "Gestion des ressources"
    this.router.navigate(['/salle']); // Navigate to the route associated with "Gestion des ressources"
  }
  navigateToAbsence() {
    this.isGestionRessourcesClicked = !this.isGestionRessourcesClicked;
    // Perform any other actions you want when navigating to "Gestion des ressources"
     // Navigate to the route associated with "Gestion des ressources"
  }


  consultations() {
    // this.isConsultationClickedlist=false

    this.isConsultationClicked = !this.isConsultationClicked;
    this.isConsultationClickedlist=true
  }

  navigateToFreeSalles() {
    this.isConsultationClickedlist=false
    this.isConsultationClicked = !this.isConsultationClicked;
    // Perform any other actions you want when navigating to "Gestion des ressources"
    this.router.navigate(['/freeSalles']); // Navigate to the route associated with "Gestion des ressources"
    // this.isConsultationClickedlist=false
  }

  navigateToReservedSalles() {
    this.isConsultationClickedlist=false
    this.isConsultationClicked = !this.isConsultationClicked;
    // Perform any other actions you want when navigating to "Gestion des ressources"
    this.router.navigate(['/reservedSalles']); // Navigate to the route associated with "Gestion des ressources"
    // this.isConsultationClickedlist=false
  }

  navigateToReservedByProf() {
      this.isConsultationClicked = !this.isConsultationClicked;
      this.isConsultationClickedlist=false
      this.router.navigate(['/reservationprof'])


  }



  deliberation() {
    this.isDeliberationClicked = !this.isDeliberationClicked;
  }

  navigateToDeliberationOrdinaire() {
    this.isDeliberationClicked = !this.isDeliberationClicked;
    // Perform any other actions you want when navigating to "Gestion des ressources"
    this.router.navigate(['/notes']); // Navigate to the route associated with "Gestion des ressources"
  }

  navigateToDeliberationRattrapage() {
    this.isDeliberationClicked = !this.isDeliberationClicked;
    // Perform any other actions you want when navigating to "Gestion des ressources"
    this.router.navigate(['/notes/rattrapage']); // Navigate to the route associated with "Gestion des ressources"
  }
  navigateToDeliberationSemestre() {
    this.isDeliberationClicked = !this.isDeliberationClicked;
    // Perform any other actions you want when navigating to "Gestion des ressources"
    this.router.navigate(['/notes/semestre']); // Navigate to the route associated with "Gestion des ressources"
  }
  // navigateToDeliberationAnnuelle() {
  //   this.isDeliberationClicked = !this.isDeliberationClicked;
  //   // Perform any other actions you want when navigating to "Gestion des ressources"
  //   this.router.navigate(['/notes']); // Navigate to the route associated with "Gestion des ressources"
  // }

  logout() {
    this.router.navigate(['/login']);
    // Logic for logout action
  }
}
