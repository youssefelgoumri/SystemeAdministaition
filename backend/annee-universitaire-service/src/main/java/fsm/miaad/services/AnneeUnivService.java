package fsm.miaad.services;

import fsm.miaad.entities.AnneeUniv;
import org.springframework.stereotype.Service;

import java.util.List;


public interface AnneeUnivService {
    List<AnneeUniv> getAllAnneeUniv();
    AnneeUniv addAnneUniv(AnneeUniv anneeUniv);
    AnneeUniv editAnneUniv(Long id, AnneeUniv anneeUniv);
    void deleteAnneeUniv(Long id);
    AnneeUniv getById(Long id);
    String getAnneeCourante();
}