package com.example.deliberationsessionordinaireservice.repositories;

import com.example.deliberationsessionordinaireservice.entities.PlanDeValidation;
import com.example.deliberationsessionordinaireservice.entities.PlanDeValidationID;
import com.example.deliberationsessionordinaireservice.entities.Resultat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlanDeValidationRepository extends JpaRepository<PlanDeValidation, PlanDeValidationID> {

    List<PlanDeValidation> findByResultat(Resultat resultat);
    List<PlanDeValidation> findByCNEAndResultat(String CNE, Resultat resultat);

    PlanDeValidation findByCNEAndModuleIDAndResultat(String CNE, Long ModuleID,Resultat resultat);
    List<PlanDeValidation> findByCNEAndModuleIDAndFiliereIDAndSemestreID(String CNE, Long ModuleID, Long FiliereID, String SemestreID);

}