package fsm.miaad.web;

import fsm.miaad.entities.Resultat_Module;
import fsm.miaad.entities.Resultat_ModuleID;
import fsm.miaad.services.ResultatModuleService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("modulesResults")
public class ResultatModuleRestController {

    ResultatModuleService resultatModuleService;
    @PostMapping("add")
    public Resultat_Module addResultatModule(@RequestBody Resultat_Module resultatModule){
        return resultatModuleService.addResultatModule(resultatModule);
    }
    @PostMapping("")
    public Resultat_Module getResultatModuleByid(@RequestBody Resultat_ModuleID resultatModule){
        return resultatModuleService.getByIdResultatModule(resultatModule);
    }

    @PutMapping ("edit")
    public Resultat_Module editResultatModule(@RequestBody Resultat_Module resultatModule){
        return resultatModuleService.updateResultatModule(resultatModule);
    }

    @GetMapping("ByCNE/{CNE}")
    public List<Resultat_Module> resultatModulesByCNE(@PathVariable String CNE){
        return resultatModuleService.RESULTAT_MODULES_Etudiant(CNE);
    }
    @GetMapping("")
    public List<Resultat_Module> resultatModulesAll(){
        return resultatModuleService.RESULTAT_MODULES();
    }


}
