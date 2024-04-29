package fsm.miaad.structure_enseignementservice.Repositories;
import feign.Param;
import fsm.miaad.structure_enseignementservice.entities.Filiere;
import fsm.miaad.structure_enseignementservice.models.FiliereIdName;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.EntityGraph;


import java.util.List;

@RepositoryRestResource
public interface FiliereRepository extends JpaRepository<Filiere, Long> {
    // Vous pouvez ajouter des méthodes personnalisées ici si nécessaire

    @Query("SELECT DISTINCT f FROM Filiere f LEFT JOIN FETCH f.responsable WHERE f.id = :id")
    Filiere findByIdWithResponsable(@Param("id") Long id);

    // Use EntityGraph to fetch the associated ResponsableFiliere eagerly
    @EntityGraph(attributePaths = "responsable")
    List<Filiere> findAll();

     @Query("SELECT e FROM Filiere e JOIN e.modulesId f WHERE e.id = :id AND f = :modulesId")
    Filiere findByFiliereIdAndModuleId(@Param("id") Long id, @Param("modulesId") Long modulesId);

    @Modifying
    @Transactional
    @Query("UPDATE Filiere e SET e.modulesId = :newmodulesIds WHERE e.id = :id")
    void deleteModuleFromFiliereById(@Param("id") Long id, @Param("newmodulesId") List<Long> newmodulesId);

}

