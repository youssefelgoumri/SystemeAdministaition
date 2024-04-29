package fsm.miaad.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fsm.miaad.Entities.Module;

@Repository
public interface ModuleRepository extends JpaRepository<Module, Long>{
    
}
