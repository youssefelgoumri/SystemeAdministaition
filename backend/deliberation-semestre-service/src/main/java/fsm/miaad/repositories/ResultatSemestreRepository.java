package fsm.miaad.repositories;

import fsm.miaad.entities.Resultat_ModuleID;
import fsm.miaad.entities.Resultat_Semestre;
import fsm.miaad.entities.Resultat_Semestre_id;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResultatSemestreRepository extends JpaRepository<Resultat_Semestre, Resultat_Semestre_id> {

    List<Resultat_Semestre> findBySemestreID(String s);
    List<Resultat_Semestre> findBySemestreIDAndFiliereID(String s,Long f);
}
