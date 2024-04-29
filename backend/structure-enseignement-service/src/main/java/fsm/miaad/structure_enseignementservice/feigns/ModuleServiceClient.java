package fsm.miaad.structure_enseignementservice.feigns;

import fsm.miaad.structure_enseignementservice.models.*;
import fsm.miaad.structure_enseignementservice.models.Module;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Component
@FeignClient(name = "SERVICE-MODULE" )
public interface ModuleServiceClient {

    @GetMapping("/modules")
    List<Module> modules();

    @GetMapping("/modules/{id}")
    Module module(@PathVariable Long id);

    @PutMapping("/modules/edit/{id}")
    Module update(@PathVariable Long id, @RequestBody Module module);

    @PostMapping("/modules/add")
    Module save(@RequestBody Module module);

    @DeleteMapping("/modules/delete/{id}")
    void deleteModule(@PathVariable Long id);



}

