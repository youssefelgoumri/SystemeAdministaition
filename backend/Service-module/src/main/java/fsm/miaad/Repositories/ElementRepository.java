package fsm.miaad.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fsm.miaad.Entities.Element;

@Repository
public interface ElementRepository extends JpaRepository<Element, Long>{
    
}
