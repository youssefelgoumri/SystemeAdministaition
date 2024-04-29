package fsm.miaad.web;

import fsm.miaad.entities.AnneeUniv;
import fsm.miaad.services.AnneeUnivService;
import fsm.miaad.services.SemestreService;
import fsm.miaad.services.SessionService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.ws.rs.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/annee-universitaire")
public class AnneeUnivServiceRestController {

    @Autowired
    private AnneeUnivService anneeUnivService;

    @Autowired
    private SessionService sessionService;

    @Autowired
    private SemestreService semestreService;

    @GetMapping("/all")
    public List<AnneeUniv> getAllAnneeUniversitaire() {
        return anneeUnivService.getAllAnneeUniv();
    }
    @PostMapping("/add")
    public ResponseEntity<AnneeUniv> ajouterAnneeUniversitaire(@RequestBody AnneeUniv anneeUniv) {
        AnneeUniv nouvelleAnnee = anneeUnivService.addAnneUniv(anneeUniv);
        return new ResponseEntity<>(nouvelleAnnee, HttpStatus.CREATED);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<AnneeUniv> modifierAnneeUniversitaire(@PathVariable Long id, @RequestBody AnneeUniv anneeUniv) {
        try{
            AnneeUniv anneeModifiee = anneeUnivService.editAnneUniv(id, anneeUniv);
            return new ResponseEntity<>(anneeModifiee, HttpStatus.OK);
        } catch (NotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> supprimerAnneeUniversitaire(@PathVariable Long id) {
        try {
            //sessionService.delete();
            AnneeUniv univ=anneeUnivService.getById(id);
            anneeUnivService.deleteAnneeUniv(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("{id}")
    public AnneeUniv anneeUniv(@PathVariable Long id){
        return anneeUnivService.getById(id);
    }

    @GetMapping("anneecourante")
    public String anneeCourante(){
        return anneeUnivService.getAnneeCourante();
    }
}
