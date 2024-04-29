package fsm.miaad.web;

import fsm.miaad.entities.Resultat_Semestre;
import fsm.miaad.entities.Resultat_Semestre_id;
import fsm.miaad.services.ResultatSemestreService;
import lombok.AllArgsConstructor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("delibration/semestre")
@AllArgsConstructor
public class ResultatSemestreRestController {

    ResultatSemestreService resultatSemestreService;

    @GetMapping("{semestre}")
    public List<Resultat_Semestre> allResultat_Semestre(@PathVariable String semestre){
        return resultatSemestreService.allResultat_Semestre(semestre);
    }
    @GetMapping("")
    public List<Resultat_Semestre> allResultat_Semestre( ){
        return resultatSemestreService.allResultat_Semestre();
    }

    @PostMapping("etdsemestre")
    public Resultat_Semestre getById(@RequestBody Resultat_Semestre_id ids){
        return resultatSemestreService.getById(ids);
    }

    @PostMapping("add")
    public List<Resultat_Semestre> addResultat_Semestre(@RequestBody Resultat_Semestre resultatSemestre){
//        you need to give just s1 or s2 or s2 and filere id

        return resultatSemestreService.addResultat_Semestre(resultatSemestre);
    }

    @PostMapping("generer{semestre}")
    public void RESULTAT_SEMESTREExcel(@PathVariable String semestre) throws IOException{
        resultatSemestreService.RESULTAT_SEMESTREExcel(semestre);
    }

    @GetMapping("generate/{semestre}/{cne}")
    public ResponseEntity<byte[]> genererFichierResultatsExcel(@PathVariable String semestre,@PathVariable String cne) throws IOException {
        return resultatSemestreService.genererFichierResultatsExcel(semestre,cne);
    }
    @GetMapping("generateResultatModule/{semestre}/{cne}")
    public ResponseEntity<byte[]> generateResultatModule(@PathVariable String semestre,@PathVariable String cne) throws IOException {
        return resultatSemestreService.genererFichierResultatsExcelForEtudient(semestre,cne);
    }
}
