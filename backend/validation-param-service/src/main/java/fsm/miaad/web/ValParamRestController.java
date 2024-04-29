package fsm.miaad.web;

import fsm.miaad.entities.ValidationParam;
import fsm.miaad.services.ValParaService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("ValidationParams")
@AllArgsConstructor
public class ValParamRestController {
    ValParaService valParaService;

    @PostMapping("add")
    public ValidationParam addValidationParam(@RequestBody ValidationParam validationParam){
        return valParaService.addValidationParam(validationParam);

    }
    @GetMapping("")
    public List<ValidationParam> allValidationParams(){
        return valParaService.allValidationParams();

    }
    @GetMapping("{id}")
    public ValidationParam getValidationParam(@PathVariable Long id){
        return valParaService.getValidationParam(id);
    }
    @PutMapping("edit/{id}")
    public ValidationParam editValidationParam(@PathVariable Long id,@RequestBody ValidationParam validationParam){
        return valParaService.editValidationParam(id,validationParam);
    }
    @DeleteMapping("delete/{id}")
    public void deleteValidationParam(@PathVariable Long id){
        valParaService.deleteValidationParam(id);
    }

    
}
