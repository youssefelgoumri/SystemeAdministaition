package fsm.miaad.structure_enseignementservice.Repositories;
import fsm.miaad.structure_enseignementservice.entities.ResponsableFiliere;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResponsableFiliereRepository extends JpaRepository<ResponsableFiliere, Long> {
    // Vous pouvez ajouter des méthodes personnalisées ici si nécessaire
}
