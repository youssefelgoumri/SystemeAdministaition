package fsm.miaad.feigns;

import fsm.miaad.models.Professeur;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name ="PROFESSEUR-SERVICE")
public interface ProfessorRestClient {
    @GetMapping("professeurs/")
    public List<Professeur> allprofesseurs();

    @GetMapping("professeurs/{id}")
    public Professeur professeur(@PathVariable Long id);
    @PostMapping("professeurs/add")
    public Professeur addprofesseur(@RequestBody Professeur professeur);

    @PostMapping("professeurs/addreservation/{reservationId}/to/{professorId}")
    void addReservationToProfessor(@PathVariable Long professorId,@PathVariable Long reservationId);

    @DeleteMapping("professeurs/deletereservation/{reservationId}/from/{professorId}")
    void deleteReservationToProfessor(@PathVariable Long professorId,@PathVariable Long reservationId);
}
