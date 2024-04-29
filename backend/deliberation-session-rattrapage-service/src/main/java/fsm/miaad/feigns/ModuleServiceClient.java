package fsm.miaad.feigns;

import fsm.miaad.models.ElementModule;
import fsm.miaad.models.Module;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Map;

@Component
@FeignClient(name = "SERVICE-MODULE" )
public interface ModuleServiceClient {

    @GetMapping("/modules/{id}")
    Module module(@PathVariable Long id);

    @GetMapping("/modules/{id}/elements")
    List<ElementModule> getElementsForModule(@PathVariable Long id);

    @GetMapping("/modules")
    List<Module> modules();

    @GetMapping("/elements/controbution/{ids}")
    Map<Long, Integer> controbutions(@PathVariable List<Long> ids);
    // http://localhost:2222/SERVICE-MODULE/elements/1
    @GetMapping("elements/{id}")
    ElementModule element(@PathVariable Long id);

}
