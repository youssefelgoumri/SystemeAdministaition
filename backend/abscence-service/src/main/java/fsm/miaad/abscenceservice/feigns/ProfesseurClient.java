package fsm.miaad.abscenceservice.feigns;
import fsm.miaad.abscenceservice.models.Professeur;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name = "PROFESSEUR-SERVICE")
public interface ProfesseurClient {

    @GetMapping("professeurs/")
    List<Professeur> getAllProfesseurs();

    @GetMapping("professeurs/{id}")
    Professeur getProfesseurById(@PathVariable("id") Long id);
   }
