package fsm.miaad.web;

import fsm.miaad.DTO.adminDataDTO;
import fsm.miaad.entities.Etablissement;
import fsm.miaad.models.EtablissementIdName;
import fsm.miaad.models.Filiere;
import fsm.miaad.models.FiliereIdName;
import fsm.miaad.services.EtablissementServiceImp;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/etablissements")
@AllArgsConstructor
public class EtablissementRestController {

    private EtablissementServiceImp etablissementService;


    @GetMapping("")
    public List<Etablissement> allEtablissements() {
        return etablissementService.getAllEtablissement();
    }

    @GetMapping("{id}")
    public Etablissement Etablissement(@PathVariable String id) {
        return etablissementService.getById(id);
    }

    @PostMapping("add")
    public Etablissement addEtablissement(@RequestBody Etablissement Etablissement) {
        Etablissement.generateAdminCredentials();
        // Set admin credentials using setter methods
        Etablissement.setAdminUsername(Etablissement.getAdminUsername());
        Etablissement.setAdminPassword(Etablissement.getAdminPassword());

        Etablissement addedEtablissement = etablissementService.addEtablissement(Etablissement);
        return addedEtablissement;
    }

    @PostMapping("add/{codeName}")
    public Etablissement addFiltoEtablissement(@PathVariable String codeName, @RequestBody Filiere filiere) {
        System.out.println("tt");
        return etablissementService.addFilieresToEtablissement(codeName, filiere);
    }

    @DeleteMapping("delete/{id}")
    public void deleteEtablissement(@PathVariable String id) {
        etablissementService.delEtablissement(id);

    }

    @PutMapping("edit/{code}")
    public Etablissement editEtablissement(@PathVariable String code, @RequestBody Etablissement etablissement) {
        return etablissementService.editEtablissement(code, etablissement);
    }

    @GetMapping("onlyEtab")
    public List<EtablissementIdName> allOnlyIdNameEtab() {
        return etablissementService.allEtablissementIdName();
    }

    @GetMapping("onlyFiliere/{codeName}")
    public List<FiliereIdName> allOnlyIdNameFil(@PathVariable String codeName) {
        return etablissementService.allFiliereIdName(codeName);
    }


    @PostMapping("affectFiliere/{filiereId}/to/{codeName}")
    public Etablissement addFiltoEtablissement(@PathVariable String codeName, @PathVariable Long filiereId) {

        return etablissementService.affectFilieresToEtablissement(codeName, filiereId);
    }

    @PostMapping("deleteFiliereFromEtab/{codeName}/{filliereId}")
    public void ttt(@PathVariable String codeName, @PathVariable Long filliereId) {
        etablissementService.deleteFiliereFromEtablissement(codeName, filliereId);
    }

    //get AdminData :

    @GetMapping("/{codeName}/admin")
    public ResponseEntity<?> getAdminData(@PathVariable String codeName) {
        adminDataDTO adminData = etablissementService.getAdminData(codeName);
        if (adminData != null) {
            return ResponseEntity.ok(adminData);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //login
    @PostMapping("/login")
    public Etablissement login(@RequestBody adminDataDTO adminDataDTO) {
        String username = adminDataDTO.getAdminUsername();
        String password = adminDataDTO.getAdminPassword();
        // ResponseEntity<String> response = etablissementService.login(adminDataDTO);
       return etablissementService.login(adminDataDTO);
      
    }

}


