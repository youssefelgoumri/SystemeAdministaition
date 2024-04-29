package fsm.miaad.repositories;


import fsm.miaad.entities.AnneeUniv;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface AnneeUnivRepository extends JpaRepository<AnneeUniv, Long> {

}
