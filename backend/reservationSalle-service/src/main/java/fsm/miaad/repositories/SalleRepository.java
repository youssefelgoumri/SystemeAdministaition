package fsm.miaad.repositories;

import fsm.miaad.entities.Salle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@RepositoryRestResource
public interface SalleRepository extends JpaRepository<Salle,Long> {
    @Query(value = "SELECT s FROM Salle s " +
            "WHERE NOT EXISTS (SELECT r FROM reservation r " +
            "WHERE r.salle = s " +
            "AND (:dateDebut BETWEEN r.date_debut AND r.date_fin " +
            "OR :dateFin BETWEEN r.date_debut AND r.date_fin " +
            "OR r.date_debut BETWEEN :dateDebut AND :dateFin " +
            "OR r.date_fin BETWEEN :dateDebut AND :dateFin))")
    List<Salle> findFreeSalles(@Param("dateDebut") Date dateDebut, @Param("dateFin") Date dateFin);


    @Query("SELECT s FROM Salle s WHERE " +
            " EXISTS (SELECT r FROM reservation r " +
            "WHERE r.salle = s " +  // Use the relationship attribute
            "AND (:dateDebut BETWEEN r.date_debut AND r.date_fin " +
            "OR :dateFin BETWEEN r.date_debut AND r.date_fin " +
            "OR r.date_debut BETWEEN :dateDebut AND :dateFin " +
            "OR r.date_fin BETWEEN :dateDebut AND :dateFin))")
    List<Salle> findReservedSalles(@Param("dateDebut") Date dateDebut, @Param("dateFin") Date dateFin);
}


