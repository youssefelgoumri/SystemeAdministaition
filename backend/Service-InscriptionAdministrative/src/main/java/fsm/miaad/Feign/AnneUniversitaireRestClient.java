package fsm.miaad.Feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(name = "ANNEE-UNIVERSITAIRE-SERVICE")
public interface AnneUniversitaireRestClient {
    @GetMapping("anneecourante")
    String anneeCourante();
}
