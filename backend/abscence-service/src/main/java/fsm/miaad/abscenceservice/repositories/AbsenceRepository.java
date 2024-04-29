package fsm.miaad.abscenceservice.repositories;

import fsm.miaad.abscenceservice.entities.Absence;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AbsenceRepository extends JpaRepository<Absence, String> {
    List<Absence> findByEtudiantId(String etudiantId);
}
