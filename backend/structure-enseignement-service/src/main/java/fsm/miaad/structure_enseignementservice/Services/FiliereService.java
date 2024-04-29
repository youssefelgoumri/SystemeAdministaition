package fsm.miaad.structure_enseignementservice.Services;
import fsm.miaad.structure_enseignementservice.entities.Filiere;
import fsm.miaad.structure_enseignementservice.exeption.FiliereNotFoundException;
import fsm.miaad.structure_enseignementservice.exeption.ModuleAlreadyAffectedException;
import fsm.miaad.structure_enseignementservice.exeption.ModuleNotFoundException;
import fsm.miaad.structure_enseignementservice.exeption.ResponsableNotFoundException;
import fsm.miaad.structure_enseignementservice.models.FiliereIdName;

import java.util.List;


public interface FiliereService {

    List<Filiere> getAllFilieres();

    Filiere getFiliereById(Long filiereId);

    Filiere getById(Long id);

    Filiere addFiliere(Filiere filiere, Long responsableId ) throws ResponsableNotFoundException, ModuleNotFoundException;
    void deleteFiliere(Long filiereId);
    Filiere editfiliere(Long id, Filiere filiere) throws FiliereNotFoundException, ResponsableNotFoundException, ModuleNotFoundException ;



}
