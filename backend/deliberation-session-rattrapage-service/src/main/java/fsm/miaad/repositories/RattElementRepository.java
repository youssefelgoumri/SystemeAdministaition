package fsm.miaad.repositories;

import fsm.miaad.entities.Resultat_RattrapageElement;
import fsm.miaad.entities.Resultat_RattrapageElementID;
import fsm.miaad.entities.Statut;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RattElementRepository extends JpaRepository<Resultat_RattrapageElement,Resultat_RattrapageElementID> {
    List<Resultat_RattrapageElement> findByCNEAndStatut(String CNE, Statut statut);
    Resultat_RattrapageElement findByCNEAndModuleIDAndStatut(String CNE, Long ModuleID,Statut statut);
    List<Resultat_RattrapageElement> findByCNEAndFiliereIDAndModuleIDAndSemestreID(String CNE, Long filiereID,Long moduleID,String semestreID);
    
}
