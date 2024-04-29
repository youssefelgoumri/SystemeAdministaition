package fsm.miaad.abscenceservice.feigns;
import fsm.miaad.abscenceservice.models.Etudiant;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "SERVICE-INSCRIPTIONADMINISTRATIVE")
public interface EtudiantClient {

    @GetMapping("/etudiantsAdministratifs/")
    List<Etudiant> etudiants();

    @GetMapping("/etudiantsAdministratifs/{id}")
    Etudiant etudiant(@PathVariable String id);
}
