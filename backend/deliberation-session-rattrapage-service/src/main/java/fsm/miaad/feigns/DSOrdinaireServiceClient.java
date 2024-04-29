package fsm.miaad.feigns;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import fsm.miaad.models.PlanDeValidation;
import fsm.miaad.models.PlanDeValidationID;
import fsm.miaad.models.PlanDeValidationModule;
import fsm.miaad.models.PlanDeValidationModuleID;

@FeignClient("DELIBERATION-SESSION-ORDINAIRE-SERVICE")
public interface DSOrdinaireServiceClient {
    @PostMapping("delibration/ordinaire/element/ids")
    public PlanDeValidation planDeValidation(@RequestBody PlanDeValidationID ids);

    @PostMapping("delibration/ordinaire/module/ids")
    public PlanDeValidationModule planDeValidationModule(@RequestBody PlanDeValidationModuleID ids);
}
