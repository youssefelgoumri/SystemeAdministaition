package fsm.miaad.services;

import fsm.miaad.entities.*;
import fsm.miaad.feigns.DSOrdinaireServiceClient;
import fsm.miaad.feigns.DSemestreServiceClient;
import fsm.miaad.feigns.FiliereServiceClient;
import fsm.miaad.feigns.InscriptionAdminServiceClient;
import fsm.miaad.feigns.ModuleServiceClient;
import fsm.miaad.feigns.ValParaServiceClient;
import fsm.miaad.models.ElementModule;
import fsm.miaad.models.Etudiant;
import fsm.miaad.models.Filiere;
import fsm.miaad.models.Module;
import fsm.miaad.models.PlanDeValidation;
import fsm.miaad.models.PlanDeValidationID;
import fsm.miaad.models.PlanDeValidationModule;
import fsm.miaad.models.PlanDeValidationModuleID;
import fsm.miaad.models.Resultat;
import fsm.miaad.models.Resultat_Module;
import fsm.miaad.models.Resultat_ModuleID;
import fsm.miaad.models.ValidationParam;
import fsm.miaad.repositories.RattElementRepository;
import fsm.miaad.repositories.RattRepository;
import jakarta.ws.rs.NotFoundException;
import lombok.AllArgsConstructor;
import org.apache.poi.EncryptedDocumentException;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.hibernate.mapping.Map;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@AllArgsConstructor
@Service
public class RattServiceImp implements RattService {

    RattRepository rattRepository;
    RattElementRepository rattElementRepository;
    ValParaServiceClient valParaServiceClient;
    ModuleServiceClient moduleServiceClient;
    DSemestreServiceClient dSemestreServiceClient;
    DSOrdinaireServiceClient dsOrdinaireServiceClient;
    FiliereServiceClient filiereServiceClient;
    InscriptionAdminServiceClient inscriptionAdminServiceClient;

    @Override
    public Resultat_Rattrapage getById(Resultat_RattrapageID ids) {
        return rattRepository.findById(ids).orElse(null);
    }




    @Override
    public Resultat_Rattrapage addResultat_Rattrapage(Resultat_Rattrapage resultatRattrapage) {
        // System.out.println(resultatRattrapage.toString());
        Resultat_Rattrapage rr=getById(new Resultat_RattrapageID(resultatRattrapage.getCNE(), resultatRattrapage.getModuleID(),resultatRattrapage.getSemestreID(), resultatRattrapage.getFiliereID()));
        if(rr==null) {
            PlanDeValidationModuleID idm=PlanDeValidationModuleID.builder()
                    .CNE(resultatRattrapage.getCNE())
                    .filiereID(resultatRattrapage.getFiliereID())
                    .moduleID(resultatRattrapage.getModuleID())
                    .semestreID(resultatRattrapage.getSemestreID())
                    .build();
            PlanDeValidationModule pvm=dsOrdinaireServiceClient.planDeValidationModule(idm);
            resultatRattrapage.setNote_ordinaire(pvm.getNoteFinale());
            Module module=moduleServiceClient.module(resultatRattrapage.getModuleID());
            List<PlanDeValidation> listPdv =new  ArrayList<>();
            for(ElementModule elementModule:module.getElementsModule()) {
                PlanDeValidationID id=PlanDeValidationID.builder()
                    .CNE(resultatRattrapage.getCNE())
                    .elementID(elementModule.getId())
                    .filiereID(resultatRattrapage.getFiliereID())
                    .moduleID(resultatRattrapage.getModuleID())
                    .semestreID(resultatRattrapage.getSemestreID())
                    .build();
                    System.out.println("rr===========================\n"+id.toString());
                PlanDeValidation pv=dsOrdinaireServiceClient.planDeValidation(id);
                System.out.println("rr===========================\n"+pv.toString());
                if(pv.getResultat().equals(Resultat.Valide))
                    listPdv.add(pv);

            }
            
            List<Resultat_RattrapageElement> elements=rattElementRepository.findByCNEAndFiliereIDAndModuleIDAndSemestreID(resultatRattrapage.getCNE(), resultatRattrapage.getFiliereID(), resultatRattrapage.getModuleID(), resultatRattrapage.getSemestreID());
            
            resultatRattrapage.setNote_ratt(calculerMoyenneModule(elements,listPdv));
            rr= rattRepository.save(resultatRattrapage);
            System.out.println("rr===========================\n"+rr.toString());
            ValidationParam validationParam = valParaServiceClient.getValidationParam(rr.getFiliereID());
            
            if (rr.getNote_final() >= validationParam.getX()) {
                rr.setStatut(Statut.V);
//                    rr.setNote_ratt(0f);
            }
            else rr.setStatut(Statut.NV);
//            System.out.println(rr.toString());
            rr= rattRepository.save(rr);

            Resultat_Module resultatModule=Resultat_Module.builder()
                    .moduleID(rr.getModuleID())
                    .semestreID(rr.getSemestreID())
                    .filiereID(rr.getFiliereID())
                    .CNE(rr.getCNE())
                    .note_finale(rr.getNote_final())
                    .statut(rr.getStatut())
                    .build();
            Resultat_ModuleID idsMod=Resultat_ModuleID.builder()
                    .moduleID(rr.getModuleID())
                    .semestreID(rr.getSemestreID())
                    .filiereID(rr.getFiliereID())
                    .CNE(rr.getCNE())
                    .build();
            Resultat_Module resultat_module=dSemestreServiceClient.getResultatModuleByid(idsMod);
            if (resultat_module==null)
                dSemestreServiceClient.addResultatModule(resultatModule);
            else dSemestreServiceClient.editResultatModule(resultatModule);
            
        
        }
        return rr;
    }

    private float calculerMoyenneModule(List<Resultat_RattrapageElement> listrre,List<PlanDeValidation> listPdv) {
        float moyenne=0;
        float elementMoyenne=0;
        Integer elementControbution=0;

        float totalCoefficient = 0;
        float totalWeightedNotes = 0;

        List<Long> eltID = new ArrayList<>();

        for (Resultat_RattrapageElement element : listrre) {
            eltID.add(element.getElementID());
        }
        for(PlanDeValidation p: listPdv){
            eltID.add(p.getElementID());
        }
        
        java.util.Map<Long, Integer> controbutions= moduleServiceClient.controbutions(eltID);
        System.out.println("rr===========================\n"+controbutions);

        for (Resultat_RattrapageElement element : listrre) {

            if (element!=null){

                elementControbution = controbutions.get(element.getElementID());
                
                elementMoyenne = element.getNote_final();

                totalWeightedNotes += (elementMoyenne * elementControbution);
                
                totalCoefficient += elementControbution;
                
            }

        }
        // Ensure that totalCoefficient is not zero to avoid division by zero
        moyenne = (totalCoefficient != 0) ? totalWeightedNotes / totalCoefficient : 0;
        System.out.println("moyenne=="+moyenne);
        return moyenne;

    }

    @Override
    public void delete(Resultat_RattrapageID ids) {
        rattRepository.deleteById(ids);

    }


    @Override
    public Resultat_Rattrapage update( Resultat_Rattrapage resultatRattrapage) {
        Resultat_Rattrapage rr=getById(new Resultat_RattrapageID(resultatRattrapage.getCNE(), resultatRattrapage.getModuleID(),resultatRattrapage.getSemestreID(), resultatRattrapage.getFiliereID()));
        if(rr!=null){
            // System.out.println(resultatRattrapage.toString);
            if(resultatRattrapage.getNote_ratt()!=null ) {
                rr.setNote_ratt(resultatRattrapage.getNote_ratt());
            }
            if(resultatRattrapage.getNote_ordinaire()!=null ) {
                rr.setNote_ordinaire(resultatRattrapage.getNote_ordinaire());
            }
//            rr.setNote_final();
            PlanDeValidationModuleID idm=PlanDeValidationModuleID.builder()
                .CNE(rr.getCNE())
                .filiereID(rr.getFiliereID())
                .moduleID(rr.getModuleID())
                .semestreID(rr.getSemestreID())
                .build();
            PlanDeValidationModule pvm=dsOrdinaireServiceClient.planDeValidationModule(idm);
            rr.setNote_ordinaire(pvm.getNoteFinale());
            Module module=moduleServiceClient.module(rr.getModuleID());
            List<PlanDeValidation> listPdv =new  ArrayList<>();
            for(ElementModule elementModule:module.getElementsModule()) {
                PlanDeValidationID id=PlanDeValidationID.builder()
                    .CNE(rr.getCNE())
                    .elementID(elementModule.getId())
                    .filiereID(rr.getFiliereID())
                    .moduleID(rr.getModuleID())
                    .semestreID(rr.getSemestreID())
                    .build();
                PlanDeValidation pv=dsOrdinaireServiceClient.planDeValidation(id);
                if(pv.getResultat().equals(Resultat.Valide))
                    listPdv.add(pv);

            }

            List<Resultat_RattrapageElement> elements=rattElementRepository.findByCNEAndFiliereIDAndModuleIDAndSemestreID(resultatRattrapage.getCNE(), resultatRattrapage.getFiliereID(), resultatRattrapage.getModuleID(), resultatRattrapage.getSemestreID());

            rr.setNote_ratt(calculerMoyenneModule(elements,listPdv));
            rr= rattRepository.save(rr);
            ValidationParam validationParam = valParaServiceClient.getValidationParam(rr.getFiliereID());
            if(rr.getNote_final()>=validationParam.getX()) {
                rr.setStatut(Statut.V);
                
            }
            else rr.setStatut(Statut.NV);
//            System.out.println(rr.toString());
            rr= rattRepository.save(rr);

            
            Resultat_Module resultatModule=Resultat_Module.builder()
                    .moduleID(rr.getModuleID())
                    .semestreID(rr.getSemestreID())
                    .filiereID(rr.getFiliereID())
                    .CNE(rr.getCNE())
                    .note_finale(rr.getNote_final())
                    .statut(rr.getStatut())
                    .build();
            Resultat_ModuleID idsMod=Resultat_ModuleID.builder()
                    .moduleID(rr.getModuleID())
                    .semestreID(rr.getSemestreID())
                    .filiereID(rr.getFiliereID())
                    .CNE(rr.getCNE())
                    .build();
            Resultat_Module resultat_module=dSemestreServiceClient.getResultatModuleByid(idsMod);
            if (resultat_module==null)
                dSemestreServiceClient.addResultatModule(resultatModule);
            else dSemestreServiceClient.editResultatModule(resultatModule);

        }
        return rr;
    }

    @Override
    public List<Resultat_Rattrapage> allResultat_Rattrapage() {
        return rattRepository.findAll();
    }




    @Override
    public ResponseEntity<byte[]> genererFichierResultatsExcel(Long filiereid,Long moduleId,String semestreId) throws IOException {
        // Créer un classeur Excel
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("ResultatRattrapage"+filiereid+"_"+moduleId+"_"+semestreId);
        // List<Resultat_Semestre> resultatSemestres = allResultat_Semestre(semestre);
        // List<Resultat_Module> resultatModules = new ArrayList<>();

        List<Resultat_Rattrapage> rr=allResultat_Rattrapage();
        List<Resultat_RattrapageElement> rre=allResultat_RattrapageElements();

        // En-têtes
        Row headerRow = sheet.createRow(0);
        ResponseEntity<Filiere> filiereEntity=filiereServiceClient.getFiliereById(filiereid);
        Filiere filiere=filiereEntity.getBody();
        headerRow.createCell(0).setCellValue("Filiere Id");
        headerRow.createCell(1).setCellValue("Module Id");
        headerRow.createCell(2).setCellValue("Semestre Id");
        Row row = sheet.createRow(1);
        row.createCell(0).setCellValue(filiere.getNom());
        Module module=moduleServiceClient.module(moduleId);
        row.createCell(1).setCellValue(module.getIntitule());
        row.createCell(2).setCellValue(semestreId);

        row = sheet.createRow(2);
        row.createCell(0).setCellValue("CNE");
        row.createCell(1).setCellValue("Nom");
        row.createCell(2).setCellValue("Prenom");
        row.createCell(3).setCellValue("Note Final module");
        row.createCell(4).setCellValue("Statut module");
        row.createCell(5).setCellValue("Element");
        row.createCell(6).setCellValue("Note Final element");
        row.createCell(7).setCellValue("Statut element");

        int rowNum = 3;
        for (Resultat_Rattrapage resultat : rr) {
            if(resultat.getModuleID()==moduleId && resultat.getFiliereID()==filiereid && resultat.getSemestreID().equals(semestreId))
            {
                row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(resultat.getCNE());
                Etudiant etd=inscriptionAdminServiceClient.etudiant(resultat.getCNE());
                row.createCell(1).setCellValue(etd.getNomEnFrançais());
                row.createCell(2).setCellValue(etd.getPrenomEnFrançais());
                row.createCell(3).setCellValue(resultat.getNote_final());
                String statut = resultat.getStatut() + "";
                row.createCell(4).setCellValue(statut);
                for(Resultat_RattrapageElement rrelm:rre){
                    if(rrelm.getModuleID()==moduleId && rrelm.getFiliereID()==filiereid && rrelm.getSemestreID().equals(semestreId)){
                        ElementModule elementModule=moduleServiceClient.element(rrelm.getElementID());
                        row.createCell(5).setCellValue(elementModule.getPartieCours());
                        row.createCell(6).setCellValue(rrelm.getNote_final());
                        String statutel = rrelm.getStatut() + "";
                        row.createCell(7).setCellValue(statutel);
                    }
            
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
        headers.setContentDispositionFormData("attachment", "ResultatRattrapage"+filiereid+"_"+moduleId+"_"+semestreId+".xlsx");

        return new ResponseEntity<>(outputStream.toByteArray(), headers, org.springframework.http.HttpStatus.OK);
    }
    
    // public ResponseEntity<byte[]> genererFichierResultatsExcel(Long filiereid,Long moduleId,String semestreId) throws IOException {
    //     // Créer un classeur Excel
    //     Workbook workbook = new XSSFWorkbook();
    //     Sheet sheet = workbook.createSheet("ResultatsRattrapage"+moduleId);
    //     List<Resultat_Rattrapage> resultats=allResultat_Rattrapage();

    //     // En-têtes
    //     Row headerRow = sheet.createRow(0);
    //     headerRow.createCell(0).setCellValue("CNE");
    //     headerRow.createCell(3).setCellValue("Module Id");
    //     headerRow.createCell(1).setCellValue("Filiere Id");
    //     headerRow.createCell(2).setCellValue("Semestre Id");
    //     headerRow.createCell(4).setCellValue("Note Final");
    //     headerRow.createCell(5).setCellValue("Statut");

    //     int rowNum = 1;
    //     for (Resultat_Rattrapage resultat : resultats) {
    //         if(resultat.getModuleID()==moduleId && resultat.getFiliereID()==filiereid && resultat.getSemestreID().equals(semestreId))
    //         {
    //             Row row = sheet.createRow(rowNum++);
    //             row.createCell(0).setCellValue(resultat.getCNE());
    //             row.createCell(1).setCellValue(resultat.getFiliereID());
    //             row.createCell(2).setCellValue(resultat.getSemestreID());
    //             Module module=moduleServiceClient.module(resultat.getModuleID());
    //             row.createCell(3).setCellValue(module.getIntitule());
    //             row.createCell(4).setCellValue(resultat.getNote_final());
    //             String statut = resultat.getStatut() + "";
    //             row.createCell(5).setCellValue(statut);
    //         }
    //     }


    //     // Convertir le classeur en tableau d'octets
    //     ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
    //     workbook.write(outputStream);
    //     workbook.close();

    //     // Préparer la réponse HTTP avec le fichier Excel
    //     HttpHeaders headers = new HttpHeaders();
    //     headers.setContentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
    //     headers.setContentDispositionFormData("attachment", "ResultatRattrapage"+moduleId+".xlsx");

    //     return new ResponseEntity<>(outputStream.toByteArray(), headers, org.springframework.http.HttpStatus.OK);
    // }
    
    
    @Override
    public List<Resultat_Rattrapage> addResultat_RattrapageFromExcel(String cheminFichier) {

        List<Resultat_Rattrapage> rrs = new ArrayList<>();

        try (FileInputStream fileInputStream = new FileInputStream(cheminFichier)) {
            Workbook workbook = WorkbookFactory.create(fileInputStream);
            Sheet sheet = workbook.getSheetAt(0); // Assuming data is in the first sheet

            Iterator<Row> rowIterator = sheet.iterator();

            // Skipping header row if it exists
            if (rowIterator.hasNext()) {
                rowIterator.next();
            }

            while (rowIterator.hasNext()) {
                Row row = rowIterator.next();
                Resultat_Rattrapage resultatRattrapage = createResultatFromRow(row);
                System.out.println(resultatRattrapage.toString());
                resultatRattrapage=addResultat_Rattrapage(resultatRattrapage);
                rrs.add(resultatRattrapage);
            }
        }
        catch (IOException | EncryptedDocumentException e) {
            e.printStackTrace(); // Handle exceptions appropriately
        }
        return rrs;
    }
    private Resultat_Rattrapage createResultatFromRow(Row row) {
        Resultat_Rattrapage resultatRattrapage = new Resultat_Rattrapage();

        Cell cellCNE = row.getCell(0, Row.MissingCellPolicy.CREATE_NULL_AS_BLANK);
        Cell cellFILIEREID = row.getCell(1, Row.MissingCellPolicy.CREATE_NULL_AS_BLANK);
        Cell cellSEMESTREID = row.getCell(2, Row.MissingCellPolicy.CREATE_NULL_AS_BLANK);
        Cell cellMODULEID = row.getCell(3, Row.MissingCellPolicy.CREATE_NULL_AS_BLANK);

        if (cellCNE.getCellType() == CellType.STRING) {
            resultatRattrapage.setCNE( cellCNE.getStringCellValue());
        }
        if (cellMODULEID.getCellType() == CellType.NUMERIC) {
            resultatRattrapage.setModuleID((long) cellMODULEID.getNumericCellValue());
        }
        if (cellFILIEREID.getCellType() == CellType.NUMERIC) {
            resultatRattrapage.setFiliereID((long) cellFILIEREID.getNumericCellValue());
        }
        if (cellSEMESTREID.getCellType() == CellType.STRING) {
            resultatRattrapage.setSemestreID( cellSEMESTREID.getStringCellValue());
        }
        

        return resultatRattrapage;
    }

    


    @Override
    public Resultat_RattrapageElement addResultat_RattrapageElement(Resultat_RattrapageElement element) {
        // System.out.println(element.toString());

        Resultat_RattrapageElement rre=getResultat_RattrapageElement(new Resultat_RattrapageElementID(element.getCNE(), element.getModuleID(),element.getSemestreID(), element.getFiliereID(),element.getElementID()));
        // pour mAJ (le microservice ordinaire va envoyer automatiquement les notes ordinaire)
        

        if(rre==null) {
            PlanDeValidationID id=PlanDeValidationID.builder()
                .CNE(element.getCNE())
                .elementID(element.getElementID())
                .filiereID(element.getFiliereID())
                .moduleID(element.getModuleID())
                .semestreID(element.getSemestreID())
                .build();
            PlanDeValidation pv=dsOrdinaireServiceClient.planDeValidation(id);

            System.out.println(pv.toString());
            element.setNote_ordinaire(pv.getNoteFinale());
            // rre=rattElementRepository.save(element);
            // System.out.println(rre.toString());
            
        
            float moyenne = calculerMoyenneElement(element);

            element.setNote_ratt(moyenne);
            rre = rattElementRepository.save(element);
            // System.out.println(rre.toString());
            
            ValidationParam validationParam = valParaServiceClient.getValidationParam(rre.getFiliereID());
            if (rre.getNote_final() >= validationParam.getX()) {
                rre.setStatut(Statut.V);
//                    rr.setNote_ratt(0f);
            }
            else rre.setStatut(Statut.NV);
//            System.out.println(rr.toString());
            rre= rattElementRepository.save(rre);
         
            
        }
        
        return rre;
        
    }
    private float calculerMoyenneElement(Resultat_RattrapageElement resultat_RattrapageElement) {
        float moyenne=0;
        // Suppose you have properties for the notes of each module
        Module module = moduleServiceClient.module(resultat_RattrapageElement.getModuleID());

        if (module!=null){
            // Fetch elements for the module
            List<ElementModule> elements = moduleServiceClient.getElementsForModule(module.getId());

            float totalCoefficient = 0;
            float totalWeightedNotes = 0;

            if(elements.isEmpty()){
                totalWeightedNotes = (resultat_RattrapageElement.getNoteTPratt() + resultat_RattrapageElement.getNoteExamratt() );

                totalCoefficient = 2;
            }
            else{
                for (ElementModule element : elements) {
                    if(element.getId().equals(resultat_RattrapageElement.getElementID())){
                        totalWeightedNotes = (resultat_RattrapageElement.getNoteTPratt() * element.getCoefficientTPs()
                                + resultat_RattrapageElement.getNoteExamratt() * element.getCoefficientCours());

                        totalCoefficient = (element.getCoefficientTPs() + element.getCoefficientCours());

                    }

                }
            }


            // Ensure that totalCoefficient is not zero to avoid division by zero
            moyenne = (totalCoefficient != 0) ? totalWeightedNotes / totalCoefficient : 0;

        }
        return moyenne;

    }


    @Override
    public Resultat_RattrapageElement updateRattrapageElement(Resultat_RattrapageElement resultatRattrapageElement) {
        Resultat_RattrapageElement rre = getResultat_RattrapageElement(new Resultat_RattrapageElementID(resultatRattrapageElement.getCNE(), resultatRattrapageElement.getModuleID(),resultatRattrapageElement.getSemestreID(), resultatRattrapageElement.getFiliereID(), resultatRattrapageElement.getElementID()));
        if(rre == null){
            throw new NotFoundException("Resultat_RattrapageElement not found");
        }
        if(rre != null){
            if(resultatRattrapageElement.getNoteExamratt()!=null ) {
                rre.setNoteExamratt(resultatRattrapageElement.getNoteExamratt());
            }
            if(resultatRattrapageElement.getNoteTPratt()!=null ) {
                rre.setNoteTPratt(resultatRattrapageElement.getNoteTPratt());
            }
            PlanDeValidationID id=PlanDeValidationID.builder()
                .CNE(rre.getCNE())
                .elementID(rre.getElementID())
                .filiereID(rre.getFiliereID())
                .moduleID(rre.getModuleID())
                .semestreID(rre.getSemestreID())
                .build();
            PlanDeValidation pv=dsOrdinaireServiceClient.planDeValidation(id);

            // System.out.println(pv.toString());
            rre.setNote_ordinaire(pv.getNoteFinale());
            // rre=rattElementRepository.save(element);
            // System.out.println(rre.toString());
            
        
            float moyenne = calculerMoyenneElement(rre);

            rre.setNote_ratt(moyenne);
            rre = rattElementRepository.save(rre);

            ValidationParam validationParam = valParaServiceClient.getValidationParam(rre.getFiliereID());


            if (rre.getNote_final() >= validationParam.getX()) {
                rre.setStatut(Statut.V);
//                    rr.setNote_ratt(0f);
            }
            else rre.setStatut(Statut.NV);
            rre= rattElementRepository.save(rre);
            
        }
        return rre;
    }

    @Override
    public List<Resultat_RattrapageElement> addResultat_RattrapageElementsFromExcel(String cheminFichier) {
        List<Resultat_RattrapageElement> rrs = new ArrayList<>();

        try (FileInputStream fileInputStream = new FileInputStream(cheminFichier)) {
            Workbook workbook = WorkbookFactory.create(fileInputStream);
            Sheet sheet = workbook.getSheetAt(0); // Assuming data is in the first sheet

            Iterator<Row> rowIterator = sheet.iterator();

            // Skipping header row if it exists
            if (rowIterator.hasNext()) {
                rowIterator.next();
            }

            while (rowIterator.hasNext()) {
                Row row = rowIterator.next();
                Resultat_RattrapageElement resultatRattrapage = createResultatFromRowElemet(row);
                // System.out.println(resultatRattrapage.toString());
                resultatRattrapage=addResultat_RattrapageElement(resultatRattrapage);
                rrs.add(resultatRattrapage);
            }
        }
        catch (IOException | EncryptedDocumentException e) {
            e.printStackTrace(); // Handle exceptions appropriately
        }
        return rrs;
    }
    private Resultat_RattrapageElement createResultatFromRowElemet(Row row) {
        Resultat_RattrapageElement resultatRattrapageElement = new Resultat_RattrapageElement();

        Cell cellCNE = row.getCell(0, Row.MissingCellPolicy.CREATE_NULL_AS_BLANK);
        Cell cellFILIEREID = row.getCell(1, Row.MissingCellPolicy.CREATE_NULL_AS_BLANK);
        Cell cellSEMESTREID = row.getCell(2, Row.MissingCellPolicy.CREATE_NULL_AS_BLANK);
        Cell cellMODULEID = row.getCell(3, Row.MissingCellPolicy.CREATE_NULL_AS_BLANK);
        Cell cellElemetID = row.getCell(4, Row.MissingCellPolicy.CREATE_NULL_AS_BLANK);
        Cell cellNoteTP = row.getCell(5, Row.MissingCellPolicy.CREATE_NULL_AS_BLANK);
        Cell cellNoteCours = row.getCell(6, Row.MissingCellPolicy.CREATE_NULL_AS_BLANK);

        if (cellCNE.getCellType() == CellType.STRING) {
            resultatRattrapageElement.setCNE( cellCNE.getStringCellValue());
        }
        if (cellMODULEID.getCellType() == CellType.NUMERIC) {
            resultatRattrapageElement.setModuleID((long) cellMODULEID.getNumericCellValue());
        }
        if (cellFILIEREID.getCellType() == CellType.NUMERIC) {
            resultatRattrapageElement.setFiliereID((long) cellFILIEREID.getNumericCellValue());
        }
        if (cellSEMESTREID.getCellType() == CellType.STRING) {
            resultatRattrapageElement.setSemestreID( cellSEMESTREID.getStringCellValue());
        }
        if (cellElemetID.getCellType() == CellType.NUMERIC) {
            resultatRattrapageElement.setElementID( (long)cellElemetID.getNumericCellValue());
        }
        if (cellNoteTP.getCellType() == CellType.NUMERIC) {
            resultatRattrapageElement.setNoteTPratt((float) cellNoteTP.getNumericCellValue());
        }
        if (cellNoteCours.getCellType() == CellType.NUMERIC) {
            resultatRattrapageElement.setNoteExamratt((float) cellNoteCours.getNumericCellValue());
        }

        return resultatRattrapageElement;
    }



    @Override
    public List<Resultat_RattrapageElement> allResultat_RattrapageElements() {
        // TODO Auto-generated method stub
        return rattElementRepository.findAll();
    }




    @Override
    public void deleteResultat_RattrapageElement(Resultat_RattrapageElementID ids) {
        // TODO Auto-generated method stub
        rattElementRepository.deleteById(ids);
    }




    @Override
    public ResponseEntity<byte[]> genererFichierResultatsElementleExcel(Long elementId) throws IOException {
            // Créer un classeur Excel
            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("ResultatsRattrapage"+elementId);
            List<Resultat_RattrapageElement> resultats=allResultat_RattrapageElements();
    
            // En-têtes
            Row headerRow = sheet.createRow(0);
            headerRow.createCell(0).setCellValue("CNE");
            headerRow.createCell(1).setCellValue("Filiere Id");
            headerRow.createCell(2).setCellValue("Semestre Id");
            headerRow.createCell(3).setCellValue("Module ");
            headerRow.createCell(4).setCellValue("Element ");
            headerRow.createCell(5).setCellValue("Note Final");
            headerRow.createCell(6).setCellValue("Statut");
    
            int rowNum = 1;
            for (Resultat_RattrapageElement resultat : resultats) {
                if(resultat.getElementID()==elementId)
                {
                    Row row = sheet.createRow(rowNum++);
                    row.createCell(0).setCellValue(resultat.getCNE());
                    row.createCell(1).setCellValue(resultat.getFiliereID());
                    row.createCell(2).setCellValue(resultat.getSemestreID());
                    Module module=moduleServiceClient.module(resultat.getModuleID());
                    // List<ElementModule> elementModules=module.getElementsModule();
                    row.createCell(3).setCellValue(module.getIntitule());
                    row.createCell(4).setCellValue(resultat.getElementID());
                    row.createCell(5).setCellValue(resultat.getNote_final());
                    String statut = resultat.getStatut() + "";
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
            headers.setContentDispositionFormData("attachment", "ResultatRattrapageElement"+elementId+".xlsx");
    
            return new ResponseEntity<>(outputStream.toByteArray(), headers, org.springframework.http.HttpStatus.OK);
        }




    @Override
    public Resultat_RattrapageElement getResultat_RattrapageElement(Resultat_RattrapageElementID rattrapageElementID) {
        // TODO Auto-generated method stub
        return rattElementRepository.findById(rattrapageElementID).orElse(null);
    }




    @Override
    public List<Resultat_RattrapageElement> ResultatelementsdeModule(String CNE, Long FiliereID, Long ModuleID,String SemestreID) {
        List<Resultat_RattrapageElement> elements=rattElementRepository.findByCNEAndFiliereIDAndModuleIDAndSemestreID(CNE,FiliereID, ModuleID, SemestreID);
            
        return elements;
    }



    

   
    
    
}
