import { Component } from '@angular/core';
import {Professeur} from "../../../models/ProfModel/professeur";
import {ProfesseurService} from "../../../services/professeur.service";
import {Router} from "@angular/router";
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';
import {map} from "rxjs";
import {faEdit, faSearch, faTrash} from "@fortawesome/free-solid-svg-icons";
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeletedialogComponent } from '../deletedialog/deletedialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Departement } from 'src/app/models/ProfModel/departement';
import { Etablissement } from 'src/app/models/ProfModel/etablissement';

@Component({
  selector: 'app-homeprof',
  templateUrl: './homeprof.component.html',
  styleUrls: ['./homeprof.component.css']
})
export class HomeprofComponent implements AfterViewInit{


  db:boolean=false;
  dc:boolean=false;
  dg:boolean=false;
  di:boolean=false;
  dm:boolean=false;
  dp:boolean=false;
  hidePassword: boolean = true;
  confpassword!:string;
  passwordsMatch: boolean = true;


  delete=faTrash;
  edit=faEdit;
  departements = Object.keys(Departement)
  // .filter(k => typeof Departement[k as any] === "number"); 
  // departements = Object.values(Departement);
  selectedDepartement: Departement | undefined;
 
  isFormPopupOpen: boolean = false;
  isdisciplinaireOpenEdit : boolean =false;
  
  displayStyle = "none";
  isFormPopupOpenEdit : boolean = false;
  isFormPopupOpenShowMore : boolean = false;

  professeurs: Professeur[]=[];
  etablissements: Etablissement[]=[];
  professeurToAdd : Professeur=new Professeur();
  professeurToEdit : Professeur=new Professeur();
  selectedProf : Professeur=new Professeur();
  displayedColumns: string[] = ['id', 'nom', 'prenom', 'email','departement','actions'];
  ProfesseurSource: MatTableDataSource<Professeur>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isSidebarOpen: string = "open";
  search!: Event;
  constructor(private ProfService:ProfesseurService, private dialog: MatDialog,private route:Router,private snackBar: MatSnackBar) {

    this.ProfesseurSource = new MatTableDataSource(this.professeurs);
    // Assign the data to the data source for the table to render
    this.getData();
    this.ProfesseurSource = new MatTableDataSource(this.professeurs);

    this.isSidebarOpen="open";
    


  }
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }


  ngAfterViewInit() {
    this.ProfesseurSource.paginator = this.paginator;
    this.ProfesseurSource.sort = this.sort;

  }
  // test if the sidebar is open or close


  onSidebarToggle(isOpen: string) {
    this.isSidebarOpen = isOpen;
  }
  applyFilter(event: Event) {
    this.search=event;
    const filterValue = (this.search.target as HTMLInputElement).value;
    this.ProfesseurSource.filter = filterValue.trim().toLowerCase();

    if (this.ProfesseurSource.paginator) {
      this.ProfesseurSource.paginator.firstPage();
    }
  }

  getData() {
    this.ProfService.getAllProf()
      .subscribe(
        (data) => {
          this.professeurs = data;
          this.ProfesseurSource.data = this.professeurs;
          // console.log(this.professeurs);
          // console.log(this.ProfesseurSource.data.at(1))
        },
        (error) => {
          console.error('Error occurred:', error);
        }
      );
  }


  showMoreRow(row: Professeur){
    console.log('showMore row:', row);
    this.isFormPopupOpenShowMore = true;
    this.selectedProf = row;
    for(const key in this.selectedProf.discipline){
      console.log(key);
      if(key === "Département_de_Biologie" || key =="0"){
        this.db=true
      }
      if(key === "Département_de_Chimie" || key =="1"){
        this.dc=true
      }
      if(key === "Département_de_Géologie" || key =="2"){
        this.dg=true
      }
      if(key === "Département_d_Informatique" || key =="3"){
        this.di=true
      }
      if(key === "Département_de_Mathématiques" || key =="4"){
        this.dm=true
      }
      if(key === "Département_de_Physique" || key =="5"){
        this.dp=true
      }
    }
  }

  Close(){
    this.isFormPopupOpenShowMore = false;
    this.displayStyle = "none";
    this.getData();
    this.db=false;
    this.dc=false;
    this.dg=false;
    this.di=false;
    this.dm=false;
    this.dp=false;
  }

  deleteRow(row: Professeur){
    this.openDeleteConfirmationDialog(row);
  }
  private openDeleteConfirmationDialog(row: Professeur): void {
    const dialogRef = this.dialog.open(DeletedialogComponent, {
      data: { row } // Pass the row object as data to the dialog component
    });
    dialogRef.componentInstance.deleteConfirmed.subscribe(result => {
      if (result) { // Check if result is true (delete confirmed)
        console.log('Delete row:', row);
        this.deleteProf(row);
      } else {
        console.log('Deletion canceled');
      }
    });

  }


  deleteProf(row: Professeur){
    this.ProfService.deleteProf(row.id).subscribe(() => {
      this.getData(); // Update the table data
      this.snackBar.open('Professor deleted successfully', 'Close', {
        duration: 3000,
      });
    },
    (error) => {
      console.error('Error occurred:', error);
      this.snackBar.open('Failed to delete professor', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
      });
    });
  }
  


  updateRow(row: Professeur){
    // console.log('update row:', row);
    this.isFormPopupOpenEdit=true;
    this.professeurToEdit=row;
    console.log(this.professeurToEdit.discipline)
    // for(const key in this.professeurToEdit.discipline){
      
      if(this.professeurToEdit.discipline.includes (Departement.Département_de_Biologie) ){
        this.db=true;
      }
      if(this.professeurToEdit.discipline.includes (Departement.Département_de_Chimie) ){
        this.dc=true
      }
      if(this.professeurToEdit.discipline.includes (Departement.Département_de_Géologie) ){
        this.dg=true
      }
      if(this.professeurToEdit.discipline.includes (Departement.Département_d_Informatique) ){
        this.di=true
      }
      if(this.professeurToEdit.discipline.includes (Departement.Département_de_Mathématiques) ){
        this.dm=true
      }
      if(this.professeurToEdit.discipline.includes (Departement.Département_de_Physique) ){
        this.dp=true
      }
    // }
    this.getAllEtab();
  }
  editProf(){
    this.isdisciplinaireOpenEdit=true;

  }
  EditProfesseur(){
    this.professeurToEdit.discipline=[];
    if (this.db==true){
      this.professeurToEdit.discipline.push(Departement.Département_de_Biologie);
      console.log("edit",this.professeurToEdit.discipline)

    }
    if (this.dg) {
      this.professeurToEdit.discipline.push(Departement.Département_de_Géologie);
      console.log("edit",this.professeurToEdit.discipline)

    }
    if (this.dm) {
      this.professeurToEdit.discipline.push(Departement.Département_de_Mathématiques);
      console.log("edit",this.professeurToEdit.discipline)

    }
    if (this.dp) {
      this.professeurToEdit.discipline.push(Departement.Département_de_Physique); 
      console.log("edit",this.professeurToEdit.discipline)

    }
    if (this.dc){
      this.professeurToEdit.discipline.push(Departement.Département_de_Chimie); 
      console.log("edit",this.professeurToEdit.discipline)

    }
    if (this.di){
      this.professeurToEdit.discipline.push(Departement.Département_d_Informatique); 
      console.log("edit",this.professeurToEdit.discipline)
    }
    // console.log("edit",this.professeurToEdit)
    
    this.ProfService.editProf(this.professeurToEdit).subscribe((res)=>{

      this.isFormPopupOpenEdit=false;
      this.closedisciplinairePopupEdit();
      this.getData();
      this.db=false;
    this.dc=false;
    this.dg=false;
    this.di=false;
    this.dm=false;
    this.dp=false;
    } , err => {console.log(err)} );
  }
  closeFormPopupEdit(){
    this.isFormPopupOpenEdit = false;
    this.displayStyle = "none";
    this.getData();
    this.db=false;
    this.dc=false;
    this.dg=false;
    this.di=false;
    this.dm=false;
    this.dp=false;
    this.passwordsMatch=true;
  }
  

 
  openFormPopup() {
    this.isFormPopupOpen = true;
    this.displayStyle = "block";
    this.getAllEtab();
    // console.log("gggggg")

  }

  closeFormPopup() {
    this.isFormPopupOpen = false;
    this.displayStyle = "none";
    this.passwordsMatch=true;
  }
  closedisciplinairePopupEdit(){
    this.isdisciplinaireOpenEdit=false;
    this.displayStyle = "none";
    this.passwordsMatch=true;
  }

  
 

  isdisciplinaireOpen: boolean = false;
  showAddDiscForm():void{
    this.isdisciplinaireOpen=true;
  }

  checkPasswordsMatch(): void {
    this.passwordsMatch = this.professeurToAdd.password === this.confpassword;
  
  }

  addProf():void{
    if(this.passwordsMatch)
      this.isdisciplinaireOpen=true
  }
  closedisciplinairePopup(){
    this.isdisciplinaireOpen = false;
    this.displayStyle = "none";
    this.passwordsMatch=true;
  }

  selectedDisciplinaires: { [key: string]: boolean } = {};
  addProfesseur(){
    const selected = this.departements.filter(departement => this.selectedDisciplinaires[departement]);
    // console.log(selected);
    this.professeurToAdd.discipline=this.departements.filter(departement => this.selectedDisciplinaires[departement]).map(departement => Departement[departement as keyof typeof Departement]);

    console.log(this.professeurToAdd)

    this.ProfService.addProf(this.professeurToAdd).subscribe(
      data=>{
        this.isFormPopupOpen=false;
        this.closedisciplinairePopup();
        this.getData();
        this.professeurToAdd=new Professeur();
        this.passwordsMatch=true;
        
        
      },
      error => {}

    );
  }
  

  getAllEtab(){
    this.ProfService.getAllEtablissement().pipe(
      map((response: any[]) => {
        // Perform any necessary data transformation or mapping here
        return response.map(item => ({
          codeName: item.codeName,
          nom: item.nom,
          ville: item.ville,
          discipline : item.discipline
          // Map other properties as needed
        }));
      })
    )
      .subscribe(
        (transformedData: Etablissement[]) => {
          this.etablissements = transformedData;
          // console.log(this.etablissements);
          // console.log(this.EtablissementSource.data.at(1))
        },
        (error) => {
          console.error('Error occurred:', error);
        }
      );
  }
}
