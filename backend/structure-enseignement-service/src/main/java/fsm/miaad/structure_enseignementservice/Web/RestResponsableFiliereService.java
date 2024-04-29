package fsm.miaad.structure_enseignementservice.Web;


import fsm.miaad.structure_enseignementservice.Services.ResponsableFiliereService;
import fsm.miaad.structure_enseignementservice.entities.Filiere;
import fsm.miaad.structure_enseignementservice.entities.ResponsableFiliere;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/responsablesfilieres")
public class RestResponsableFiliereService {

    private final ResponsableFiliereService responsableFiliereService;

    @Autowired
    public RestResponsableFiliereService(ResponsableFiliereService responsableFiliereService) {
        this.responsableFiliereService = responsableFiliereService;
    }
    @GetMapping
    public List<ResponsableFiliere> getAllResponsableFilieres() {
        return responsableFiliereService.getAllResponsablesFilieres();
    }

    @PostMapping
    public ResponseEntity<ResponsableFiliere> createResponsableFiliere(@RequestBody ResponsableFiliere responsableFiliere) {
        // Logic to create a new ResponsableFiliere
        ResponsableFiliere response = responsableFiliereService.createResponsableFiliere(responsableFiliere);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{responsableFiliereId}")
    public ResponseEntity<ResponsableFiliere> getResponsableFiliereById(@PathVariable Long responsableFiliereId) {
        // Logic to retrieve a ResponsableFiliere by ID
        ResponsableFiliere response = responsableFiliereService.getResponsableFiliereById(responsableFiliereId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/{responsableFiliereId}")
    public ResponseEntity<ResponsableFiliere> updateResponsableFiliere(@PathVariable Long responsableFiliereId, @RequestBody ResponsableFiliere responsableFiliere) {
        // Logic to update a ResponsableFiliere by ID
        ResponsableFiliere response = responsableFiliereService.updateResponsableFiliere(responsableFiliereId, responsableFiliere);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
   // Pour la suppression du responssable est eliminer pour la raison de leur utilisation dans la filiere

    @DeleteMapping("/{responsableFiliereId}")
    public ResponseEntity<Void> deleteResponsableFiliere(@PathVariable Long responsableFiliereId) {
        // Logic to delete a ResponsableFiliere by ID
        responsableFiliereService.deleteResponsableFiliere(responsableFiliereId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Add other methods as needed, such as getting a list of all responsables-filieres, etc.
}
