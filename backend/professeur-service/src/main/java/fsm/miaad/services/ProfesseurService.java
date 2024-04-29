package fsm.miaad.services;

import fsm.miaad.DTO.profDataDTO;
import fsm.miaad.entities.Professeur;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ProfesseurService {

    Professeur getById(Long id);
    Professeur addProfesseur( Professeur professeur);
    void delete(Long id);
    Professeur update(Long id,Professeur professeur);
    List<Professeur> allProfesseur();

    void addReservationToProfessor(Long professorId, Long reservationId);
    void deleteReservationFromProfessor(Long professorId, Long reservationId);
    profDataDTO getProfData(Long id);
    Professeur login(profDataDTO profDataDTO);
}

