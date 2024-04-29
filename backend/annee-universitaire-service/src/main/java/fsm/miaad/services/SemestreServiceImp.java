package fsm.miaad.services;


import fsm.miaad.entities.Semestre;
import fsm.miaad.repositories.SemestreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class SemestreServiceImp implements SemestreService{
    @Autowired
    SemestreRepository semestreRepository;
    @Override
    public List<Semestre> getAllSemestre() {
        return semestreRepository.findAll();
    }

    @Override
    public Semestre addSemestre(Semestre semestre) {
        return semestreRepository.save(semestre);
    }

    @Override
    public void delSemestre(String id) {
        Semestre semestre1=semestreRepository.getById(id);
        if (semestre1!=null) semestreRepository.deleteById(id);

    }


    @Override
    public Semestre getById(String id) {
        return semestreRepository.findById(id).orElse(null);
    }
}
