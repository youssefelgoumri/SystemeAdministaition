package fsm.miaad.services;

import fsm.miaad.entities.AnneeUniv;
import fsm.miaad.entities.Session;

import java.util.List;

public interface SessionService {
    Session getById(Long id);
    Session addSession(Session session);
    void delete(Long id);
    Session update(Long id, Session session);
    List<Session> allSession();

}
