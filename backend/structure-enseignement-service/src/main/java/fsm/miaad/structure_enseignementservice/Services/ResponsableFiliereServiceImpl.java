package fsm.miaad.structure_enseignementservice.Services;
import fsm.miaad.structure_enseignementservice.Repositories.ResponsableFiliereRepository;
import fsm.miaad.structure_enseignementservice.entities.ResponsableFiliere;
import fsm.miaad.structure_enseignementservice.exeption.ResponsableFiliereNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ResponsableFiliereServiceImpl implements ResponsableFiliereService {

    @Autowired
    private ResponsableFiliereRepository responsableFiliereRepository;


    private ResponsableFiliere responsableFiliere;

    @Override
    public ResponsableFiliere getResponsableFiliereById(Long responsableId) {
        ResponsableFiliere responsableFiliere = responsableFiliereRepository.findById(responsableId).orElseThrow(() -> new ResponsableFiliereNotFoundException("ResponsableFiliere not found"));
        return responsableFiliere;
    }

    @Override
    public List<ResponsableFiliere> getAllResponsablesFilieres() {
        List<ResponsableFiliere> responsablesFiliere = responsableFiliereRepository.findAll();
        return responsablesFiliere;
    }

    @Override
    public ResponsableFiliere createResponsableFiliere(ResponsableFiliere responsable) {
        //ResponsableFiliere responsableFiliere = responsableFiliere.mapToEntity(responsable);
        ResponsableFiliere responsableFiliere = responsableFiliereRepository.save(responsable);
        return responsableFiliere;
    }

    @Override
    public ResponsableFiliere updateResponsableFiliere(Long responsableId, ResponsableFiliere responsable) {
        ResponsableFiliere existingResponsableFiliere = responsableFiliereRepository.findById(responsableId).orElseThrow(() -> new ResponsableFiliereNotFoundException("ResponsableFiliere not found"));

        // Mettez à jour les propriétés du responsable avec celles du DTO
        existingResponsableFiliere.setNom(responsable.getNom());
        existingResponsableFiliere.setPrenom(responsable.getPrenom());
        // Mettez à jour d'autres propriétés selon les besoins

        existingResponsableFiliere = responsableFiliereRepository.save(existingResponsableFiliere);
        return responsableFiliere;
    }

    @Override
    public void deleteResponsableFiliere(Long responsableId) {
        responsableFiliereRepository.deleteById(responsableId);
    }

}
