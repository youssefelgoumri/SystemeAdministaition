package fsm.miaad.abscenceservice.feigns;
import fsm.miaad.abscenceservice.models.Module;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Component
@FeignClient(name = "SERVICE-MODULE" )
public interface ModuleClient {

    @GetMapping("/modules")
    List<Module> modules();

    @GetMapping("modules/{id}")
    Module module(@PathVariable Long id);
}