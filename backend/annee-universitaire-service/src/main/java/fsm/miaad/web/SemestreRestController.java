package fsm.miaad.web;


import fsm.miaad.entities.Semestre;
import fsm.miaad.services.SemestreServiceImp;
import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/semestres")
public class SemestreRestController {

    private SemestreServiceImp semestreService;

    @Autowired
    public SemestreRestController(SemestreServiceImp semestreService) {
        this.semestreService = semestreService;
    }

    @GetMapping("")
    public List<Semestre> allSemestres(){
        return semestreService.getAllSemestre();
    }

    @GetMapping("{id}")
    public Semestre Semestre(@PathVariable String id){
        return semestreService.getById(id);
    }

    @PostMapping("add")
    public Semestre addSemestre(@RequestBody Semestre semestre){
        return semestreService.addSemestre(semestre);
    }

    @DeleteMapping("delete/{id}")
    public void deleteSemestre(@PathVariable String id){
        semestreService.delSemestre(id);

    }
}
