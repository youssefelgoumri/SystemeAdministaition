package fsm.miaad.services;

import fsm.miaad.entities.Resultat_Rattrapage;
import fsm.miaad.entities.Resultat_RattrapageElement;
import fsm.miaad.entities.Resultat_RattrapageElementID;
import fsm.miaad.entities.Resultat_RattrapageID;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.util.List;

public interface RattService {
    Resultat_Rattrapage getById(Resultat_RattrapageID ids);
    Resultat_Rattrapage addResultat_Rattrapage( Resultat_Rattrapage resultatRattrapage);
    void delete(Resultat_RattrapageID ids);
    Resultat_Rattrapage update( Resultat_Rattrapage resultatRattrapage);
    List<Resultat_Rattrapage> allResultat_Rattrapage();
    ResponseEntity<byte[]> genererFichierResultatsExcel(Long filiereid,Long moduleId,String semestreId) throws IOException;
//    void validerParCompensation (Float x,Float z,String CNE);
//    Float note_compensation(String CNE);
//    void validerModuleParCompensation (Float x,Resultat_RattrapageID ids);
//    void genererFichierResultatsExcel(String cheminFichier);
    List<Resultat_Rattrapage> addResultat_RattrapageFromExcel(String cheminFichier);

    Resultat_RattrapageElement addResultat_RattrapageElement(Resultat_RattrapageElement element );
    Resultat_RattrapageElement getResultat_RattrapageElement(Resultat_RattrapageElementID rattrapageElementID);
    void deleteResultat_RattrapageElement(Resultat_RattrapageElementID ids);
    Resultat_RattrapageElement updateRattrapageElement( Resultat_RattrapageElement resultatRattrapageElement);
    List<Resultat_RattrapageElement> allResultat_RattrapageElements();
    ResponseEntity<byte[]> genererFichierResultatsElementleExcel(Long elementId) throws IOException;
    List<Resultat_RattrapageElement> addResultat_RattrapageElementsFromExcel(String cheminFichier);
    List<Resultat_RattrapageElement> ResultatelementsdeModule(String CNE,Long FiliereID, Long ModuleID,String SemestreID);
            

}
