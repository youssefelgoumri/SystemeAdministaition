package fsm.miaad.Services;

import java.util.List;

import fsm.miaad.Entities.Diplome;

public interface DiplomeService {
    Diplome findDiplomeById(Long id);
    List<Diplome> allDiplomes(String massar);
    Diplome addDiplome(Diplome diplome);
    Diplome updateDiplome(Long id, Diplome newDiplome);
    void deleteDiplome(Long id);
}
