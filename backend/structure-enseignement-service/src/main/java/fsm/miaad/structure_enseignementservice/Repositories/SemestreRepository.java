package fsm.miaad.structure_enseignementservice.Repositories;
import fsm.miaad.structure_enseignementservice.entities.Semestre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SemestreRepository extends JpaRepository<Semestre, Long> {
    // Vous pouvez ajouter des méthodes spécifiques au besoin
}
