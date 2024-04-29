package fsm.miaad.services;

import fsm.miaad.entities.*;
import fsm.miaad.feigns.RattrapageService;
import fsm.miaad.feigns.ValParaServiceClient;
import fsm.miaad.models.ValidationParam;
import fsm.miaad.repositories.ResultatModuleRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class ResultatModuleServiceImp implements ResultatModuleService{

    ResultatModuleRepository resultatModuleRepository;
    ValParaServiceClient valParaServiceClient;
    RattrapageService rattrapageService;

    @Override
    public float calculerMoyenne(List<Float> notes) {
        if (notes == null || notes.isEmpty()) {
            throw new IllegalArgumentException("La liste ne peut pas être null ou vide.");
        }

        float somme = 0.0f;
        for (float note : notes) {
            somme += note;
        }

        return somme / notes.size();
    }


    @Override
    public List<Resultat_Module> RESULTAT_MODULES() {
        return resultatModuleRepository.findAll();
    }

    @Override
    public List<Resultat_Module> RESULTAT_MODULES_Etudiant(String CNE) {

        return resultatModuleRepository.findByCNE(CNE);
    }

    @Override
    public float NoteSemestre(String CNE){
        List<Float> notes=new ArrayList<>();
        List<Resultat_Module> resultatModules=RESULTAT_MODULES_Etudiant(CNE);
        if(resultatModules!=null){
            for (Resultat_Module resultatModule:resultatModules){
                notes.add(resultatModule.getNote_finale());
            }
            return calculerMoyenne(notes);
        }
        return 0f;
    }

    @Override
    public Resultat_Module addResultatModule(Resultat_Module resultatModule1) {
        Resultat_Module resultat_module=getByIdResultatModule(new Resultat_ModuleID(resultatModule1.getCNE(),resultatModule1.getModuleID(),resultatModule1.getSemestreID(), resultatModule1.getFiliereID()));
        if(resultat_module!=null) return null;

        ValidationParam validationParam= valParaServiceClient.getValidationParam(resultatModule1.getFiliereID());
        if(resultatModule1.getNote_finale()>=validationParam.getX())
            resultatModule1.setStatut(Statut.V);
        else resultatModule1.setStatut(Statut.NV);
        resultatModule1=resultatModuleRepository.save(resultatModule1);
        validerParCompensation(validationParam.getX(),validationParam.getZ(),resultatModule1.getCNE(),resultatModule1.getSemestreID(),resultatModule1.getFiliereID());
        return resultatModule1;
    }

    @Override
    public Resultat_Module getByIdResultatModule(Resultat_ModuleID ids) {
        return resultatModuleRepository.findById(ids).orElse(null);
    }


    @Override
    public List<Resultat_Module> RESULTAT_MODULES_SEMESTRE_FILIER(String cne, String s, Long f) {
        // TODO Auto-generated method stub
        return resultatModuleRepository.findByCNEAndSemestreIDAndFiliereID(cne, s, f);
    }


    @Override
    public Resultat_Module updateResultatModule(Resultat_Module resultatModule) {

        Resultat_Module resultatModule1=getByIdResultatModule(new Resultat_ModuleID(resultatModule.getCNE(),resultatModule.getModuleID(),resultatModule.getSemestreID(), resultatModule.getFiliereID()));
        if(resultatModule1!=null){
            if(resultatModule.getNote_finale()!=null)
                resultatModule1.setNote_finale(resultatModule.getNote_finale());
            if(resultatModule.getStatut()!=null)
                resultatModule1.setStatut(resultatModule.getStatut());
            resultatModule1=resultatModuleRepository.save(resultatModule1);
            ValidationParam validationParam= valParaServiceClient.getValidationParam(resultatModule1.getFiliereID());
            if(resultatModule1.getNote_finale()>=validationParam.getX())
                resultatModule1.setStatut(Statut.V);
            else resultatModule1.setStatut(Statut.NV);
            resultatModule1=resultatModuleRepository.save(resultatModule1);
            validerParCompensation(validationParam.getX(),validationParam.getZ(),resultatModule1.getCNE(),resultatModule1.getSemestreID(),resultatModule1.getFiliereID());
        }
        return resultatModule1;
    }

    @Override
    public List<Resultat_Module> RESULTAT_MODULES_By_SEMESTRE(String s) {
        return resultatModuleRepository.findBySemestreID(s);
    }

    @Override
    public List<Resultat_Module> RESULTAT_MODULES_SEMESTRE(String cne,String s) {
        return resultatModuleRepository.findByCNEAndSemestreID(cne,s);
    }

    @Override
    public Float note_compensation(String CNE,String s,Long f ) {
        List<Resultat_Module> resultatModules=resultatModuleRepository.findByCNEAndStatutAndSemestreIDAndFiliereID(CNE, Statut.V,s,f);
        Float note_finale=0f;
        Float note_comp=0f;
        for(Resultat_Module rm:resultatModules){
            ValidationParam validationParam= valParaServiceClient.getValidationParam(rm.getFiliereID());
            note_finale=rm.getNote_finale();
            note_comp+=note_finale-validationParam.getX();
        }
        return note_comp;
    }

    //    @Scheduled(fixedRate = 5000)
    @Override
    public void validerParCompensation (Float x,Float z,String CNE,String s,Long f ) {
        Float note_compensation=note_compensation(CNE,s,f);
        System.out.println("note_compensation="+note_compensation);
        List<Resultat_Module> resultatModules=resultatModuleRepository.findByCNEAndStatutAndSemestreIDAndFiliereID(CNE,Statut.NV,s,f);
        List<Resultat_Module> rm_VPCs=resultatModuleRepository.findByCNEAndStatutAndSemestreIDAndFiliereID(CNE, Statut.VPC,s,f);

        for(Resultat_Module rm:resultatModules){
            if(rm_VPCs.isEmpty()) {

                Float note_finale = rm.getNote_finale();
                System.out.println(note_finale);
                if (note_finale >= z && note_finale<x) {
                    Float pourCom = x-note_finale;
                    if(pourCom<=note_compensation) {
                        Float note_nouvelle = note_finale + pourCom;
                        rm.setStatut(Statut.VPC);
                        rm=resultatModuleRepository.save(rm);
                        note_compensation-=pourCom;
                    }
                }
//                if(note_compensation<=0) break;
            }
            else{
                System.out.println("dh===="+rm.toString());
                for (Resultat_Module rm_VPC : rm_VPCs) {
                    Float note_finale = rm_VPC.getNote_finale();
                    if (note_finale >= z && note_finale < x) {
                        Float pourCom = x - note_finale;
                        if (pourCom <= note_compensation) {
                            note_compensation -= pourCom;
                        }
                    }
                    if (note_compensation <= 0) break;
                }
                Float pourCom1 = x - rm.getNote_finale();
                if (rm.getNote_finale() >= z && rm.getNote_finale() < x) {
                    if (pourCom1 <= note_compensation) {
                        rm.setStatut(Statut.VPC);
                        rm = resultatModuleRepository.save(rm);
                    }
                }
            }


            if(note_compensation<=0) break;
        }
    }


}
