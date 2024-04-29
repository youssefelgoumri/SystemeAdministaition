package fsm.miaad.feigns;

import fsm.miaad.models.ValidationParam;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient("VALIDATION-PARAM-SERVICE")
public interface ValParaServiceClient {
    @GetMapping("ValidationParams/{id}")
    ValidationParam getValidationParam(@PathVariable Long id);
}
