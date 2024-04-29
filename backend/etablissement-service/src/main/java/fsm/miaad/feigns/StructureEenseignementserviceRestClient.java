package fsm.miaad.feigns;

import fsm.miaad.models.Filiere;
import fsm.miaad.models.ResponsableFiliere;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Component
@FeignClient(name ="STRUCTURE-ENSEIGNEMENT-SERVICE")
public interface StructureEenseignementserviceRestClient {
    String _URLfiliere="/filieres";
    String _URLresponsable="/responsablesfilieres";

    @GetMapping(_URLfiliere+"/{filiereId}")
    public ResponseEntity<Filiere> getFiliereById(@PathVariable Long filiereId);


    @PostMapping(_URLfiliere+"/add")
    public ResponseEntity<Filiere> addFiliere(@RequestBody Filiere filiere, @RequestParam Long responsableId) ;


    @PostMapping(_URLresponsable)
    public ResponseEntity<ResponsableFiliere> createResponsableFiliere(@RequestBody ResponsableFiliere responsableFiliere);

    @GetMapping(_URLresponsable+"/{responsableFiliereId}")
    public ResponseEntity<ResponsableFiliere> getResponsableFiliereById(@PathVariable Long responsableFiliereId);

}
