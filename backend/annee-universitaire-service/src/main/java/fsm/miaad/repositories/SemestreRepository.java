package fsm.miaad.repositories;

import fsm.miaad.entities.Semestre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface SemestreRepository extends JpaRepository<Semestre,String> {
}
