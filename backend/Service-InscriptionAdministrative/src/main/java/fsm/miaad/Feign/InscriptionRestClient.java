package fsm.miaad.Feign;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import fsm.miaad.Models.*;

@FeignClient(name = "SERVICE-INSCRIPTIONENLIGNE")
public interface InscriptionRestClient {
    @GetMapping("/etudiants")
    List<EtudiantInscriptionEnLigne> etudiants();

    @GetMapping("/etudiants/{id}")
    EtudiantInscriptionEnLigne etudiant(@PathVariable String id);
}
