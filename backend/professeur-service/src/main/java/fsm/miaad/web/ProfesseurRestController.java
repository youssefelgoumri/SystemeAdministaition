package fsm.miaad.web;

import fsm.miaad.DTO.profDataDTO;
import fsm.miaad.entities.Professeur;
import fsm.miaad.services.ProfesseurService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("professeurs")
@AllArgsConstructor
public class ProfesseurRestController {
    
    ProfesseurService professeurService;
    @GetMapping("")
    public List<Professeur> allprofesseurs(){
        return professeurService.allProfesseur();
    }

    @GetMapping("{id}")
    public Professeur professeur(@PathVariable Long id){
        return professeurService.getById(id);
    }

    @PostMapping("add")
    public Professeur addprofesseur(@RequestBody Professeur professeur){
        return professeurService.addProfesseur(professeur);
    }

    @PutMapping("edit/{id}")
    public Professeur editprofesseur(@PathVariable Long id,@RequestBody Professeur professeur){
        return professeurService.update(id,professeur);
    }

    @DeleteMapping("delete/{id}")
    public void deleteprofesseur(@PathVariable Long id){
        professeurService.delete(id);

    }

    @PostMapping("addreservation/{reservationId}/to/{professorId}")
    public void addReservationToProfessor(@PathVariable Long professorId,@PathVariable Long reservationId){
        professeurService.addReservationToProfessor(professorId,reservationId);
    }
    @DeleteMapping("deletereservation/{reservationId}/from/{professorId}")
    public void deleteReservationToProfessor(@PathVariable Long professorId,@PathVariable Long reservationId){
        professeurService.deleteReservationFromProfessor(professorId,reservationId);
    }

    //getting profData :
    @GetMapping("{id}/profdata")
    public ResponseEntity<profDataDTO> getProfData(@PathVariable Long id){
        profDataDTO data = professeurService.getProfData(id);
        if (data != null) {
            return ResponseEntity.ok(data);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    //login :

    @PostMapping("/login")
    public Professeur login(@RequestBody profDataDTO profDataDTO) {
        // Extract email and password from DTO
        String email = profDataDTO.getEmail();
        String password = profDataDTO.getPassword();
        // Call the service method to handle professor login
       return professeurService.login(profDataDTO);

        // // Check if login was successful
        // if (response.getStatusCode() == HttpStatus.OK) {
        //     // Authentication successful
        //     return ResponseEntity.ok().body("{\"message\": \"Login successful\"}");
        // } else {
        //     // Authentication failed
        //     return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication failed");
        // }
    }
}
