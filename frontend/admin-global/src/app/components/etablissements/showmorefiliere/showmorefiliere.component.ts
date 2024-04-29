import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Module } from 'src/app/models/etablissementModel/ModuleModel/module';
import { Etablissement } from 'src/app/models/etablissementModel/etablissement';
import { EtablissementService } from 'src/app/services/EtablissementServices/etablissement.service';

@Component({
  selector: 'app-showmorefiliere',
  templateUrl: './showmorefiliere.component.html',
  styleUrl: './showmorefiliere.component.css'
})
export class ShowmorefiliereComponent {
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;

  isSidebarOpen: string = "open";
  search!: Event;
  module : Module=new Module();
  codeName!:string;
  idfiliere!:number
  etablissement : Etablissement=new Etablissement();

  onSidebarToggle(isOpen: string) {
    this.isSidebarOpen = isOpen;
    // console.log(this.isSidebarOpen)
  }

  applyFilter(event: Event) {
    // console.log(event);
    // console.log(this.search);
    this.search=event;
    const filterValue = (this.search.target as HTMLInputElement).value;
    // this.EtablissementSource.filter = filterValue.trim().toLowerCase();

    // if (this.EtablissementSource.paginator) {
    //   this.EtablissementSource.paginator.firstPage();
    // }
  }
  constructor(private route:Router,private EtabService: EtablissementService){
    const currentUrl = this.route.url;
    this.codeName=currentUrl.split("/")[3]
    // console.log(this.codeName)
    this.idfiliere=parseInt(currentUrl.split("/")[4])
    this.getData();
    // this.getSemestres()
  }

  getData() {
    this.EtabService.getEtabByCodeName(this.codeName)
      .subscribe(
        (transformedData: Etablissement) => {
          this.etablissement = transformedData;
          this.etablissement.filieres.forEach(item => {
            if(item.id ==  this.idfiliere){
            const semestresArray = item.semestres;
        
             semestresArray.forEach(semester => {
                console.log('Semester ID:', semester.id);
                console.log('Semester Name:', semester.nomSemestre);
                const modulesArray = semester.modules;
                modulesArray.forEach(mod =>{
                      console.log(mod);
                      console.log('module id:', mod.id);
                      console.log('module intitule:', mod.intitule);
            

                  }
                );
            })}
          });
        });

          // this.FilieresSource.data = this.etablissement.filieres;
          // console.log(this.etablissement);
          // console.log(this.FilieresSource.data.at(1))
        
  }

  getSemestres(){
    for(const key in this.etablissement.filieres){
      console.log(key);
    }
  }

  return(){
    this.route.navigateByUrl("etablissements/showmore/"+this.codeName)
  }

  


}
