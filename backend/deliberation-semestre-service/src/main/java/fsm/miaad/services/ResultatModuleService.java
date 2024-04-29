package fsm.miaad.services;

import fsm.miaad.entities.Resultat_Module;
import fsm.miaad.entities.Resultat_ModuleID;

import java.util.List;

public interface ResultatModuleService {

    List<Resultat_Module> RESULTAT_MODULES();
    List<Resultat_Module> RESULTAT_MODULES_SEMESTRE(String cne,String s);
    List<Resultat_Module> RESULTAT_MODULES_SEMESTRE_FILIER(String cne,String s,Long f);

    List<Resultat_Module> RESULTAT_MODULES_By_SEMESTRE(String s);

    List<Resultat_Module> RESULTAT_MODULES_Etudiant(String CNE);

    Resultat_Module addResultatModule(Resultat_Module resultatModule);

    Resultat_Module updateResultatModule(Resultat_Module resultatModule);

    Resultat_Module getByIdResultatModule(Resultat_ModuleID ids);

    float calculerMoyenne(List<Float> notes);
    float NoteSemestre(String CNE);
    void validerParCompensation (Float x,Float z,String CNE,String s,Long f);
    Float note_compensation(String CNE,String s,Long f);




}
