package fsm.miaad.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fsm.miaad.Entities.Etudiant;

@Repository
public interface EtudiantRepository extends JpaRepository<Etudiant, String> {
    
}
