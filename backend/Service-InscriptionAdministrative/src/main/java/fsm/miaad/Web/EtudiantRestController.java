package fsm.miaad.Web;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fsm.miaad.Entities.Diplome;
import fsm.miaad.Entities.Etudiant;
import fsm.miaad.Services.DiplomeService;
import fsm.miaad.Services.EtudiantService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/etudiantsAdministratifs")
@AllArgsConstructor
public class EtudiantRestController {
    private EtudiantService etudiantService;
    private DiplomeService diplomeService;

    @GetMapping("")
    public List<Etudiant> etudiants(){
        return etudiantService.allEtudiants();
    }

    @GetMapping("/{id}")
    public Etudiant etudiant(@PathVariable String id){
        return etudiantService.findEtudiantById(id);
    }

    @GetMapping("/{id}/diplomes")
    public List<Diplome> etudiantDiplomes(@PathVariable String id){
        return diplomeService.allDiplomes(id);
    }

    @GetMapping("/diplomes/{id}")
    public Diplome etudiantDiplome(@PathVariable Long id){
        return diplomeService.findDiplomeById(id);
    }

    @GetMapping("/{firstName}/{lastName}")
    public List<Etudiant> etudiantsByName(@PathVariable String firstName, @PathVariable String lastName){
        return etudiantService.findEtudiantByName(firstName, lastName);
    }

    @GetMapping("/etablissements/{codeName}")
    public List<Etudiant> etudiantsByEtablissement(@PathVariable String codeName){
        return etudiantService.findEtudiantByEtablissement(codeName);
    }

    @GetMapping("/fillieres/{idFilliere}")
    public List<Etudiant> etudiantsByFilliere(@PathVariable Long idFilliere){
        return etudiantService.findEtudiantByFilliere(idFilliere);
    }

    @PutMapping("/edit/{id}")
    public Etudiant update(@PathVariable String id, @RequestBody Etudiant newEtudiant){
        return etudiantService.updateEtudiant(id, newEtudiant);
    }

    @PutMapping("/diplomes/edit/{id}")
    public Diplome update(@PathVariable Long id, @RequestBody Diplome newDiplome){
        return diplomeService.updateDiplome(id, newDiplome);
    }

    @PostMapping("/add/{massar}")
    public Etudiant save(@PathVariable String massar){
        return etudiantService.addEtudiant(massar);
    }

    @PostMapping("/{massar}/diplomes/add")
    public Diplome save(@PathVariable String massar, @RequestBody Diplome newDiplome){
        newDiplome.setMassar(massar);
        return diplomeService.addDiplome(newDiplome);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable String id){
        etudiantService.deleteEtudiant(id);
    }

    @DeleteMapping("/diplomes/delete/{id}")
    public void delete(@PathVariable Long id){
        diplomeService.deleteDiplome(id);
    }
}
