package fsm.miaad.structure_enseignementservice.Services;
import fsm.miaad.structure_enseignementservice.entities.Filiere;
import fsm.miaad.structure_enseignementservice.entities.ResponsableFiliere;
import fsm.miaad.structure_enseignementservice.models.Responsable;


import java.util.List;

public interface ResponsableFiliereService {

    ResponsableFiliere getResponsableFiliereById(Long responsableId);
    List<ResponsableFiliere> getAllResponsablesFilieres();
    ResponsableFiliere createResponsableFiliere(ResponsableFiliere responsable );
    ResponsableFiliere updateResponsableFiliere(Long responsableId, ResponsableFiliere responsable);
    void deleteResponsableFiliere(Long responsableId);

}
