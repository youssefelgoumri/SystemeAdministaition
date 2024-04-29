package fsm.miaad.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fsm.miaad.Entities.Responsable;

@Repository
public interface ResponsableRepository extends JpaRepository<Responsable, Long>{
    
}
