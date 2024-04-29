package fsm.miaad.web;

import fsm.miaad.entities.Resultat_Rattrapage;
import fsm.miaad.entities.Resultat_RattrapageElement;
import fsm.miaad.entities.Resultat_RattrapageElementID;
import fsm.miaad.entities.Resultat_RattrapageID;
import fsm.miaad.services.RattService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;



@RestController
@RequestMapping("delibration/rattrapages")
@AllArgsConstructor
public class RattRestController {

    private RattService rattService;

    
    @GetMapping("module")
    public List<Resultat_Rattrapage> allResultatRattrapages(){
        return rattService.allResultat_Rattrapage();
    }

    @PostMapping("module/ids")
    public Resultat_Rattrapage ResultatRattrapage(@RequestBody Resultat_RattrapageID ids){
        return rattService.getById(ids);
    }

    @PostMapping("module/add")
    public Resultat_Rattrapage addResultatRattrapage(@RequestBody Resultat_Rattrapage resultatRattrapage){
        return rattService.addResultat_Rattrapage(resultatRattrapage);
    }

    @PutMapping("module/edit")
    public Resultat_Rattrapage editResultatRattrapage(@RequestBody Resultat_Rattrapage resultatRattrapage){
        return rattService.update(resultatRattrapage);
    }

    @DeleteMapping("module/delete")
    public void deleteResultatRattrapage(@RequestBody Resultat_RattrapageID ids){
        rattService.delete(ids);

    }
    @GetMapping("module/toexcel/{filiereid},{moduleId},{semestreId}")
    public ResponseEntity<byte[]> toexcel(@PathVariable Long filiereid,
    @PathVariable Long moduleId,@PathVariable String semestreId) throws IOException {
        return rattService.genererFichierResultatsExcel( filiereid, moduleId, semestreId);
    }

    @PostMapping("module/addAll")
    public List<Resultat_Rattrapage> addAllFromExcel(@RequestBody String chemin){
        return rattService.addResultat_RattrapageFromExcel(chemin);
    }
    

    @PostMapping("element/add")
    public Resultat_RattrapageElement addResultat_RattrapageElement(@RequestBody Resultat_RattrapageElement element) {
      return rattService.addResultat_RattrapageElement(element);
    }

    @GetMapping("element")
    public List<Resultat_RattrapageElement> allResultat_RattrapageElements(){
        return rattService.allResultat_RattrapageElements();
    }

    @PostMapping("element/ids")
    public Resultat_RattrapageElement resultatRattrapageElement(@RequestBody Resultat_RattrapageElementID ids){
        return rattService.getResultat_RattrapageElement(ids);
    }


    @PutMapping("element/edit")
    public Resultat_RattrapageElement updateRattrapageElement(@RequestBody Resultat_RattrapageElement resultatRattrapage){
        return rattService.updateRattrapageElement(resultatRattrapage);
    }

    @DeleteMapping("element/delete")
    public void deleteResultat_RattrapageElement(@RequestBody Resultat_RattrapageElementID ids){
        rattService.deleteResultat_RattrapageElement(ids);

    }
    @GetMapping("element/toexcel/{elementId}")
    public ResponseEntity<byte[]> genererFichierResultatsElementleExcel(@PathVariable Long elementId) throws IOException {
        return rattService.genererFichierResultatsElementleExcel( elementId);
    }

    @PostMapping("element/addAll")
    public List<Resultat_RattrapageElement> addResultat_RattrapageElementsFromExcel(@RequestBody String chemin){
        return rattService.addResultat_RattrapageElementsFromExcel(chemin);
    }

    @PostMapping("resultatelmmod/{CNE},{FiliereID},{ModuleID},{SemestreID}")
    public List<Resultat_RattrapageElement> ResultatelementsdeModule(@PathVariable String CNE, @PathVariable Long FiliereID,@PathVariable Long ModuleID,@PathVariable String SemestreID) {
    
        return rattService.ResultatelementsdeModule(CNE, FiliereID, ModuleID, SemestreID);
    }  
    

}
