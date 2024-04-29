package fsm.miaad.feigns;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import fsm.miaad.models.Module;

@Component
@FeignClient(name = "SERVICE-MODULE" )
public interface ModuleRestClient {
    
    @GetMapping("/modules/{id}")
    Module module(@PathVariable Long id);
    
}
