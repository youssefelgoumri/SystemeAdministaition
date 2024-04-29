package fsm.miaad.feigns;

import fsm.miaad.models.Etablissement;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

//@Component
@FeignClient(name ="ETABLISSEMENT-SERVICE")
public interface EtablissementRestClient {

    @GetMapping("etablissements/onlyEtab")
    List<Etablissement> allOnlyIdNameEtab();

    @GetMapping("etablissements/{id}")
    Etablissement Etablissement(@PathVariable String id);
}
