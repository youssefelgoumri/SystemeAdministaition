package fsm.miaad.feigns;

import fsm.miaad.models.Resultat_Rattrapage;
import fsm.miaad.models.Resultat_RattrapageID;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient("DELIBERATION-SESSION-RATTRAPAGE-SERVICE")
public interface RattrapageService {

    @GetMapping("delibration/rattrapages/ids")
    Resultat_Rattrapage ResultatRattrapage(@RequestBody Resultat_RattrapageID ids);

}
