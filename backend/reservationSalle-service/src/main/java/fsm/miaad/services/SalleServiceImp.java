package fsm.miaad.services;

import fsm.miaad.entities.Salle;
import fsm.miaad.entities.reservation;
import fsm.miaad.feigns.ProfessorRestClient;
import fsm.miaad.models.Professeur;
import fsm.miaad.repositories.ReservationRepository;
import fsm.miaad.repositories.SalleRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@Transactional
@AllArgsConstructor
public class SalleServiceImp implements SalleService {
    @Autowired
    SalleRepository salleRepository;
    @Autowired
    ReservationRepository reservationRepository;
    /*@Autowired
    professorRepository professorRepository;*/
    ProfessorRestClient professorRestClient;

    @Override
    public List<Salle> getAllSalles() {
        return salleRepository.findAll();
    }

    @Override
    public Salle getById(long id) {
        return salleRepository.findById(id).orElse(null);
    }

    @Override
    public Salle addSalle(Salle salle) {
        Salle salle1 = getById(salle.getIdSalle());
        if (salle1 != null) return null;
        return salleRepository.save(salle);
    }

    @Override
    public void deleteSalle(long id) {
        salleRepository.deleteById(id);
    }


    @Override
    public Salle editeSalle(long id, Salle salle) {
        Salle salle1 = getById(id);
        if (salle1 != null) {
            salle1.setNom(salle.getNom());
            salle1.setTypeSalle(salle.getTypeSalle());
            salle1.setDescription(salle.getDescription());
        }
        return getById(id);
    }

    //
    @Override
    public Salle isSalleFree(long id, Date dateDebut, Date dateFin) {
        Optional<Salle> optionalSalle = salleRepository.findById(id);

        if (optionalSalle.isPresent()) {
            Salle salle = optionalSalle.get();
            List<reservation> overlappingReservations = reservationRepository.findOverlappingReservations(id, dateDebut, dateFin);

            // If there are overlapping reservations, throw an exception
            if (!overlappingReservations.isEmpty()) {
                throw new IllegalStateException("Salle is already reserved during the specified time range.");
            }

            // If the control reaches here, it means salle is free, so return the Salle object
            return salle;
        } else {
            throw new IllegalStateException("Salle not found");
        }
    }


    @Override
    public Salle reserveSalle(long id, Long id_prof, Date date_debut, Date date_fin) {
        Salle salle = isSalleFree(id, date_debut, date_fin);
        // Check for existing reservations
        List<reservation> existingReservations = reservationRepository.findExactTimeRangeReservationsForProfessor(
                id, date_debut, date_fin, String.valueOf(id_prof));

        if (!existingReservations.isEmpty()) {
            // Handle the case where a reservation already exists (e.g., throw an exception)
            throw new IllegalStateException("Salle is already reserved during the specified time range for Professor " + id_prof);
        }

        // Retrieve the Professor models  using its ID
        Professeur professeur = professorRestClient.professeur(id_prof);

        if (professeur == null) {
            throw new EntityNotFoundException("Professor with id " + id_prof + " not found");
        }

        // Retrieve the Salle entity using its ID
        Salle salleEntity = salleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Salle with id " + id + " not found"));

        // Create a new reservation
        reservation newReservation = new reservation(null,id_prof, salleEntity, date_debut, date_fin);
        newReservation=reservationRepository.save(newReservation);
        //            hadi zedtha bax tzad liya automatiquement f prof
        professorRestClient.addReservationToProfessor(newReservation.getIdProfesseur(),newReservation.getId());

        return salle;
    }





    @Override
    public List<Salle> freeSalles(Date date_debut, Date date_fin) {
        List<Salle> freeSalles = salleRepository.findFreeSalles(date_debut, date_fin);
        return freeSalles;
    }

    @Override
    public List<Salle> reservedSalles(Date dateDebut, Date dateFin) {
        List<Salle> reservedSalles = salleRepository.findReservedSalles(dateDebut, dateFin);
        return reservedSalles;
    }
    @Override
    public Salle modifyReservation(long reservationId, Date newDateDebut, Date newDateFin) {
        Optional<reservation> optionalReservation = reservationRepository.findById(reservationId);

        if (optionalReservation.isPresent()) {
            reservation existingReservation = optionalReservation.get();
            Salle salle = isSalleFree(existingReservation.getSalle().getIdSalle(), newDateDebut, newDateFin);
            existingReservation.setDate_debut(newDateDebut);
            existingReservation.setDate_fin(newDateFin);
            reservationRepository.save(existingReservation);
            return salle;
        } else {
            throw new EntityNotFoundException("Reservation with id " + reservationId + " not found");
        }
    }
    @Override
    public void cancelReservation(long reservationId) {
        Optional<reservation> optionalReservation = reservationRepository.findById(reservationId);
        if (optionalReservation.isPresent()) {
            reservation reservationToDelete = optionalReservation.get();
            reservationRepository.delete(reservationToDelete);
//            hadi zedtha bax tsurpprima liya automatiquement f prof
            professorRestClient.deleteReservationToProfessor(reservationToDelete.getIdProfesseur(),reservationToDelete.getId());
        } else {
            throw new EntityNotFoundException("Reservation with id " + reservationId + " not found");
        }
    }

    @Override
    public ResponseEntity<List<Map<String, Object>>> getProfessorsReservedForSalle(Long salleId) {
        List<reservation> reservations = reservationRepository.findBySalleIdSalle(salleId);
        List<Map<String, Object>> professors = new ArrayList<>();
        for (reservation reservation : reservations) {
            Long idProfesseur = reservation.getIdProfesseur();
            Professeur professor = professorRestClient.professeur(idProfesseur);
            if (professor != null) {
                String timeRange = formatTimeRange(reservation.getDate_debut(), reservation.getDate_fin());
                Map<String, Object> professorMap = new HashMap<>();
                professorMap.put("professeur", professor);
                professorMap.put("reservationTimeRange", timeRange);
                professors.add(professorMap);
            }
        }

        if (professors.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(professors);
    }
    //bach nchofo b7al haka : "reservationTimeRange": "2024-02-09 from 19:45 to 17:30"
    private String formatTimeRange(Date startDate, Date endDate) {
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");
        LocalDate startLocalDate = startDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        LocalDate endLocalDate = endDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        String formattedStartDate = dateFormatter.format(startLocalDate);
        String formattedEndDate = dateFormatter.format(endLocalDate);
        String startTime = timeFormatter.format(startDate.toInstant().atZone(ZoneId.systemDefault()).toLocalTime());
        String endTime = timeFormatter.format(endDate.toInstant().atZone(ZoneId.systemDefault()).toLocalTime());
        return formattedStartDate + " from " + startTime + " to " + endTime;
    }

    @Override
    public List<reservation> getAllReservationOfProfessor(Long id) {
        return reservationRepository.findByIdProfesseur(id+"");
    }
}
