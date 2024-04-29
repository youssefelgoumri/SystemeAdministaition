package com.example.deliberationsessionordinaireservice.services;

import com.example.deliberationsessionordinaireservice.entities.*;
import com.example.deliberationsessionordinaireservice.feign.DSemestreServiceClient;
import com.example.deliberationsessionordinaireservice.feign.EtudiantServiceClient;
import com.example.deliberationsessionordinaireservice.feign.ModuleFeignClient;
import com.example.deliberationsessionordinaireservice.feign.ValParaServiceClient;
import com.example.deliberationsessionordinaireservice.models.*;
import com.example.deliberationsessionordinaireservice.models.Module;
import com.example.deliberationsessionordinaireservice.repositories.PlanDeValidationModuleRepository;
import com.example.deliberationsessionordinaireservice.repositories.PlanDeValidationRepository;
import jakarta.ws.rs.NotFoundException;
import lombok.AllArgsConstructor;
import org.apache.poi.EncryptedDocumentException;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class PVServiceImp implements PVService{
    @Autowired
    private PlanDeValidationRepository planDeValidationRepository;
    @Autowired
    private PlanDeValidationModuleRepository planDeValidationModuleRepository;
    ValParaServiceClient valParaServiceClient;
    DSemestreServiceClient dSemestreServiceClient;
    ModuleFeignClient moduleServiceClient;
    EtudiantServiceClient etudiantServiceClient;


    @Override
    public List<Element> getElementsForModule(Long moduleId) {
        return moduleServiceClient.getElementsForModule(moduleId);
    }

    //Module :
    @Override
    public PlanDeValidationModule getPlanDeValidationModuleById(PlanDeValidationModuleID ids) {
        return planDeValidationModuleRepository.findById(ids).orElse(null);
    }




    @Override
    public List<PlanDeValidationModule> getAllPVsModule() {
        return planDeValidationModuleRepository.findAll();
    }

    @Override
    public PlanDeValidationModule addPlanDeValidationModule(PlanDeValidationModule planDeValidationModule) {
        boolean oneIsRatt=false;
        float moyenne=0;
        PlanDeValidationModule pvm=null;
        System.out.println("addPlanDeValidationModule --------- ");

        List<Element> listElts= getElementsForModule(planDeValidationModule.getModuleID());


        List<PlanDeValidation> listpve = planDeValidationRepository.findByCNEAndModuleIDAndFiliereIDAndSemestreID(planDeValidationModule.getCNE(), planDeValidationModule.getModuleID(), planDeValidationModule.getFiliereID(), planDeValidationModule.getSemestreID());

        System.out.println("listpve : "+ listpve);

        System.out.println("listElts : "+ listElts.size());
        System.out.println("listpve : "+ listpve.size());

        if(listpve.size() == listElts.size()){

        pvm=getPlanDeValidationModuleById(new PlanDeValidationModuleID(planDeValidationModule.getCNE(), planDeValidationModule.getModuleID(),planDeValidationModule.getSemestreID(), planDeValidationModule.getFiliereID()));

        ValidationParam validationParam = valParaServiceClient.getValidationParam(planDeValidationModule.getFiliereID());

        if(pvm==null && validationParam!=null) {

            pvm = planDeValidationModuleRepository.save(planDeValidationModule);




                //si un element est rattrapage alors le module sera rattrapage
                for(PlanDeValidation planDeValidation:listpve){
                    if(planDeValidation.getResultat()==Resultat.Rattrapage){
                        oneIsRatt=true;
                    }
                }
                if(oneIsRatt){

                    //module est ratt car il y a au moins un element ratt
                    moyenne = calculerMoyenneModule(listpve);
                    pvm.setNoteFinale(moyenne);
                    pvm = planDeValidationModuleRepository.save(pvm);

                    pvm.setResultat(Resultat.Rattrapage);
                    pvm = planDeValidationModuleRepository.save(pvm);

                }
                else{
                    moyenne = calculerMoyenneModule(listpve);
                    pvm.setNoteFinale(moyenne);

                    pvm = planDeValidationModuleRepository.save(pvm);

                    Resultat rs = determinerResultat(moyenne,validationParam);
                    pvm.setResultat(rs);

                    pvm = planDeValidationModuleRepository.save(pvm);

                }

                System.out.println("listpve : "+ listpve);


                List<PlanDeValidationModule> pvValideModule = etudiantsValideModule();
                for(PlanDeValidationModule pvv:pvValideModule){
                    Resultat_Module resultatModule=Resultat_Module.builder()
                            .moduleID(pvv.getModuleID())
                            .semestreID(pvv.getSemestreID())
                            .filiereID(pvv.getFiliereID())
                            .CNE(pvv.getCNE())
                            .note_finale(pvv.getNoteFinale())
                            .resultat(pvv.getResultat())
                            .build();
                    Resultat_ModuleID idsMod=Resultat_ModuleID.builder()
                            .moduleID(pvv.getModuleID())
                            .filiereID(pvv.getFiliereID())
                            .semestreID(pvv.getSemestreID())
                            .CNE(pvv.getCNE())
                            .build();
               Resultat_Module resultat_module=dSemestreServiceClient.getResultatModuleByid(idsMod);
               if (resultat_module==null)
                   dSemestreServiceClient.addResultatModule(resultatModule);
               else dSemestreServiceClient.editResultatModule(resultatModule);

                }

        }
        }

        else{
            pvm = null;

        }
        return pvm;
    }

    // ajouter les methodes edit et delete
    // ...
    @Override
    public PlanDeValidationModule editPlanDeValidationModule(PlanDeValidationModule planDeValidationModule) {
        System.out.println("editPlanDeValidationModule --------- ");

        boolean oneIsRatt=false;
        float moyenne=0;
        PlanDeValidationModule pvm=null;

        List<Element> listElts= getElementsForModule(planDeValidationModule.getModuleID());


        List<PlanDeValidation> listpve = planDeValidationRepository.findByCNEAndModuleIDAndFiliereIDAndSemestreID(planDeValidationModule.getCNE(), planDeValidationModule.getModuleID(), planDeValidationModule.getFiliereID(), planDeValidationModule.getSemestreID());

        System.out.println("listpve : "+ listpve);


        System.out.println("listElts : "+ listElts.size());
        System.out.println("listpve : "+ listpve.size());

        if(listpve.size() == listElts.size()){

            pvm=getPlanDeValidationModuleById(new PlanDeValidationModuleID(planDeValidationModule.getCNE(), planDeValidationModule.getModuleID(),planDeValidationModule.getSemestreID(), planDeValidationModule.getFiliereID()));

            if(pvm!=null) {

                pvm = planDeValidationModuleRepository.save(planDeValidationModule);
                System.out.println("pvm : "+ pvm);

                ValidationParam validationParam = valParaServiceClient.getValidationParam(pvm.getFiliereID());



                //si un element est rattrapage alors le module sera rattrapage
                for(PlanDeValidation planDeValidation:listpve){
                    if(planDeValidation.getResultat()==Resultat.Rattrapage){
                        oneIsRatt=true;
                    }
                }
                if(oneIsRatt){

                    //module est ratt car il y a au moins un element ratt
                    moyenne = calculerMoyenneModule(listpve);
                    pvm.setNoteFinale(moyenne);
                    pvm = planDeValidationModuleRepository.save(pvm);

                    pvm.setResultat(Resultat.Rattrapage);
                    pvm = planDeValidationModuleRepository.save(pvm);

                }
                else{
                    moyenne = calculerMoyenneModule(listpve);
                    pvm.setNoteFinale(moyenne);

                    pvm = planDeValidationModuleRepository.save(pvm);

                    Resultat rs = determinerResultat(moyenne,validationParam);
                    pvm.setResultat(rs);

                    pvm = planDeValidationModuleRepository.save(pvm);
                    System.out.println("pvm2 : "+ pvm);

                }

                System.out.println("listpve : "+ listpve);


                List<PlanDeValidationModule> pvValideModule = etudiantsValideModule();
                for(PlanDeValidationModule pvv:pvValideModule){
                    Resultat_Module resultatModule=Resultat_Module.builder()
                            .moduleID(pvv.getModuleID())
                            .semestreID(pvv.getSemestreID())
                            .filiereID(pvv.getFiliereID())
                            .CNE(pvv.getCNE())
                            .note_finale(pvv.getNoteFinale())
                            .resultat(pvv.getResultat())
                            .build();
                    Resultat_ModuleID idsMod=Resultat_ModuleID.builder()
                            .moduleID(pvv.getModuleID())
                            .filiereID(pvv.getFiliereID())
                            .semestreID(pvv.getSemestreID())
                            .CNE(pvv.getCNE())
                            .build();
                    Resultat_Module resultat_module=dSemestreServiceClient.getResultatModuleByid(idsMod);
                    if (resultat_module==null){
                        dSemestreServiceClient.addResultatModule(resultatModule);
                        System.out.println("semestre add : "+ resultatModule);

                    }
                    else{
                        dSemestreServiceClient.editResultatModule(resultatModule);
                        System.out.println("semestre edit : "+ resultatModule);
                    }

                }

            }
        }

        else{
            pvm = null;

        }
        return pvm;
    }

    @Override
    public void deletePlanDeValidationModule(PlanDeValidationModuleID pvId) {
        planDeValidationModuleRepository.deleteById(pvId);
    }







    //Elements :

    @Override
    public PlanDeValidation getPlanDeValidationById(PlanDeValidationID ids) {
        return planDeValidationRepository.findById(ids).orElse(null);
    }

    @Override
    public List<PlanDeValidation> getAllPVs() {
        return planDeValidationRepository.findAll();
    }

    @Override
    public PlanDeValidation addPlanDeValidation(PlanDeValidation planDeValidation) {
        PlanDeValidation pv=getPlanDeValidationById(new PlanDeValidationID(planDeValidation.getCNE(), planDeValidation.getModuleID(),planDeValidation.getSemestreID(), planDeValidation.getFiliereID(),planDeValidation.getElementID()));
        ValidationParam validationParam = valParaServiceClient.getValidationParam(planDeValidation.getFiliereID());

        if(pv==null && validationParam!=null) {

            pv = planDeValidationRepository.save(planDeValidation);


            float moyenne = calculerMoyenneElement(pv);

            pv.setNoteFinale(moyenne);
            pv= planDeValidationRepository.save(pv);

            Resultat rs = determinerResultat(moyenne,validationParam);
            pv.setResultat(rs);

            pv= planDeValidationRepository.save(pv);

//            List<PlanDeValidation> pvValide = etudiantsValide();
//
//            for(PlanDeValidation pvv:pvValide) {
//                Resultat_Module resultatModule = Resultat_Module.builder()
//                        .moduleID(pvv.getModuleID())
//                        .semestreID(pvv.getSemestreID())
//                        .filiereID(pvv.getFiliereID())
//                        .CNE(pvv.getCNE())
//                        //.elementID(pvv.getElementID())
//                        .note_finale(pvv.getNoteFinale())
//                        .resultat(pvv.getResultat())
//                        .build();
//                Resultat_ModuleID idsMod = Resultat_ModuleID.builder()
//                        .moduleID(pvv.getModuleID())
//                        .filiereID(pvv.getFiliereID())
//                        .semestreID(pvv.getSemestreID())
//                        //.elementID(pvv.getElementID())
//                        .CNE(pvv.getCNE())
//                        .build();
//                Resultat_Module resultat_module = dSemestreServiceClient.getResultatModuleByid(idsMod);
//
//                if (resultat_module == null)
//                    dSemestreServiceClient.addResultatModule(resultatModule);
//                else dSemestreServiceClient.editResultatModule(resultatModule);
//
//
//                //List<PlanDeValidation> pvRatt = etudiantsRattrapage();
//                //send ratt plan de validation to microservice delib rattraprage
//
//            }
//


        }
        return pv;
    }

    @Override
    public PlanDeValidation editPlanDeValidation(PlanDeValidation planDeValidation){
        PlanDeValidation pv = getPlanDeValidationById(new PlanDeValidationID(planDeValidation.getCNE(), planDeValidation.getModuleID(),planDeValidation.getSemestreID(), planDeValidation.getFiliereID(), planDeValidation.getElementID()));

        System.out.println("pv : "+ pv);

        if(pv == null){
            throw new NotFoundException("Plan de validation not found");
        }
        if(pv != null){
            if(pv.getNoteExam()!=planDeValidation.getNoteExam() ) {
                pv.setNoteExam(planDeValidation.getNoteExam());
            }
            if(pv.getNoteTP()!=planDeValidation.getNoteTP() ) {
                pv.setNoteTP(planDeValidation.getNoteTP());
            }
            pv = planDeValidationRepository.save(pv);

            ValidationParam validationParam = valParaServiceClient.getValidationParam(pv.getFiliereID());

            //calculer note finale et resultat



            float moyenne = calculerMoyenneElement(pv);
            System.out.println("moyenne : "+ moyenne);

            pv.setNoteFinale(moyenne);
            pv= planDeValidationRepository.save(pv);

            Resultat rs = determinerResultat(moyenne,validationParam);
            pv.setResultat(rs);
            pv= planDeValidationRepository.save(pv);
            System.out.println("Resultat : "+ rs);

            System.out.println("pv : "+ pv);


            List<PlanDeValidation> pvValide = etudiantsValide();
            for(PlanDeValidation pvv:pvValide){
                Resultat_Module resultatModule=Resultat_Module.builder()
                        .moduleID(pvv.getModuleID())
                        .semestreID(pvv.getSemestreID())
                        .filiereID(pvv.getFiliereID())
                        .CNE(pvv.getCNE())
                        .note_finale(pvv.getNoteFinale())
                        .resultat(pvv.getResultat())
                        .build();
                Resultat_ModuleID idsMod=Resultat_ModuleID.builder()
                        .moduleID(pvv.getModuleID())
                        .filiereID(pvv.getFiliereID())
                        .semestreID(pvv.getSemestreID())
                        .CNE(pvv.getCNE())
                        .build();
//                Resultat_Module resultat_module=dSemestreServiceClient.getResultatModuleByid(idsMod);
//                if (resultat_module==null)
//                    dSemestreServiceClient.addResultatModule(resultatModule);
//                else dSemestreServiceClient.editResultatModule(resultatModule);

            }

            //List<PlanDeValidation> pvRatt = etudiantsRattrapage();
            //send updated ratt plan de validation to microservice delib rattraprage




        }


        return pv;
    }



    @Override
    public void deletePlanDeValidation(PlanDeValidationID pvId) {
        planDeValidationRepository.deleteById(pvId);
    }




//    public void calculerMoyennesEtResultats() {
//        // Logique de calcul des moyennes et résultats ici
//    }


//    private float calculerMoyenneModule(PlanDeValidation planDeValidation) {
//        float moyenne=0;
//        // Suppose you have properties for the notes of each module
//        Module module = moduleServiceClient.module(planDeValidation.getModuleID());
//        System.out.println(module);
//
//        if (module!=null){
//            // Fetch elements for the module
//            List<Element> elements = moduleServiceClient.getElementsForModule(module.getId());
//
//            float totalCoefficient = 0;
//            float totalWeightedNotes = 0;
//
//            for (Element element : elements) {
//                // Assuming planDeValidation has properties like noteControl, noteTP, noteExam for each element
//                totalWeightedNotes += (planDeValidation.getNoteTP() * element.getCoefficientTPs()
//                        + planDeValidation.getNoteExam() * element.getCoefficientCours());
//
//                totalCoefficient += (element.getCoefficientTPs() + element.getCoefficientCours());
//            }
//
//            // Ensure that totalCoefficient is not zero to avoid division by zero
//            moyenne = (totalCoefficient != 0) ? totalWeightedNotes / totalCoefficient : 0;
//            System.out.println(moyenne);
//
//        }
//        return moyenne;
//
//    }


    private float calculerMoyenneElement(PlanDeValidation planDeValidation) {
        float moyenne=0;
        // Suppose you have properties for the notes of each module
        Module module = moduleServiceClient.module(planDeValidation.getModuleID());

        if (module!=null){
            // Fetch elements for the module
            List<Element> elements = moduleServiceClient.getElementsForModule(module.getId());

            float totalCoefficient = 0;
            float totalWeightedNotes = 0;

            if(elements.isEmpty()){
                totalWeightedNotes = (planDeValidation.getNoteTP() + planDeValidation.getNoteExam() );

                totalCoefficient = 2;
            }
            else{
                for (Element element : elements) {
                    if(element.getId().equals(planDeValidation.getElementID())){
                        totalWeightedNotes = (planDeValidation.getNoteTP() * element.getCoefficientTPs()
                                + planDeValidation.getNoteExam() * element.getCoefficientCours());

                        totalCoefficient = (element.getCoefficientTPs() + element.getCoefficientCours());

                    }

                }
            }


            // Ensure that totalCoefficient is not zero to avoid division by zero
            moyenne = (totalCoefficient != 0) ? totalWeightedNotes / totalCoefficient : 0;

        }
        return moyenne;

    }

    private float calculerMoyenneModule(List<PlanDeValidation> listpve) {
        float moyenne=0;
        float elementMoyenne=0;
        Integer elementControbution=0;

        float totalCoefficient = 0;
        float totalWeightedNotes = 0;

        List<Long> eltID = new ArrayList<>();

        for (PlanDeValidation planDeValidation : listpve) {
            eltID.add(planDeValidation.getElementID());
        }
        System.out.println("eltID"+ eltID);

        Map<Long, Integer> controbutions= moduleServiceClient.controbutions(eltID);


        for (PlanDeValidation planDeValidation : listpve) {

            if (planDeValidation!=null){

                elementControbution = controbutions.get(planDeValidation.getElementID());
                System.out.println("elementControbution"+ elementControbution);

                elementMoyenne = planDeValidation.getNoteFinale();

                totalWeightedNotes += (elementMoyenne * elementControbution);
                System.out.println("totalWeightedNotes"+ totalWeightedNotes);

                totalCoefficient += elementControbution;
                System.out.println("totalCoefficient"+ totalCoefficient);

            }

        }
        // Ensure that totalCoefficient is not zero to avoid division by zero
        moyenne = (totalCoefficient != 0) ? totalWeightedNotes / totalCoefficient : 0;
        System.out.println("moyenne"+moyenne);
        return moyenne;

    }


//        private float calculerMoyenneElement(PlanDeValidation planDeValidation, Element element) {
//            float moyenne=0;
//            float totalCoefficient = 0;
//            float totalWeightedNotes = 0;
//
//            if (element!=null){
//
//                totalWeightedNotes = (planDeValidation.getNoteTP() * element.getCoefficientTPs()
//                        + planDeValidation.getNoteExam() * element.getCoefficientCours());
//
//                totalCoefficient = (element.getCoefficientTPs() + element.getCoefficientCours());
//
//                // Ensure that totalCoefficient is not zero to avoid division by zero
//                moyenne = (totalCoefficient != 0) ? totalWeightedNotes / totalCoefficient : 0;
//            }
//
//
//        return moyenne;
//
//    }

//    private float calculerMoyenneModule(PlanDeValidation planDeValidation) {
//        float moyenne=0;
//        float elementMoyenne=0;
//        Integer elementControbution=0;
//
//        // Suppose you have properties for the notes of each module
//        Module module = moduleServiceClient.module(planDeValidation.getModuleID());
//        System.out.println(module);
//
//        if (module!=null){
//            // Fetch elements for the module
//            List<Element> elements = moduleServiceClient.getElementsForModule(module.getId());
//
//            float totalCoefficient = 0;
//            float totalWeightedNotes = 0;
//
//            for (Element element : elements) {
//
//                Map<Long, Integer> controbutions= moduleServiceClient.controbutions();
//                elementControbution = controbutions.get(element.getId());
//                System.out.println("elementControbution"+ elementControbution);
//
//                //planDeValidation.getNoteTP Map
//
//                elementMoyenne = calculerMoyenneElement(planDeValidation,element);
//                System.out.println("elementMoyenne"+ elementMoyenne);
//
//
//                totalWeightedNotes += (elementMoyenne * elementControbution);
//                System.out.println("totalWeightedNotes"+ totalWeightedNotes);
//
//                totalCoefficient += elementControbution;
//                System.out.println("totalCoefficient"+ totalCoefficient);
//
//            }
//
//            // Ensure that totalCoefficient is not zero to avoid division by zero
//            moyenne = (totalCoefficient != 0) ? totalWeightedNotes / totalCoefficient : 0;
//            System.out.println("moyenne"+moyenne);
//
//        }
//        return moyenne;
//
//    }



    private Resultat determinerResultat(float moyenneModule,ValidationParam validationParam) {
        // X représente la moyenne nécessaire pour valider un module
        float seuilValidation = validationParam.getX();
        return (moyenneModule >= seuilValidation) ? Resultat.Valide : Resultat.Rattrapage;
    }

//
//    private double getX() {
//        // Récupérer la valeur de X depuis une source externe (par exemple, configuration, base de données)
//        // X : représente la moyenne pour valider un module
//        return 10.0; // Valeur de démo, ajustez en fonction de vos besoins
//    }


    @Override
    public List<PlanDeValidation> etudiantsRattrapage() {
        return planDeValidationRepository.findByResultat(Resultat.Rattrapage);
    }

    @Override
    public List<PlanDeValidation> etudiantsValide() {
        return planDeValidationRepository.findByResultat(Resultat.Valide);
    }

    @Override
    public List<PlanDeValidationModule> etudiantsValideModule() {
        return planDeValidationModuleRepository.findByResultat(Resultat.Valide);
    }

    @Override
    public List<PlanDeValidationModule> etudiantsRattrapageModule() {
        return planDeValidationModuleRepository.findByResultat(Resultat.Rattrapage);
    }


    //excel from the specified module id
    @Override
    public ResponseEntity<byte[]> genererFichierResultatsExcelOfModule(Long id) throws IOException {

        Module module = moduleServiceClient.module(id);
        List<Element> elts = moduleServiceClient.getElementsForModule(id);
        int nbElements = elts.size();


        // Créer un classeur Excel
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("ResultatsOrdinaireModule" + module.getIntitule());
        List<PlanDeValidationModule> PVs=planDeValidationModuleRepository.findByModuleID(id);



        // En-têtes
        Row headerRow = sheet.createRow(0);
        headerRow.createCell(0).setCellValue("CNE");
        headerRow.createCell(1).setCellValue("NOM");
        headerRow.createCell(2).setCellValue("PRENOM");

        for(int i=0; i < nbElements; i++){
            Element e = elts.get(i);
            headerRow.createCell(3+i).setCellValue(e.getPartieCours());
        }

        headerRow.createCell(3+nbElements).setCellValue("Note Ordinaire");
        headerRow.createCell(4+nbElements).setCellValue("Statut");

        int rowNum = 1;
        for (PlanDeValidationModule planDeValidation : PVs) {

//            Module module = moduleServiceClient.module(planDeValidation.getModuleID());

            Etudiant etudiant = etudiantServiceClient.etudiant(planDeValidation.getCNE());
            String nom = etudiant.getNomEnFrançais();
            String prenom = etudiant.getPrenomEnFrançais();
//            String intitule = module.getIntitule();

//            String nom = "El Goumri";
//            String prenom = "Youssef";
            String intitule = module.getIntitule();

            List<PlanDeValidation> pvsElt = planDeValidationRepository.findByCNEAndModuleIDAndFiliereIDAndSemestreID(planDeValidation.getCNE(), planDeValidation.getModuleID(), planDeValidation.getFiliereID(),planDeValidation.getSemestreID());


            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(planDeValidation.getCNE());
            row.createCell(1).setCellValue(nom);
            row.createCell(2).setCellValue(prenom);

            for(int i=0; i < nbElements; i++){
                PlanDeValidation pvElt = pvsElt.get(i);
                row.createCell(3+i).setCellValue(pvElt.getNoteFinale());
            }

            row.createCell(3+nbElements).setCellValue(planDeValidation.getNoteFinale());
            String statut = planDeValidation.getResultat() + "";
            row.createCell(4+nbElements).setCellValue(statut);
        }


        // Convertir le classeur en tableau d'octets
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        workbook.write(outputStream);
        workbook.close();

        // Préparer la réponse HTTP avec le fichier Excel
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
        headers.setContentDispositionFormData("attachment", "ResultatsOrdinaireModule" + module.getIntitule() + ".xlsx");

        return new ResponseEntity<>(outputStream.toByteArray(), headers, org.springframework.http.HttpStatus.OK);
    }


    //excel from all the modules

//    @Override
//    public ResponseEntity<byte[]> genererFichierResultatsExcelOfModule() throws IOException {
//        // Créer un classeur Excel
//        Workbook workbook = new XSSFWorkbook();
//        Sheet sheet = workbook.createSheet("ResultatsOrdinaireModule");
//        List<PlanDeValidationModule> PVs=getAllPVsModule();
//
//        // En-têtes
//        Row headerRow = sheet.createRow(0);
//        headerRow.createCell(0).setCellValue("CNE");
//        headerRow.createCell(1).setCellValue("NOM");
//        headerRow.createCell(2).setCellValue("PRENOM");
//        headerRow.createCell(3).setCellValue("Module");
//        headerRow.createCell(4).setCellValue("Note Ordinaire");
//        headerRow.createCell(5).setCellValue("Statut");
//
//        int rowNum = 1;
//        for (PlanDeValidationModule planDeValidation : PVs) {
//
//            Module module = moduleServiceClient.module(planDeValidation.getModuleID());
////
////            Etudiant etudiant = etudiantServiceClient.etudiant(planDeValidation.getCNE());
////            String nom = etudiant.getNomEnFrançais();
////            String prenom = etudiant.getPrenomEnFrançais();
////            String intitule = module.getIntitule();
//
//            String nom = "El Goumri";
//            String prenom = "Youssef";
//            String intitule = module.getIntitule();
//
//
//            Row row = sheet.createRow(rowNum++);
//            row.createCell(0).setCellValue(planDeValidation.getCNE());
//            row.createCell(1).setCellValue(nom);
//            row.createCell(2).setCellValue(prenom);
//            row.createCell(3).setCellValue(intitule);
//            row.createCell(4).setCellValue(planDeValidation.getNoteFinale());
//            String statut = planDeValidation.getResultat() + "";
//            row.createCell(5).setCellValue(statut);
//        }
//
//
//        // Convertir le classeur en tableau d'octets
//        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
//        workbook.write(outputStream);
//        workbook.close();
//
//        // Préparer la réponse HTTP avec le fichier Excel
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
//        headers.setContentDispositionFormData("attachment", "ResultatsOrdinaireModule.xlsx");
//
//        return new ResponseEntity<>(outputStream.toByteArray(), headers, org.springframework.http.HttpStatus.OK);
//    }




    @Override
    public ResponseEntity<byte[]> genererFichierResultatsExcel() throws IOException {
        // Créer un classeur Excel
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("ResultatsOrdinaire");
        List<PlanDeValidation> PVs=getAllPVs();

        // En-têtes
        Row headerRow = sheet.createRow(0);
        headerRow.createCell(0).setCellValue("CNE");
        headerRow.createCell(3).setCellValue("Module Id");
        headerRow.createCell(1).setCellValue("Filiere Id");
        headerRow.createCell(2).setCellValue("Semestre Id");
        headerRow.createCell(4).setCellValue("Element Id");
        headerRow.createCell(5).setCellValue("Note Exam");
        headerRow.createCell(6).setCellValue("Note TP");
        headerRow.createCell(7).setCellValue("Note Final");
        headerRow.createCell(8).setCellValue("Statut");

        int rowNum = 1;
        for (PlanDeValidation planDeValidation : PVs) {

//            Etudiant etudiant = etudiantServiceClient.etudiant(planDeValidation.getCNE());
//            Module module = moduleServiceClient.module(planDeValidation.getModuleID());


            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(planDeValidation.getCNE());
            row.createCell(1).setCellValue(planDeValidation.getFiliereID());
            row.createCell(2).setCellValue(planDeValidation.getSemestreID());
            row.createCell(3).setCellValue(planDeValidation.getModuleID());
            row.createCell(4).setCellValue(planDeValidation.getElementID());
            row.createCell(5).setCellValue(planDeValidation.getNoteExam());
            row.createCell(6).setCellValue(planDeValidation.getNoteTP());
            row.createCell(7).setCellValue(planDeValidation.getNoteFinale());
            String statut = planDeValidation.getResultat() + "";
            row.createCell(8).setCellValue(statut);
        }


        // Convertir le classeur en tableau d'octets
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        workbook.write(outputStream);
        workbook.close();

        // Préparer la réponse HTTP avec le fichier Excel
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
        headers.setContentDispositionFormData("attachment", "ResultatOrdinaire.xlsx");

        return new ResponseEntity<>(outputStream.toByteArray(), headers, org.springframework.http.HttpStatus.OK);
    }


    @Override
    public List<PlanDeValidation> addPlanDeValidationFromExcel(String cheminFichier) {

        List<PlanDeValidation> PVs = new ArrayList<>();

        try (FileInputStream fileInputStream = new FileInputStream(cheminFichier)) {
            Workbook workbook = WorkbookFactory.create(fileInputStream);
            Sheet sheet = workbook.getSheetAt(0); // Assuming data is in the first sheet

            Iterator<Row> rowIterator = sheet.iterator();

            // Skipping header row if it exists
            if (rowIterator.hasNext()) {
                rowIterator.next();
            }

            List<PlanDeValidationModuleID> listPVM = new ArrayList<>();

            while (rowIterator.hasNext()) {
                Row row = rowIterator.next();
                PlanDeValidation planDeValidation = createPVFromRow(row);
                System.out.println(planDeValidation.toString());
                planDeValidation=addPlanDeValidation(planDeValidation);
                PVs.add(planDeValidation);
                PlanDeValidationModuleID planDeValidationModuleID = new PlanDeValidationModuleID(planDeValidation.getCNE(), planDeValidation.getModuleID(),planDeValidation.getSemestreID(), planDeValidation.getFiliereID());

                if(!listPVM.contains(planDeValidationModuleID)){
                    listPVM.add(planDeValidationModuleID);
                    System.out.println("planDeValidationModuleID : "+planDeValidationModuleID);

                }
            }
            for (PlanDeValidationModuleID pvID:listPVM) {
                PlanDeValidationModule planDeValidationModule = new PlanDeValidationModule(pvID.getCNE(),pvID.getModuleID(),pvID.getSemestreID(),pvID.getFiliereID(),null,null,null);
                System.out.println("planDeValidationModule : "+planDeValidationModule);

                addPlanDeValidationModule(planDeValidationModule);

            }


        }
        catch (IOException | EncryptedDocumentException e) {
            e.printStackTrace(); // Handle exceptions appropriately
        }
        return PVs;
    }

    private PlanDeValidation createPVFromRow(Row row) {
        PlanDeValidation planDeValidation = new PlanDeValidation();

        Cell cellCNE = row.getCell(0, Row.MissingCellPolicy.CREATE_NULL_AS_BLANK);
        Cell cellFILIEREID = row.getCell(1, Row.MissingCellPolicy.CREATE_NULL_AS_BLANK);
        Cell cellSEMESTREID = row.getCell(2, Row.MissingCellPolicy.CREATE_NULL_AS_BLANK);
        Cell cellMODULEID = row.getCell(3, Row.MissingCellPolicy.CREATE_NULL_AS_BLANK);
        Cell cellELEMENTID = row.getCell(4, Row.MissingCellPolicy.CREATE_NULL_AS_BLANK);
        Cell cellNoteExam = row.getCell(5, Row.MissingCellPolicy.CREATE_NULL_AS_BLANK);
        Cell cellNoteTP = row.getCell(6, Row.MissingCellPolicy.CREATE_NULL_AS_BLANK);
        Cell cellNoteElement = row.getCell(7, Row.MissingCellPolicy.CREATE_NULL_AS_BLANK);

        if (cellCNE.getCellType() == CellType.STRING) {
            planDeValidation.setCNE( cellCNE.getStringCellValue());
        }
        if (cellMODULEID.getCellType() == CellType.NUMERIC) {
            planDeValidation.setModuleID((long) cellMODULEID.getNumericCellValue());
        }
        if (cellELEMENTID.getCellType() == CellType.NUMERIC) {
            planDeValidation.setElementID((long) cellELEMENTID.getNumericCellValue());
        }
        if (cellFILIEREID.getCellType() == CellType.NUMERIC) {
            planDeValidation.setFiliereID((long) cellFILIEREID.getNumericCellValue());
        }
        if (cellSEMESTREID.getCellType() == CellType.STRING) {
            planDeValidation.setSemestreID( cellSEMESTREID.getStringCellValue());
        }
        if (cellNoteExam.getCellType() == CellType.NUMERIC) {
            planDeValidation.setNoteExam((float) cellNoteExam.getNumericCellValue());
        }
        if (cellNoteTP.getCellType() == CellType.NUMERIC) {
            planDeValidation.setNoteTP((float) cellNoteTP.getNumericCellValue());
        }
        if (cellNoteElement.getCellType() == CellType.NUMERIC) {
            planDeValidation.setNoteFinale((float) cellNoteElement.getNumericCellValue());

        }

        return planDeValidation;
    }


    public List<PlanDeValidation> getallPVElementsByPVid(PlanDeValidationModule planDeValidationModule){
        return planDeValidationRepository.findByCNEAndModuleIDAndFiliereIDAndSemestreID(planDeValidationModule.getCNE(), planDeValidationModule.getModuleID(), planDeValidationModule.getFiliereID(), planDeValidationModule.getSemestreID());
    }


    @Override
    public List<PlanDeValidation> planDeValidationByCNEAndModuleIDAndFiliereIDAndSemestreID(String CNE, Long ModuleID, Long FiliereID,String SemestreID){
        List<PlanDeValidation> pvsElt = planDeValidationRepository.findByCNEAndModuleIDAndFiliereIDAndSemestreID(CNE,ModuleID,FiliereID,SemestreID);
        List<PlanDeValidation> pvsEltvalide =new ArrayList<>();
        for(PlanDeValidation pv:pvsElt){
            if(pv.getResultat().equals(Resultat.Rattrapage)){
                pvsEltvalide.add(pv);
            }
            
        }
        return pvsEltvalide;
    }


}
