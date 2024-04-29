package fsm.miaad.services;

import fsm.miaad.DTO.profDataDTO;
import fsm.miaad.entities.Professeur;
import fsm.miaad.feigns.EtablissementRestClient;
import fsm.miaad.feigns.ReservationSalleRestClient;
import fsm.miaad.models.Etablissement;
import fsm.miaad.models.reservation;
import fsm.miaad.repositories.ProfesseurRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Service
public class ProfesseurServiceImp implements ProfesseurService{

    ProfesseurRepository professeurRepository;
    EtablissementRestClient etablissementRestClient;
    ReservationSalleRestClient reservationSalleRestClient;
    @Override
    public Professeur getById(Long id) {
        Professeur professeur=professeurRepository.findById(id).orElse(null);
        if(professeur!=null){
            List<Long> idsReservation=professeur.getReservationId();

            if(!idsReservation.isEmpty()){
                List<reservation> reservations =reservationSalleRestClient.getAllReservationOfProfessor(professeur.getId());
                professeur.setReservations(reservations);
            }

        }
        return professeur;
    }

    @Override
    public Professeur addProfesseur(Professeur professeur) {
        if(professeur.getEtablissement()!=null){
            Etablissement etablissement = etablissementRestClient.Etablissement(professeur.getEtablissement());
            if (etablissement != null)
                return professeurRepository.save(professeur);
        }
        return null;
    }

    @Override
    public void delete(Long id) {
        if(getById(id)!=null)
            professeurRepository.deleteById(id);
    }

    @Override
    public Professeur update(Long id, Professeur professeur) {
        Professeur professeur1=getById(id);
        if(professeur1!=null){
            if(professeur.getNom()!=null) professeur1.setNom(professeur.getNom());
            if(professeur.getPrenom()!=null) professeur1.setPrenom(professeur.getPrenom());
            if(professeur.getEmail()!=null) professeur1.setEmail(professeur.getEmail());
            if(professeur.getPassword()!=null) professeur1.setPassword(professeur.getPassword());
            if(professeur.getDiscipline()!=null) professeur1.setDiscipline(professeur.getDiscipline());
            if(professeur.getEtablissement()!=null) {
                Etablissement etablissement = etablissementRestClient.Etablissement(professeur.getEtablissement());
                if (etablissement != null)
                    professeur1.setEtablissement(professeur.getEtablissement());
            }
            if(professeur.getDepartement()!=null) professeur1.setDepartement(professeur.getDepartement());
            professeur1=professeurRepository.save(professeur1);
            professeur1=getById(professeur1.getId());
        }
        return professeur1;
    }

    @Override
    public List<Professeur> allProfesseur() {
        List<Professeur> professeurs=professeurRepository.findAll();

        for (Professeur professeur:professeurs){
            List<Long> idsReservation=professeur.getReservationId();

            if(!idsReservation.isEmpty()){
                List<reservation> reservations =reservationSalleRestClient.getAllReservationOfProfessor(professeur.getId());
                professeur.setReservations(reservations);
            }
        }
        return professeurs;
    }

    @Override
    public void addReservationToProfessor(Long professorId, Long reservationId) {
        Professeur professeur=getById(professorId);
        if(professeur!=null){
            professeur.getReservationId().add(reservationId);
            professeurRepository.save(professeur);
        }
    }
    @Override
    public void deleteReservationFromProfessor(Long professorId, Long reservationId) {
        Professeur professeur=getById(professorId);
        if(professeur!=null){
            professeur.getReservationId().remove(reservationId);
            professeurRepository.save(professeur);
        }
    }

    @Override
    public profDataDTO getProfData(Long id) {
        Professeur professeur = professeurRepository.findById(id).orElse(null);

        // Check if the professor exists
        if (professeur != null) {
            profDataDTO dto = new profDataDTO();
            dto.setEmail(professeur.getEmail());
            dto.setPassword(professeur.getPassword());
            return dto;
        } else {
            return null;
        }
    }

    //
    @Override
    public Professeur login(profDataDTO profDataDTO) {
        // Retrieve the professor from the database using email
        Professeur professor = professeurRepository.findByEmail(profDataDTO.getEmail());
        if (professor != null && professor.getPassword().equals(profDataDTO.getPassword())) {
            return professor;
        } 
            // Professor does not exist or password is incorrect
        return null;
        
    }



}
