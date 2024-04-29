package com.example.deliberationsessionordinaireservice.web;

import com.example.deliberationsessionordinaireservice.entities.PlanDeValidation;
import com.example.deliberationsessionordinaireservice.entities.PlanDeValidationID;
import com.example.deliberationsessionordinaireservice.entities.PlanDeValidationModule;
import com.example.deliberationsessionordinaireservice.entities.PlanDeValidationModuleID;
import com.example.deliberationsessionordinaireservice.models.Element;
import com.example.deliberationsessionordinaireservice.services.PVService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;


@RestController
@RequestMapping("delibration/ordinaire")
@AllArgsConstructor
public class PVRestController {
    private PVService pvService;

    @GetMapping("/elements")
    public List<PlanDeValidation> allPVs(){
        return pvService.getAllPVs();
    }

    @PostMapping("/element/ids")
    public PlanDeValidation planDeValidation(@RequestBody PlanDeValidationID ids){
        return pvService.getPlanDeValidationById(ids);
    }

    @PostMapping("/element/add")
    public PlanDeValidation savePlanDeValidation(@RequestBody PlanDeValidation pv){
        return pvService.addPlanDeValidation(pv);
    }


    @GetMapping("/modules")
    public List<PlanDeValidationModule> allPVsModule(){
        return pvService.getAllPVsModule();
    }

    @PostMapping("/module/ids")
    public PlanDeValidationModule planDeValidationModule(@RequestBody PlanDeValidationModuleID ids){
        return pvService.getPlanDeValidationModuleById(ids);
    }

    @PostMapping("/module/add")
    public PlanDeValidationModule savePlanDeValidationModule(@RequestBody PlanDeValidationModule pv){
        return pvService.addPlanDeValidationModule(pv);
    }

    @PutMapping("/element/edit")
    public PlanDeValidation updatePlanDeValidation(@RequestBody PlanDeValidation pv){
        return pvService.editPlanDeValidation(pv);
    }

    @DeleteMapping("/element/delete")
    public void deletePlanDeValidation(@RequestBody PlanDeValidationID ids){
        pvService.deletePlanDeValidation(ids);

    }



    //change it to module
    @PutMapping("/module/edit")
    public PlanDeValidationModule updatePlanDeValidationModule(@RequestBody PlanDeValidationModule pv){
        return pvService.editPlanDeValidationModule(pv);
    }

    @DeleteMapping("/module/delete")
    public void deletePlanDeValidationModule(@RequestBody PlanDeValidationModuleID ids){
        pvService.deletePlanDeValidationModule(ids);

    }

    @GetMapping("moduletoexcel/{id}")
    public ResponseEntity<byte[]> pvmoduletoexcel(@PathVariable Long id) throws IOException {
        return pvService.genererFichierResultatsExcelOfModule(id);
    }

//    @GetMapping("moduletoexcel")
//    public ResponseEntity<byte[]> pvmoduletoexcel() throws IOException {
//        return pvService.genererFichierResultatsExcelOfModule();
//    }

    @GetMapping("toexcel")
    public ResponseEntity<byte[]> toexcel() throws IOException {
        return pvService.genererFichierResultatsExcel();
    }

    @PostMapping("addAll")
    public List<PlanDeValidation> addAllFromExcel(@RequestBody String chemin){
        return pvService.addPlanDeValidationFromExcel(chemin);
    }

    @GetMapping("/{moduleId}/elements")
    public List<Element> getElementsOfModule(@PathVariable Long moduleId) {
        return pvService.getElementsForModule(moduleId);
    }

    // toget les elements ratt on table pv
    @GetMapping("elmmod/{CNE},{ModuleID},{FiliereID},{SemestreID}")
    public List<PlanDeValidation> planDeValidationByCNEAndModuleIDAndFiliereIDAndSemestreID(
        @PathVariable String CNE,@PathVariable Long ModuleID,
        @PathVariable Long FiliereID,@PathVariable String SemestreID){
        return pvService.planDeValidationByCNEAndModuleIDAndFiliereIDAndSemestreID(CNE,ModuleID,FiliereID,SemestreID);
        }
    @PostMapping("/module/pvelements")
    public List<PlanDeValidation> getallPVElementsByPVid(@RequestBody PlanDeValidationModule pvm) {
        return pvService.getallPVElementsByPVid(pvm);
    }
}
