package fsm.miaad.feigns;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import fsm.miaad.models.Etudiant;

@FeignClient("SERVICE-INSCRIPTIONADMINISTRATIVE")
public interface InscriptionAdminServiceClient {
    @GetMapping("etudiantsAdministratifs/{id}")
    public Etudiant etudiant(@PathVariable String id);
}
