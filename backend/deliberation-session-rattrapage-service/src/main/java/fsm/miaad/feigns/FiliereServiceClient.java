package fsm.miaad.feigns;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import fsm.miaad.models.Filiere;

@Component
@FeignClient(name ="STRUCTURE-ENSEIGNEMENT-SERVICE")
public interface FiliereServiceClient {
    String _URLfiliere="/filieres";

    @GetMapping(_URLfiliere+"/{filiereId}")
    public ResponseEntity<Filiere> getFiliereById(@PathVariable Long filiereId);


    
}
