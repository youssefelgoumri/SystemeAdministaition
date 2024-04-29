package fsm.miaad.services;

import fsm.miaad.entities.Semestre;

import java.util.List;

public interface SemestreService {
    List<Semestre> getAllSemestre();
    Semestre addSemestre(Semestre semestre);
    void delSemestre(String id);
    Semestre getById(String id);
}
