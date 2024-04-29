package fsm.miaad.repositories;

import fsm.miaad.entities.Professeur;
import fsm.miaad.web.ProfesseurRestController;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfesseurRepository extends JpaRepository< Professeur,Long> {
    Professeur findByEmail(String email);
}
