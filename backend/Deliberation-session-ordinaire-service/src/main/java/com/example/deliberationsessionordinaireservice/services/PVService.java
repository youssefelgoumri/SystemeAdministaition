package com.example.deliberationsessionordinaireservice.services;

import com.example.deliberationsessionordinaireservice.entities.PlanDeValidation;
import com.example.deliberationsessionordinaireservice.entities.PlanDeValidationID;
import com.example.deliberationsessionordinaireservice.entities.PlanDeValidationModule;
import com.example.deliberationsessionordinaireservice.entities.PlanDeValidationModuleID;
import com.example.deliberationsessionordinaireservice.models.Element;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.util.List;

public interface PVService {
    List<PlanDeValidation> etudiantsRattrapage();
    List<PlanDeValidation> etudiantsValide();

    List<PlanDeValidationModule> etudiantsRattrapageModule();
    List<PlanDeValidationModule> etudiantsValideModule();


    List<PlanDeValidation> getAllPVs();
    List<PlanDeValidationModule> getAllPVsModule();
    PlanDeValidation getPlanDeValidationById(PlanDeValidationID planDeValidationID);
    PlanDeValidationModule getPlanDeValidationModuleById(PlanDeValidationModuleID planDeValidationID);
    PlanDeValidation addPlanDeValidation(PlanDeValidation planDeValidations);
    PlanDeValidationModule addPlanDeValidationModule(PlanDeValidationModule planDeValidationModule);
    PlanDeValidation editPlanDeValidation(PlanDeValidation planDeValidation);
    void deletePlanDeValidation(PlanDeValidationID id);

    //change it to Module
    PlanDeValidationModule editPlanDeValidationModule(PlanDeValidationModule planDeValidationModule);
    void deletePlanDeValidationModule(PlanDeValidationModuleID id);



    ResponseEntity<byte[]> genererFichierResultatsExcelOfModule(Long id) throws IOException;
//    ResponseEntity<byte[]> genererFichierResultatsExcelOfModule() throws IOException;

    ResponseEntity<byte[]> genererFichierResultatsExcel() throws IOException;
    List<PlanDeValidation> addPlanDeValidationFromExcel(String cheminFichier);

    List<Element> getElementsForModule(Long moduleId);

    List<PlanDeValidation> planDeValidationByCNEAndModuleIDAndFiliereIDAndSemestreID(String CNE, Long ModuleID, Long FiliereID,String SemestreID);
    List<PlanDeValidation> getallPVElementsByPVid(PlanDeValidationModule planDeValidationModule);


}
