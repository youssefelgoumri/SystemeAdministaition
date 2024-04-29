package fsm.miaad.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fsm.miaad.Entities.Diplome;

@Repository
public interface DiplomeRepository extends JpaRepository<Diplome, Long>{
    
}
