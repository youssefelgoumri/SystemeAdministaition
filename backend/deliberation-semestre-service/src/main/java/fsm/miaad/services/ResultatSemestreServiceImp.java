package fsm.miaad.services;

import fsm.miaad.entities.*;
import fsm.miaad.feigns.FiliereServiceClient;
import fsm.miaad.feigns.InscriptionAdminServiceClient;
import fsm.miaad.feigns.ModuleServiceClient;
import fsm.miaad.feigns.ValParaServiceClient;
import fsm.miaad.models.Etudiant;
import fsm.miaad.models.Filiere;
import fsm.miaad.models.Module;
import fsm.miaad.models.ValidationParam;
import fsm.miaad.repositories.ResultatModuleRepository;
import fsm.miaad.repositories.ResultatSemestreRepository;
import lombok.AllArgsConstructor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ResultatSemestreServiceImp implements ResultatSemestreService{

    ResultatSemestreRepository resultatSemestreRepository;
    ValParaServiceClient valParaServiceClient;
    ResultatModuleService resultatModuleService;
    ModuleServiceClient moduleServiceClient;
    ResultatModuleRepository moduleRepository;
    FiliereServiceClient filiereServiceClient;
    InscriptionAdminServiceClient inscriptionAdminServiceClient;

    @Override
    public Resultat_Semestre getById(Resultat_Semestre_id id) {
        return resultatSemestreRepository.findById(id).orElse(null);
    }
    @Override
    public List<Resultat_Semestre> allResultat_Semestre() {
        // TODO Auto-generated method stub
        List<Resultat_Semestre> resultat_Semestres=resultatSemestreRepository.findAll();
        for(Resultat_Semestre rs:resultat_Semestres){
            update( rs);
        }
        return resultatSemestreRepository.findAll();
    }
    @Override
    public List<Resultat_Semestre> addResultat_Semestre(Resultat_Semestre resultatSemestre) {
        List<Resultat_Module>  list = moduleRepository.findBySemestreIDAndFiliereID(resultatSemestre.getSemestreID(),resultatSemestre.getFiliereID() );
        List<Resultat_Semestre> resultat_Semestres=new  ArrayList<>();
        for(Resultat_Module rm:list){
            System.out.println(rm.toString());
            // List<Resultat_Module> rmlist=resultatModuleService.RESULTAT_MODULES_SEMESTRE_FILIER(rm.getCNE(),rm.getSemestreID(),rm.getFiliereID());
            Resultat_Semestre resultat_semestre=getById(new Resultat_Semestre_id(rm.getCNE(),rm.getSemestreID(),rm.getFiliereID()));
            if(resultat_semestre==null) {
                resultat_semestre=Resultat_Semestre.builder()
                .CNE(rm.getCNE())
                .filiereID(rm.getFiliereID())
                .semestreID(rm.getSemestreID())
                .build();
                System.out.println(resultat_semestre.toString());
                resultat_semestre = resultatSemestreRepository.save(resultat_semestre);
                resultat_semestre.setNote_finale(resultatModuleService.NoteSemestre(resultat_semestre.getCNE()));
                resultat_semestre = resultatSemestreRepository.save(resultat_semestre);
    
                ValidationParam validationParam= valParaServiceClient.getValidationParam(resultat_semestre.getFiliereID());
                System.out.println(validationParam.toString());
    
                if (validationParam!=null){
                    if(resultat_semestre.getNote_finale()>= validationParam.getY())
                        resultat_semestre.setStatut(Statut.V);
                    else resultat_semestre.setStatut(Statut.NV);
                    resultat_semestre = resultatSemestreRepository.save(resultat_semestre);
                    resultat_Semestres.add(resultat_semestre);
                }
            }
        }
        // Resultat_Semestre resultat_semestre=getById(new Resultat_Semestre_id(resultatSemestre.getCNE(),resultatSemestre.getSemestreID(),resultatSemestre.getFiliereID()));
        

        return resultat_Semestres;
    }


    // @Override
    // public Resultat_Semestre addResultat_Semestre(Resultat_Semestre resultatSemestre) {
    //     Resultat_Semestre resultat_semestre=getById(new Resultat_Semestre_id(resultatSemestre.getCNE(),resultatSemestre.getSemestreID(),resultatSemestre.getFiliereID()));
    //     if(resultat_semestre==null) {
    //         resultat_semestre = resultatSemestreRepository.save(resultatSemestre);
    //         resultat_semestre.setNote_finale(resultatModuleService.NoteSemestre(resultat_semestre.getCNE()));
    //         resultat_semestre = resultatSemestreRepository.save(resultat_semestre);

    //         ValidationParam validationParam= valParaServiceClient.getValidationParam(resultat_semestre.getFiliereID());
    //         System.out.println(validationParam.toString());

    //         if (validationParam!=null){
    //             if(resultat_semestre.getNote_finale()>= validationParam.getY())
    //                 resultat_semestre.setStatut(Statut.V);
    //             else resultat_semestre.setStatut(Statut.NV);
    //             resultat_semestre = resultatSemestreRepository.save(resultat_semestre);
    //         }
    //     }

    //     return resultat_semestre;
    // }

    @Override
    public void delete(Resultat_Semestre_id id) {
        Resultat_Semestre resultat_semestre=getById(id);

        if(resultat_semestre!=null){
            resultatSemestreRepository.delete(resultat_semestre);
        }

    }

    @Override
    public Resultat_Semestre update(Resultat_Semestre resultatRattrapage) {
        Resultat_Semestre resultatRattrapageup=getById(new Resultat_Semestre_id(resultatRattrapage.getCNE(), resultatRattrapage.getSemestreID(), resultatRattrapage.getFiliereID()));
        if (resultatRattrapageup!=null){

                // resultat_semestre = resultatSemestreRepository.save(resultat_semestre);
                resultatRattrapageup.setNote_finale(resultatModuleService.NoteSemestre(resultatRattrapageup.getCNE()));
                resultatRattrapageup = resultatSemestreRepository.save(resultatRattrapageup);
    
                ValidationParam validationParam= valParaServiceClient.getValidationParam(resultatRattrapageup.getFiliereID());
                System.out.println(validationParam.toString());
    
                if (validationParam!=null){
                    if(resultatRattrapageup.getNote_finale()>= validationParam.getY())
                    resultatRattrapageup.setStatut(Statut.V);
                    else resultatRattrapageup.setStatut(Statut.NV);
                    resultatRattrapageup = resultatSemestreRepository.save(resultatRattrapageup);
                    // resultatRattrapageup.add(resultatRattrapageup);
                }


        }
        return resultatRattrapageup;
    }

    @Override
    public List<Resultat_Semestre> allResultat_Semestre(String semestre) {
        return resultatSemestreRepository.findBySemestreID(semestre);
    }

    @Override
    public void RESULTAT_SEMESTREExcel(String semestre) throws IOException {
        List<Resultat_Semestre> resultatSemestres=allResultat_Semestre(semestre);
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Etudiants");

        // Créer l'en-tête
        Row header = sheet.createRow(0);
        header.createCell(0).setCellValue("CNE");
//        header.createCell(1).setCellValue("NOM");
//        header.createCell(2).setCellValue("PRENOM");
        header.createCell(3).setCellValue(semestre);
        header.createCell(4).setCellValue("Note finale");
        header.createCell(5).setCellValue("Résultat");

        // Ajouter des données d'étudiant
        int rowNum = 1;
        for(Resultat_Semestre resultatSemestre:resultatSemestres){
            Row student1 = sheet.createRow(rowNum++);
            student1.createCell(0).setCellValue(resultatSemestre.getCNE());
//        student1.createCell(1).setCellValue("Nom 1");
//        student1.createCell(2).setCellValue("Prenom1");
            student1.createCell(3).setCellValue("M1 16 M2 12 M3 17 M4 16 M5 14 M6 15");
            student1.createCell(4).setCellValue(resultatSemestre.getNote_finale());
            student1.createCell(5).setCellValue(resultatSemestre.getStatut().ordinal());
        }


        // Écrire le fichier Excel
        try (FileOutputStream fileOut = new FileOutputStream("C:/Users/admin/OneDrive/Bureau/workbook.xlsx")) {
            workbook.write(fileOut);
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        workbook.close();
    }


    @Override
    public ResponseEntity<byte[]> genererFichierResultatsExcel(String semestre,String cne) throws IOException {
        // Créer un classeur Excel
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("ResultatSemestre"+semestre+"_"+cne);
        List<Resultat_Semestre> resultatSemestres = allResultat_Semestre(semestre);
        List<Resultat_Module> resultatModules = new ArrayList<>();



        // En-têtes

        int rowNum = 1;
        for (Resultat_Semestre resultatSemestre:resultatSemestres){
            if(resultatSemestre.getCNE().equals(cne)){
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue("CNE");
                row.createCell(1).setCellValue("Nom");
                row.createCell(2).setCellValue("Prenom");
                row.createCell(3).setCellValue("Filiere");
    //        headerRow.createCell(2).setCellValue("Semestre Id");
                row.createCell(4).setCellValue("Module ");
                row.createCell(5).setCellValue("Module Note");
    //        headerRow.createCell(5).setCellValue("Note Final");
                row.createCell(6).setCellValue("Statut Module");
                resultatModules=resultatModuleService.RESULTAT_MODULES_SEMESTRE(resultatSemestre.getCNE(),semestre);
                for (Resultat_Module resultat :resultatModules)
                    {
                        row = sheet.createRow(rowNum++);
                        row.createCell(0).setCellValue(resultat.getCNE());
                        Etudiant etd=inscriptionAdminServiceClient.etudiant(resultat.getCNE());
                        row.createCell(1).setCellValue(etd.getNomEnFrançais());
                        row.createCell(2).setCellValue(etd.getPrenomEnFrançais());
                        ResponseEntity<Filiere> filiereEntity=filiereServiceClient.getFiliereById(resultat.getFiliereID());
                        Filiere filiere=filiereEntity.getBody();
        
                        row.createCell(3).setCellValue(filiere.getNom());
                        Module module=moduleServiceClient.module(resultat.getModuleID());
                        row.createCell(4).setCellValue(module.getIntitule());
                        row.createCell(5).setCellValue(resultat.getNote_finale());
                        String statut=resultat.getStatut()+" ";
                        row.createCell(6).setCellValue(statut);

                    }
                row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue("CNE");
                row.createCell(1).setCellValue("Nom");
                row.createCell(2).setCellValue("Prenom");
                row.createCell(3).setCellValue("Filiere ");
    //        headerRow.createCell(2).setCellValue("Semestre Id");
                row.createCell(4).setCellValue("Semestre ");
                row.createCell(5).setCellValue("Semestre Note");
    //        headerRow.createCell(5).setCellValue("Note Final");
                row.createCell(6).setCellValue("Statut Semestre");
                row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(resultatSemestre.getCNE());
                Etudiant etd=inscriptionAdminServiceClient.etudiant(resultatSemestre.getCNE());
                row.createCell(1).setCellValue(etd.getNomEnFrançais());
                row.createCell(2).setCellValue(etd.getPrenomEnFrançais());
                ResponseEntity<Filiere> filiereEntity=filiereServiceClient.getFiliereById(resultatSemestre.getFiliereID());
                Filiere filiere=filiereEntity.getBody();

                row.createCell(3).setCellValue(filiere.getNom());
                row.createCell(4).setCellValue(resultatSemestre.getSemestreID());
                row.createCell(5).setCellValue(resultatSemestre.getNote_finale());
                String statut=resultatSemestre.getStatut()+" ";
                row.createCell(6).setCellValue(statut);
            }
        }
        // Convertir le classeur en tableau d'octets
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        workbook.write(outputStream);
        workbook.close();

        // Préparer la réponse HTTP avec le fichier Excel
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
        headers.setContentDispositionFormData("attachment", "ResultatSemestre"+semestre+"_"+cne+".xlsx");

        return new ResponseEntity<>(outputStream.toByteArray(), headers, org.springframework.http.HttpStatus.OK);
    }

    @Override
    public ResponseEntity<byte[]> genererFichierResultatsExcelForEtudient(String semestre,String cne) throws IOException {
        // Créer un classeur Excel
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("ResultatModule"+semestre+"_"+cne);
        List<Resultat_Semestre> resultatSemestres = allResultat_Semestre(semestre);
        List<Resultat_Module> resultatModules = new ArrayList<>();



        // En-têtes

        int rowNum = 1;
        for (Resultat_Semestre resultatSemestre:resultatSemestres){
            if(resultatSemestre.getCNE().equals(cne)){
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue("CNE");
                row.createCell(1).setCellValue("Filiere Id");
    //        headerRow.createCell(2).setCellValue("Semestre Id");
                row.createCell(2).setCellValue("Module ");
                row.createCell(3).setCellValue("Module Note");
    //        headerRow.createCell(5).setCellValue("Note Final");
                row.createCell(4).setCellValue("Statut Module");
                resultatModules=resultatModuleService.RESULTAT_MODULES_SEMESTRE(resultatSemestre.getCNE(),semestre);
                for (Resultat_Module resultat :resultatModules)
                    {
                        row = sheet.createRow(rowNum++);
                        row.createCell(0).setCellValue(resultat.getCNE());
                        row.createCell(1).setCellValue(resultat.getFiliereID());
                        Module module=moduleServiceClient.module(resultat.getModuleID());
                        row.createCell(2).setCellValue(module.getIntitule());
                        row.createCell(3).setCellValue(resultat.getNote_finale());
                        String statut=resultat.getStatut()+" ";
                        row.createCell(4).setCellValue(statut);

                    }
                
            }
        }
        // Convertir le classeur en tableau d'octets
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        workbook.write(outputStream);
        workbook.close();

        // Préparer la réponse HTTP avec le fichier Excel
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
        headers.setContentDispositionFormData("attachment", "ResultatModule"+semestre+"_"+cne+".xlsx");

        return new ResponseEntity<>(outputStream.toByteArray(), headers, org.springframework.http.HttpStatus.OK);
    }


}
