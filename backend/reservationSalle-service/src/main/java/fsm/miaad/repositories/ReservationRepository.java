package fsm.miaad.repositories;

import fsm.miaad.entities.reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Date;
import java.util.List;
@RepositoryRestResource
public interface ReservationRepository extends JpaRepository <reservation,Long>{
    @Query("SELECT r FROM reservation r WHERE r.salle.idSalle = :idSalle " +
            "AND (:dateDebut < r.date_fin AND :dateFin > r.date_debut)")
    List<reservation> findOverlappingReservations(
            @Param("idSalle") Long idSalle,
            @Param("dateDebut") Date dateDebut,
            @Param("dateFin") Date dateFin);

    @Query("SELECT r FROM reservation r WHERE r.salle.idSalle = :idSalle " +
            "AND r.date_debut = :dateDebut AND r.date_fin = :dateFin " +
            "AND r.IdProfesseur = :idProf")
    List<reservation> findExactTimeRangeReservationsForProfessor(
            @Param("idSalle") Long idSalle,
            @Param("dateDebut") Date dateDebut,
            @Param("dateFin") Date dateFin,
            @Param("idProf") String idProf);
    // Find and delete expired reservations : madrthach lguit fiha problem
    List<reservation> findBySalleIdSalle(Long salleId);

    @Query("SELECT r FROM reservation r WHERE r.IdProfesseur = :idProf")
    List<reservation> findByIdProfesseur(@Param("idProf") String IdProfesseur);

}
