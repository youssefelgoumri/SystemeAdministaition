package fsm.miaad.Services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import fsm.miaad.Entities.Diplome;
import fsm.miaad.Repositories.DiplomeRepository;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class DiplomeServiceImpl implements DiplomeService{
    DiplomeRepository diplomeRepository;

    @Override
    public Diplome addDiplome(Diplome diplome) {
        return diplomeRepository.save(diplome);
    }

    @Override
    public List<Diplome> allDiplomes(String massar) {
        List<Diplome> sesDiplomes = new ArrayList<>();
        List<Diplome> allDiplomes = diplomeRepository.findAll();
        for (Diplome diplome : allDiplomes) {
            if (diplome.getMassar().equals(massar))
                sesDiplomes.add(diplome);
        }
        return sesDiplomes;
    }

    @Override
    public void deleteDiplome(Long id) {
        diplomeRepository.deleteById(id);
    }

    @Override
    public Diplome findDiplomeById(Long id) {
        return diplomeRepository.findById(id).orElseThrow(()->new RuntimeException("Ce diplome n'existe pas"));
    }

    @Override
    public Diplome updateDiplome(Long id, Diplome newDiplome) {
        Diplome oldDiplome = findDiplomeById(id);
        if (newDiplome != null){
            if (newDiplome.getDateObtention() != null && !newDiplome.getDateObtention().equals(oldDiplome.getDateObtention()))
                oldDiplome.setDateObtention(newDiplome.getDateObtention());
            if (newDiplome.getDiplome() != null && !newDiplome.getDiplome().equals(oldDiplome.getDiplome()))
                oldDiplome.setDiplome(newDiplome.getDiplome());
            if (newDiplome.getSpecialite() != null && !newDiplome.getSpecialite().equals(oldDiplome.getSpecialite()))
                oldDiplome.setSpecialite(newDiplome.getSpecialite());
            if (newDiplome.getUniversite() != null && !newDiplome.getUniversite().equals(oldDiplome.getUniversite()))
                oldDiplome.setUniversite(newDiplome.getUniversite());
            if (newDiplome.getEtablissement() != null && !newDiplome.getEtablissement().equals(oldDiplome.getEtablissement()))
                oldDiplome.setEtablissement(newDiplome.getEtablissement());
            if (newDiplome.getVille() != null && !newDiplome.getVille().equals(oldDiplome.getVille()))
                oldDiplome.setVille(newDiplome.getVille());
            if (newDiplome.getMention() != null && !newDiplome.getMention().equals(oldDiplome.getMention()))
                oldDiplome.setMention(newDiplome.getMention());
        }
        return diplomeRepository.save(oldDiplome);
    }
    
}
