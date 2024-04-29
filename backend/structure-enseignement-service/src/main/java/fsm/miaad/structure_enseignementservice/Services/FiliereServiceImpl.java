package fsm.miaad.structure_enseignementservice.Services;
import fsm.miaad.structure_enseignementservice.Repositories.FiliereRepository;
import fsm.miaad.structure_enseignementservice.entities.Filiere;
import fsm.miaad.structure_enseignementservice.entities.ResponsableFiliere;
import fsm.miaad.structure_enseignementservice.entities.Semestre;
import fsm.miaad.structure_enseignementservice.exeption.FiliereNotFoundException;
import fsm.miaad.structure_enseignementservice.exeption.ModuleNotFoundException;
import fsm.miaad.structure_enseignementservice.exeption.ResponsableNotFoundException;
import fsm.miaad.structure_enseignementservice.feigns.ModuleServiceClient;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import fsm.miaad.structure_enseignementservice.models.Module;

@AllArgsConstructor
@Service
@Transactional
public class FiliereServiceImpl implements FiliereService {

    private final FiliereRepository filiereRepository;
    private final ResponsableFiliereService responsableFiliereService;
    private final ModuleServiceClient moduleServiceClient;
    List<List<Long>> modulesParSemestre = new ArrayList<>();

    @Override
    public List<Filiere> getAllFilieres() {
        return filiereRepository.findAll();
    }

    @Override
    public Filiere getFiliereById(Long filiereId) {
        return filiereRepository.findById(filiereId).orElse(null);
    }

    @Override
    public Filiere getById(Long id) {
        return filiereRepository.findById(id).orElse(null);
    }

    @Override
    public Filiere addFiliere(Filiere filiere, Long responsableId) throws ResponsableNotFoundException, ModuleNotFoundException {
        // Vérifier l'existence du responsable
        ResponsableFiliere responsable = responsableFiliereService.getResponsableFiliereById(responsableId);
        if (responsable == null) {
            throw new ResponsableNotFoundException("Responsable introuvable avec l'ID : " + responsableId);
        }

        // Affecter le responsable à la filière
        filiere.setResponsable(responsable);

        // Obtenir la liste de toutes les filières existantes
        List<Filiere> filieres = filiereRepository.findAll();

        // Déterminer le prochain ID de filière
        long nextFiliereId = 1;
        if (!filieres.isEmpty()) {
            // Si des filières existent déjà, prendre le plus grand ID et ajouter 1
            nextFiliereId = filieres.stream().mapToLong(Filiere::getId).max().getAsLong() + 1;
        }

        // Définir l'ID de la nouvelle filière
        filiere.setId(nextFiliereId);

        // Enregistrer la filière dans la base de données
        Filiere savedFiliere = filiereRepository.save(filiere);

        // Créer de nouvelles instances de semestres pour éviter les problèmes de fusion d'entités
        List<Semestre> newSemestres = new ArrayList<>();
        for (Semestre semestre : filiere.getSemestres()) {
            Semestre newSemestre = Semestre.builder()
                    .nomSemestre(semestre.getNomSemestre())
                    .modulesIds(semestre.getModulesIds())
                    .build();
            newSemestres.add(newSemestre);
        }

        // Ajouter les nouveaux semestres à la filière
        savedFiliere.setSemestres(newSemestres);

        // Enregistrement de la filière mise à jour avec les semestres ajoutés
        savedFiliere = filiereRepository.save(savedFiliere);

        return savedFiliere;
    }


    @Override
    public Filiere editfiliere(Long id, Filiere filiere)throws FiliereNotFoundException,ResponsableNotFoundException, ModuleNotFoundException {
        // Vérifier si la filière avec l'ID spécifié existe
        Filiere existingFiliere = filiereRepository.findById(id)
                .orElseThrow(() -> new FiliereNotFoundException("Filière introuvable avec l'ID : " + id));



        // Mettre à jour les informations de la filière avec les nouvelles données
        existingFiliere.setNom(filiere.getNom());
        existingFiliere.setNombreAnnees(filiere.getNombreAnnees());
        existingFiliere.setNombreSemestresParAnnee(filiere.getNombreSemestresParAnnee());
        // Mettre à jour les semestres de la filière
        List<Semestre> updatedSemestres = new ArrayList<>();
        for (Semestre semestre : filiere.getSemestres()) {
            Semestre updatedSemestre = new Semestre();
            updatedSemestre.setNomSemestre(semestre.getNomSemestre());
            updatedSemestre.setModulesIds(semestre.getModulesIds());
            updatedSemestres.add(updatedSemestre);
        }
        existingFiliere.setSemestres(updatedSemestres);
        ResponsableFiliere responsableFiliere = filiere.getResponsable();
        responsableFiliereService.updateResponsableFiliere(responsableFiliere.getId(), responsableFiliere);
        existingFiliere.setResponsable(responsableFiliere);
        // Enregistrer la filière mise à jour dans la base de données
        Filiere savedFiliere = filiereRepository.save(existingFiliere);

        return savedFiliere;
    }




    @Override
    public void deleteFiliere(Long filiereId) {
        Filiere filiere = filiereRepository.findById(filiereId).orElse(null);
        if (filiere != null) {
            ResponsableFiliere responsable = filiere.getResponsable();
            if (responsable != null) {
                responsableFiliereService.deleteResponsableFiliere(responsable.getId());
            }
            filiereRepository.deleteById(filiereId);
        }
    }


}

