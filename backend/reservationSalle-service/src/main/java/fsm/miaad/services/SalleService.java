package fsm.miaad.services;

import fsm.miaad.entities.Salle;
import fsm.miaad.entities.reservation;
import fsm.miaad.models.Professeur;
import org.springframework.http.ResponseEntity;

import java.util.Date;
import java.util.List;
import java.util.Map;

public interface SalleService {
    List<Salle> getAllSalles();
    Salle addSalle(Salle salle);
    void deleteSalle(long id);
    Salle getById(long id);
    Salle editeSalle(long id,Salle salle);
     //Salle isSalleFree(long id);
    Salle reserveSalle(long id, Long id_prof, Date date_debut, Date date_fin);
    List<Salle> freeSalles (Date date_debut, Date date_fin);
    List<Salle> reservedSalles(Date dateDebut, Date dateFin);
    Salle isSalleFree(long id, Date dateDebut, Date dateFin);
    Salle modifyReservation(long reservationId, Date newDateDebut, Date newDateFin);
    void cancelReservation(long reservationId);
    ResponseEntity<List<Map<String, Object>>> getProfessorsReservedForSalle(Long salleId);
    List<reservation> getAllReservationOfProfessor(Long id);

}
