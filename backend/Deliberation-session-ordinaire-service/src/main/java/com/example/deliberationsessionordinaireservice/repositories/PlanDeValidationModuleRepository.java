package com.example.deliberationsessionordinaireservice.repositories;

import com.example.deliberationsessionordinaireservice.entities.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlanDeValidationModuleRepository extends JpaRepository<PlanDeValidationModule, PlanDeValidationModuleID> {

    List<PlanDeValidationModule> findByResultat(Resultat resultat);
    List<PlanDeValidationModule> findByCNEAndResultat(String CNE, Resultat resultat);

    PlanDeValidationModule findByCNEAndModuleIDAndResultat(String CNE, Long ModuleID,Resultat resultat);

    List<PlanDeValidationModule> findByModuleID(Long ModuleID);
}
