package fsm.miaad.feigns;

import fsm.miaad.models.Module;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@Component
@FeignClient(name = "SERVICE-MODULE" )
public interface ModuleServiceClient {

    @GetMapping("modules/{id}")
    Module module(@PathVariable Long id);

    
}
