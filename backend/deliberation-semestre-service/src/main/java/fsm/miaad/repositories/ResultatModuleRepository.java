package fsm.miaad.repositories;

import fsm.miaad.entities.Resultat_Module;
import fsm.miaad.entities.Resultat_ModuleID;
import fsm.miaad.entities.Resultat_Semestre;
import fsm.miaad.entities.Statut;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResultatModuleRepository extends JpaRepository<Resultat_Module, Resultat_ModuleID> {

    List<Resultat_Module> findByCNE(String CNE);
    List<Resultat_Module> findByCNEAndSemestreID(String cne,String s);
    List<Resultat_Module> findBySemestreID(String s);
    List<Resultat_Module> findByCNEAndStatutAndSemestreIDAndFiliereID(String CNE, Statut statut,String s,Long f);
    List<Resultat_Module> findBySemestreIDAndFiliereID(String s,Long f);
    List<Resultat_Module> findByCNEAndSemestreIDAndFiliereID(String cne,String s,Long f);

}
