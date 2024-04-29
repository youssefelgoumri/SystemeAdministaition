package fsm.miaad.feign;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import fsm.miaad.models.*;

@FeignClient(name = "ETABLISSEMENT-SERVICE")
public interface EtablissementRestClient {

    @GetMapping("/etablissements/onlyEtab")
    List<EtablissementIdName> allOnlyIdNameEtab();

    @GetMapping("/etablissements/onlyFiliere/{codeName}")
    List<FiliereIdName> allOnlyIdNameFil(@PathVariable String codeName);
}