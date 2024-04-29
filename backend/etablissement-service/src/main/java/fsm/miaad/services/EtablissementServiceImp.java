package fsm.miaad.services;

import fsm.miaad.DTO.adminDataDTO;
import fsm.miaad.entities.Etablissement;
import fsm.miaad.feigns.ModuleRestClient;
import fsm.miaad.feigns.StructureEenseignementserviceRestClient;
import fsm.miaad.models.Module;
import fsm.miaad.models.*;
import fsm.miaad.repositories.EtablissementRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class EtablissementServiceImp implements EtablissementService{

    EtablissementRepository etablissementRepository;
    StructureEenseignementserviceRestClient SErClient;
    ModuleRestClient moduleRestClient;
    @Override
    public List<Etablissement> getAllEtablissement() {
        List<Etablissement> etablissements = etablissementRepository.findAll();
        for(Etablissement etablissement : etablissements){
            List<Long> filieresId = etablissement.getFiliereIds();
            Collection<Filiere> filieres = new ArrayList<>();
            for(Long idf: filieresId){
                ResponseEntity<Filiere> filEntity=SErClient.getFiliereById(idf);
                Filiere filiere=filEntity.getBody();
                filieres.add(filiere);

            }
            etablissement.setFilieres(filieres);

        }
        return etablissements;
    }



    @Override
    public Etablissement getById(String id) {
        Etablissement etablissement = etablissementRepository.findById(id).orElse(null);
        if(etablissement != null){
            List<Long> filieresId = etablissement.getFiliereIds();
            Collection<Filiere> filieres = new ArrayList<>();
            
            for(Long idf: filieresId){
                ResponseEntity<Filiere> filEntity=SErClient.getFiliereById(idf);
                Filiere filiere=filEntity.getBody();
                List<Semestre> semestres=filiere.getSemestres();
                for(Semestre semestre:semestres){
                    List<Module> modulesFilList=new  ArrayList<>();
                    List<Long> modules=semestre.getModulesIds();
                    for(Long m:modules){
                        Module module=moduleRestClient.module(m);
                        modulesFilList.add(module);
                    }
                    semestre.setModules(modulesFilList);
                }
                
                filieres.add(filiere);

            }
            etablissement.setFilieres(filieres);
        }
        return etablissement;
                //orElseThrow(() -> new RuntimeException("Etablissement num"+id+"not found"));
    }


    @Override
    public Etablissement addEtablissement(Etablissement etablissement) {
        Etablissement etablissement1=getById(etablissement.getCodeName());
        if(etablissement1!=null) return null;
//        List<Filiere> filieres=
        return etablissementRepository.save(etablissement);
    }

    @Override
    public Etablissement addFilieresToEtablissement(String codeName, Filiere filiere) {//List<Filiere> filieres
        Etablissement etablissement=getById(codeName);

        if (etablissement!=null){
            Collection<Filiere> filieres = etablissement.getFilieres();
            List<Long> filieresId = etablissement.getFiliereIds();
            ResponseEntity<ResponsableFiliere> responseEntityRespo = SErClient.createResponsableFiliere(filiere.getResponsable());
            ResponsableFiliere responsableFiliere=responseEntityRespo.getBody();
            ResponseEntity<Filiere> responseEntityFiliere=SErClient.addFiliere(filiere,responsableFiliere.getId());
            // System.out.println("responseEntityFiliere"+responseEntityFiliere);
            Filiere filiere1=responseEntityFiliere.getBody();
            // System.out.println("filiere1  "+filiere1);
            filieres.add(filiere1);
            etablissement.setFilieres(filieres);
            filieresId.add(filiere1.getId());
            etablissement.setFiliereIds(filieresId);
            etablissement=etablissementRepository.save(etablissement);
            etablissement=getById(codeName);
        }

        return etablissement;
    }

    @Override
    public Etablissement affectFilieresToEtablissement(String codeName, Long IdFiliere) {
        Etablissement etablissement=getById(codeName);
        if(etablissement!=null){
            ResponseEntity<Filiere>  filiereResponseEntity=SErClient.getFiliereById(IdFiliere);
            Filiere filiere=filiereResponseEntity.getBody();
            System.out.println(filiere.toString());
            if(filiere!=null){
                List<Long> filieresId = etablissement.getFiliereIds();
                filieresId.add(filiere.getId());
                etablissement.setFiliereIds(filieresId);
                etablissement=etablissementRepository.save(etablissement);
                etablissement=getById(codeName);
            }
        }
        return etablissement;
    }

    @Override
    public Etablissement deleteFiliereFromEtablissement(String codeName, Long IdFiliere) {
        Etablissement etablissement=getById(codeName);
        //insert into ETABLISSEMENT_FILIERE (FILIERE_ID ,ETABLISSEMENT_ID ) values(1,'FSM')
        if(etablissement!=null){
            Etablissement idTodelete=etablissementRepository.findByCodenameAndFiliereId(codeName, IdFiliere);
            if(idTodelete!=null){
                etablissement.getFiliereIds().remove(IdFiliere);

                etablissement=etablissementRepository.save(etablissement);

                // System.out.println(etablissement.toString());
                return etablissement;
            }
        }
        return etablissement;
    }

    @Override
    public adminDataDTO getAdminData(String codeName) {
        Etablissement etablissement = etablissementRepository.findByCodeName(codeName);
        if (etablissement != null) {
            adminDataDTO adminDataDTO = new adminDataDTO();
            adminDataDTO.setAdminUsername(etablissement.getAdminUsername());
            adminDataDTO.setAdminPassword(etablissement.getAdminPassword());
            return adminDataDTO;
        } else {
            return null;
        }
    }

    @Override
    public Etablissement login(adminDataDTO adminDataDTO) {
        // Vérifier si l'administrateur existe dans la base de données
        Etablissement etablissement = etablissementRepository.findByAdminUsername(adminDataDTO.getAdminUsername());
        if (etablissement != null && etablissement.getAdminPassword().equals(adminDataDTO.getAdminPassword())) {
            return etablissement;
        } 
        return etablissement;
    }


    @Override
    public void delEtablissement(String id) {
        etablissementRepository.deleteById(id);
    }

    @Override
    public Etablissement editEtablissement(String id, Etablissement etablissement) {
        Etablissement etablissement1=getById(id);
        if(etablissement1!=null) {
            if (etablissement.getNom()!=null)
                etablissement1.setNom(etablissement.getNom());
            if(etablissement.getVille()!=null)
                etablissement1.setVille(etablissement.getVille());
            if(etablissement.getDiscipline()!=null)
                etablissement1.setDiscipline(etablissement.getDiscipline());
            etablissement1=etablissementRepository.save(etablissement1);
            etablissement=getById(id);
//            etablissement1.setFilieres();
        }
        return etablissement1;
    }

    @Override
    public List<EtablissementIdName> allEtablissementIdName() {
        return etablissementRepository.getAllIdName();
    }

    @Override
    public List<FiliereIdName> allFiliereIdName(String codeName) {
        Etablissement etablissement=getById(codeName);
        List<FiliereIdName> filiereIdNames=new ArrayList<>();
        if(etablissement!=null){
            for(Filiere filiere:etablissement.getFilieres()){
                filiereIdNames.add(FiliereIdName.builder()
                        .id(filiere.getId())
                        .nom(filiere.getNom())
                        .build());
            }
        }

        return filiereIdNames;
    }
}
