package com.example.deliberationsessionordinaireservice.feign;

import com.example.deliberationsessionordinaireservice.models.Resultat_Module;
import com.example.deliberationsessionordinaireservice.models.Resultat_ModuleID;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient("DELIBERATION-SEMESTRE-SERVICE")
public interface DSemestreServiceClient {

    @PostMapping("modulesResults/add")
    Resultat_Module addResultatModule(@RequestBody Resultat_Module resultatModule);
    @PutMapping("modulesResults/edit")
    Resultat_Module editResultatModule(@RequestBody Resultat_Module resultatModule);

    @PostMapping("modulesResults")
    Resultat_Module getResultatModuleByid(@RequestBody Resultat_ModuleID resultatModule);
}