import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-sidenav-prof',
  templateUrl: './sidenav-prof.component.html',
  styleUrls: ['./sidenav-prof.component.css']
})
export class SidenavProfComponent implements OnInit {
  isSideBarOpen1: boolean = false;
  isClickedAbsences: boolean = false;
  isReservationsClicked: boolean = false;
  isProfileClicked: boolean = false;
  profID:number

  @Output() sidebarToggle1 = new EventEmitter<string>();

  constructor(private route: ActivatedRoute, private router: Router, private cdr: ChangeDetectorRef) {
    const currentUrl = this.router.url;
    this.profID=parseInt(currentUrl.split("/")[2])
  }


  ngOnInit(): void {
    // this.dashboard();
    const currentUrl = this.router.url;
    if (currentUrl.split("/")[1] == "profile") {
      this.isProfileClicked = true;
      this.isReservationsClicked = false;
      this.isClickedAbsences = false;
    }
    if (currentUrl.split("/")[1] == "reservesalle") {
      this.isProfileClicked = false;
      this.isReservationsClicked = true;
      this.isClickedAbsences = false;
    }
    if (currentUrl.split("/")[1] == "absences") {
      this.isProfileClicked = false;
      this.isReservationsClicked = false;
      this.isClickedAbsences = true;
    }

  }
  openPopup() {
    this.isSideBarOpen1 = true;
    this.sidebarToggle1.emit("close");
  }

  closePopup() {
    this.isSideBarOpen1 = false;
    this.sidebarToggle1.emit("open");

  }



  Absences() {
    this.isClickedAbsences = true;
    this.isReservationsClicked = false;
    this.isProfileClicked = false;
    this.router.navigate(['/absences/'+ this.profID]); // Naviguer vers le composant AbsenceComponent
    this.cdr.detectChanges();
  }

  gestionReservations() {
    this.isProfileClicked = false;
    this.isClickedAbsences = false;
    this.isReservationsClicked = true;
    this.router.navigate(['/reservesalle/'+ this.profID]);
    this.cdr.detectChanges();
  }

  Profile() {
    this.isProfileClicked = true;
    this.isClickedAbsences = false;
    this.isReservationsClicked = false;
    this.router.navigate(['/profile/'+ this.profID]);
    this.cdr.detectChanges();
  }

  logout() {
    this.router.navigate(['/login']);
    // Logic for logout action
  }
}
