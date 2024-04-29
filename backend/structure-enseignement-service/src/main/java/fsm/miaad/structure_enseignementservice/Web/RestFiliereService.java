package fsm.miaad.structure_enseignementservice.Web;

import fsm.miaad.structure_enseignementservice.exeption.FiliereNotFoundException;
import fsm.miaad.structure_enseignementservice.exeption.ModuleNotFoundException;
import fsm.miaad.structure_enseignementservice.exeption.ResponsableNotFoundException;

import fsm.miaad.structure_enseignementservice.Services.FiliereServiceImpl;
import fsm.miaad.structure_enseignementservice.entities.Filiere;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/filieres")
public class RestFiliereService {

        private final FiliereServiceImpl filiereService;

        @Autowired
        public RestFiliereService(FiliereServiceImpl filiereService) {
            this.filiereService = filiereService;
        }

        @GetMapping
        public List<Filiere> getAllFilieres() {
            return filiereService.getAllFilieres();
        }

        @GetMapping("/{filiereId}")
        public ResponseEntity<Filiere> getFiliereById(@PathVariable Long filiereId) {
            Filiere filiere = filiereService.getFiliereById(filiereId);
            if (filiere != null) {
                return ResponseEntity.ok(filiere);
            } else {
                return ResponseEntity.notFound().build();
            }
        }

    @PostMapping("/add")
    public ResponseEntity<Filiere> addFiliere(@RequestBody Filiere filiere, @RequestParam Long responsableId) {
        try {
            Filiere addedFiliere = filiereService.addFiliere(filiere, responsableId);
            return new ResponseEntity<>(addedFiliere, HttpStatus.CREATED);
        } catch (ResponsableNotFoundException | ModuleNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }




    @DeleteMapping("/{id}")
    public void deleteFiliere(@PathVariable Long id){
        filiereService.deleteFiliere(id);

    }

    @PutMapping("/{id}")
    public ResponseEntity<Filiere> editFiliere(@PathVariable Long id, @RequestBody Filiere filiere) {
        try {
            Filiere updatedFiliere = filiereService.editfiliere(id, filiere);
            return ResponseEntity.ok(updatedFiliere);
        } catch (FiliereNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (ResponsableNotFoundException | ModuleNotFoundException e) {
            // Gérer les exceptions ResponsableNotFoundException et ModuleNotFoundException si nécessaire
            return ResponseEntity.badRequest().build();
        }
    }

}

