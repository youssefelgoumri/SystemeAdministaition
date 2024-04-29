package fsm.miaad.services;

import fsm.miaad.DTO.adminDataDTO;
import fsm.miaad.entities.Etablissement;
import fsm.miaad.models.EtablissementIdName;
import fsm.miaad.models.Filiere;
import fsm.miaad.models.FiliereIdName;
import fsm.miaad.models.ResponsableFiliere;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface EtablissementService {

    List<Etablissement> getAllEtablissement();
    Etablissement addEtablissement(Etablissement etablissement);
    void delEtablissement(String id);
    Etablissement getById(String id);
    Etablissement editEtablissement(String id,Etablissement etablissement);
    Etablissement addFilieresToEtablissement(String codeName,Filiere filieres);
    Etablissement affectFilieresToEtablissement(String codeName,Long IdFiliere);
    List<EtablissementIdName> allEtablissementIdName();
    List<FiliereIdName> allFiliereIdName(String codename);

    Etablissement deleteFiliereFromEtablissement(String codeName, Long IdFiliere);
    adminDataDTO getAdminData(String codeName);
    Etablissement login(adminDataDTO adminDataDTO);



}
