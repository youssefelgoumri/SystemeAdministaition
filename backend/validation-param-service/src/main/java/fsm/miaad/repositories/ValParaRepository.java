package fsm.miaad.repositories;

import fsm.miaad.entities.ValidationParam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ValParaRepository extends JpaRepository<ValidationParam, Long> {

}
