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

import fsm.miaad.Entities.Etudiant;
import fsm.miaad.Services.EtudiantService;
import fsm.miaad.feign.EtablissementRestClient;
import fsm.miaad.models.EtablissementIdName;
import fsm.miaad.models.FiliereIdName;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/etudiants")
@AllArgsConstructor
public class EtudiantRestController {
    private EtudiantService etudiantService;
    private EtablissementRestClient etablissementRestClient;

    @GetMapping("")
    public List<Etudiant> etudiants(){
        return etudiantService.allEtudiants();
    }

    @GetMapping("/{id}")
    public Etudiant etudiant(@PathVariable String id){
        return etudiantService.findEtudiantById(id);
    }

    @GetMapping("/{firstName}/{lastName}")
    public List<Etudiant> etudiantsByName(@PathVariable String firstName, @PathVariable String lastName){
        return etudiantService.findEtudiantByName(firstName, lastName);
    }

    @GetMapping("/choix_etablissement")
    public List<EtablissementIdName> choixEtablissement(){
        return etablissementRestClient.allOnlyIdNameEtab();
    }

    @GetMapping("/{codeName}/filliers")
    public List<FiliereIdName> choixFillieres(@PathVariable String codeName){
        return etablissementRestClient.allOnlyIdNameFil(codeName);
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

    @PostMapping("/add")
    public Etudiant save(@RequestBody Etudiant newEtudiant){
        return etudiantService.addEtudiant(newEtudiant);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable String id){
        etudiantService.deleteEtudiant(id);
    }
}
