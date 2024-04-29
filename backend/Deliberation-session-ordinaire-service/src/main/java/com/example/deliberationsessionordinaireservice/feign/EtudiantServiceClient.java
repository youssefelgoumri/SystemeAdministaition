package com.example.deliberationsessionordinaireservice.feign;

import com.example.deliberationsessionordinaireservice.models.Etudiant;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "SERVICE-INSCRIPTIONADMINISTRATIVE")
public interface EtudiantServiceClient {
    @GetMapping("etudiantsAdministratifs/{id}")
    Etudiant etudiant(@PathVariable String id);

}
