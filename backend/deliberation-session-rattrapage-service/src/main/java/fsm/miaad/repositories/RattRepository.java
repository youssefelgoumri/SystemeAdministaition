package fsm.miaad.repositories;

import fsm.miaad.entities.Resultat_Rattrapage;
import fsm.miaad.entities.Resultat_RattrapageID;
import fsm.miaad.entities.Statut;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RattRepository extends JpaRepository<Resultat_Rattrapage,Resultat_RattrapageID> {
    List<Resultat_Rattrapage> findByCNEAndStatut(String CNE, Statut statut);
    Resultat_Rattrapage findByCNEAndModuleIDAndStatut(String CNE, Long ModuleID,Statut statut);

}
