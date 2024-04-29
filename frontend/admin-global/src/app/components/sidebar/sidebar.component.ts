import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faSearch,faHome} from "@fortawesome/free-solid-svg-icons";
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  faDashboard=faHome
  isClickeddashboard:boolean=false;
  isClickedetablissement:boolean=false;
  isFileireClicked:boolean=false;
  isModuleClicked:boolean=false;
  @Output() sidebarToggle = new EventEmitter<string>();

  isSideBarOpen: boolean = false;
  constructor(private route : ActivatedRoute,private router:Router,private cdr: ChangeDetectorRef) {


  }
  ngOnInit(): void {
    // this.dashboard();
    const currentUrl = this.router.url;
    // console.log(currentUrl)

    if(currentUrl.split("/")[1]=="dashboard")
    {
      this.isClickeddashboard=true;
      this.isClickedetablissement=false;
      this.isFileireClicked=false;
      this.isModuleClicked=false;
    }
    if(currentUrl.split("/")[1]=="etablissements")
    {
      this.isClickedetablissement=true;
      this.isClickeddashboard=false;
      this.isFileireClicked=false;
      this.isModuleClicked=false;
    }
    if(currentUrl.split("/")[1]=="filieres")
    {
      this.isFileireClicked=true;
      this.isClickeddashboard=false;
      this.isClickedetablissement=false;
      this.isModuleClicked=false;
    }
    if(currentUrl.split("/")[1]=="modules")
    {
      this.isModuleClicked=true;
      this.isClickeddashboard=false;
      this.isClickedetablissement=false;
      this.isFileireClicked=false;
    }
  }

  dashboard(){
    this.isClickeddashboard=true;
    this.isClickedetablissement=false;
    this.router.navigate(['/dashboard']);

    // this.router.navigateByUrl("dashboard");
    if(this.isSideBarOpen == true){
      this.openPopup()
    }
    if(this.isSideBarOpen == false){
      this.closePopup()
    }

  }

  etablissement(){
    this.isClickedetablissement=true;
    this.isClickeddashboard=false;
    this.router.navigate(['/etablissements']);

    // this.router.navigateByUrl("etablissements");

    if(this.isSideBarOpen == true){
      this.openPopup()
    }
    if(this.isSideBarOpen == false){
      this.closePopup()
    }
  }

  openPopup() {
    this.isSideBarOpen = true;
    this.sidebarToggle.emit("close");
  }
  closePopup() {
    this.isSideBarOpen = false;
    this.sidebarToggle.emit("open");

  }
  Filiere() {
    this.isFileireClicked = true;
    this.isClickeddashboard=false;
    this.router.navigate(['/filieres']);

    // this.router.navigateByUrl("etablissements");

    if(this.isSideBarOpen == true){
      this.openPopup()
    }
    if(this.isSideBarOpen == false){
      this.closePopup()
    }
  }

  navigateToDelteFiliere() {
    this.isFileireClicked = !this.isFileireClicked;
    // Perform any other actions you want when navigating to "Gestion des ressources"
    //this.router.navigate(['/freeSalles']); // Navigate to the route associated with "Gestion des ressources"
  }

  navigateToEditeFiliere() {
    this.isFileireClicked = !this.isFileireClicked;
    // Perform any other actions you want when navigating to "Gestion des ressources"
    //this.router.navigate(['/freeSalles']); // Navigate to the route associated with "Gestion des ressources"
  }


  Module() {
    this.isModuleClicked=true;
    this.isClickeddashboard=false;
    this.router.navigate(['/modules']);

    if(this.isSideBarOpen == true){
      this.openPopup()
    }
    if(this.isSideBarOpen == false){
      this.closePopup()
    }
  }

  navigateToDelteModule() {
    this.isModuleClicked = !this.isModuleClicked;
    // Perform any other actions you want when navigating to "Gestion des ressources"
    //this.router.navigate(['/freeSalles']); // Navigate to the route associated with "Gestion des ressources"
  }

  navigateToEditeModule() {
    this.isModuleClicked = !this.isModuleClicked;
    // Perform any other actions you want when navigating to "Gestion des ressources"
    //this.router.navigate(['/freeSalles']); // Navigate to the route associated with "Gestion des ressources"
  }


  logout() {
    this.router.navigate(['/login']);
    // Logic for logout action
  }
}
