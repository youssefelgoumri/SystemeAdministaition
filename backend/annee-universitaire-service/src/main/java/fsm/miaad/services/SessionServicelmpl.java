package fsm.miaad.services;

import fsm.miaad.entities.AnneeUniv;
import fsm.miaad.entities.Semestre;
import fsm.miaad.entities.Session;
import fsm.miaad.repositories.SessionRepository;
import jakarta.persistence.Id;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SessionServicelmpl implements SessionService{
    @Autowired
    SessionRepository sessionRepository;
    @Autowired
    SemestreService semestreService;

    @Override
    public Session getById(Long id) {
        return sessionRepository.findById(id).orElseThrow(()->new RuntimeException("Aucune Session."));
    }

    @Override
    public Session addSession(Session session) {
        return sessionRepository.save(session);
    }

    @Override
    public void delete(Long id) {
        Session session=sessionRepository.getById(id);

        if(session != null) {
            List<Semestre> semestres = session.getSemestres();
            for (Semestre semestre:semestres) {
                semestreService.delSemestre(semestre.getId());
            }

            sessionRepository.deleteById(id);}
    }

    @Override
    public Session update(Long id, Session session) {
        Session oldSession=getById(id);
        if(session.getNom()!=null)
            if (!oldSession.getNom().equals(session.getNom()))
                oldSession.setNom(session.getNom());
        if(session.getTypeSession()!=null)
            if(!oldSession.getTypeSession().equals(session.getTypeSession()))
                oldSession.setTypeSession(session.getTypeSession());
        if(session.getSemestres()!=null)
            if(!oldSession.getSemestres().equals(session.getSemestres()))
                oldSession.setSemestres(session.getSemestres());



        return sessionRepository.save(oldSession);

    }

    @Override
    public List<Session> allSession() {

        return sessionRepository.findAll();
    }


}
