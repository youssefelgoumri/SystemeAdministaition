import { Component, EventEmitter, Output, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import * as XLSX from 'xlsx';
import {MatButtonModule} from '@angular/material/button';
import { DelebrationrattrapageService } from 'src/app/services/delebrationrattrapage.service';
import { RessultatRattrapage } from 'src/app/models/RattModel/ressultat-rattrapage';
import { ResultatRattrapageElement } from 'src/app/models/RattModel/resultat-rattrapage-element';
import { PvserviceService } from 'src/app/services/pvservice.service';
import { Plandevalidationmodule } from 'src/app/models/PlanDeValidationModel/plandevalidationmodule';
import { Plandevalidation } from 'src/app/models/PlanDeValidationModel/plandevalidation';
import { Plandevalidationid } from 'src/app/models/PlanDeValidationModel/plandevalidationid';
import { Plandevalidationmoduleid } from 'src/app/models/PlanDeValidationModel/plandevalidationmoduleid';

@Component({
  selector: 'app-imporpvtfile',
  templateUrl: './importpvfile.component.html',
  styleUrls: ['./importpvfile.component.css']
})
export class ImportpvfileComponent {
  @Output() deleteConfirmed: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public dialogRef: MatDialogRef<ImportpvfileComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,private pvservice:PvserviceService) { }


              

  onCancel(): void {
    console.log('Delete canceled');
    this.deleteConfirmed.emit(false); // Emit false when delete canceled
    this.dialogRef.close();
  }

  onConfirm() {
    // Click the hidden file input element to trigger the file selection dialog
    
  }

  importExcel() {
    // Click the hidden file input element to trigger the file selection dialog
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }
  selectedFileName!:any
  onFileChange(event: any) {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      this.selectedFileName = file.path; // Store the file name
      // console.log(file.path)
      this.readFile(file);
      
      
    }
  }
  readFile(file: File) {
    const fileReader = new FileReader();
  
    fileReader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
  
      // Process your Excel data here
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const excelData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
  
      const rr: Plandevalidationmodule[] = []; // Assuming RessultatRattrapage is a class/interface
  // console.log(excelData)
      const rre: Plandevalidation[] = [];
      const pv: Plandevalidation[] = [];
      

      excelData.forEach((row: any) => {
        // console.log("================"+row)
        const resultelemnt : Plandevalidation={
          cne: row['CNE'],
          elementID: row['Element Id'],
          filiereID: row['Filiere Id'], // Set to null or initialize with default values if needed
          moduleID: row['Module Id'],
          noteExam: row['Note Exam'],
          noteTP: row['Note TP'],
          semestreID: row['Semestre Id'],
          id: new Plandevalidationid
        };
        // console.log("================"+resultelemnt)
        this.pvservice.addPlanDeValidation(resultelemnt).subscribe(
          (res)=>{
            console.log("1"+res)

           
          },
          (err)=>{console.error(err)});
  
        // Create a new object with only the required attributes
        
        rre.push(resultelemnt); // Add the RessultatRattrapage object to the array
        // rr.push(resultat); 
        console.log(rre)
      });

      setTimeout(() => {
        excelData.forEach((row: any) => {
          // console.log("================"+row)
          const resultat : Plandevalidationmodule={
            cne: row['CNE'],
            filiereID: row['Filiere Id'], // Set to null or initialize with default values if needed
            moduleID: row['Module Id'],
            semestreID: row['Semestre Id'],
            id: new Plandevalidationmoduleid
          };
          // console.log("================"+resultelemnt)
          this.pvservice.addPlanDeValidationModule(resultat).subscribe(
            (res)=>{
              
              console.log("2"+res)
  
            },
            (err)=>{console.error(err)});
    
          // Create a new object with only the required attributes
          
          rr.push(resultat); 
        });
        
      }, 1500);


      console.log(rre);
      console.log(rr);
      
  
      // console.log(rr); // Log the array of RessultatRattrapage objects
      
    };
  
    fileReader.readAsArrayBuffer(file);
    this.deleteConfirmed.emit(true); // Emit false when delete canceled
    this.dialogRef.close();
    
  }
  //  readFile(file: File) {
  //   const fileReader = new FileReader();

  //   fileReader.onload = (e: any) => {
  //     const data = new Uint8Array(e.target.result);
  //     const workbook = XLSX.read(data, { type: 'array' });

  //     // Process your Excel data here
  //     const firstSheetName = workbook.SheetNames[0];
  //     const worksheet = workbook.Sheets[firstSheetName];
  //     const excelData = XLSX.utils.sheet_to_json(worksheet, { raw: true });

  //     // Assuming RessultatRattrapage has the same structure as excelData
  //     this.rr = excelData as RessultatRattrapage[];
  //     // console.log(this.rr);
  //     excelData.forEach((element)=>{
  //       console.log("===="+element);
  //       // this.DelibRattService.addFromExcel(element).subscribe(
  //       //   (res)=>{
            
  //       //     this.deleteConfirmed.emit(true); // Emit false when delete canceled
  //       //     this.dialogRef.close();
  //       //   },
  //       //   (err)=>{console.error(err)});
  //     });
  //   };

  //   fileReader.readAsArrayBuffer(file);
  // }
}
