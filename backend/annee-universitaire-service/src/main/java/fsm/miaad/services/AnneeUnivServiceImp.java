package fsm.miaad.services;

import fsm.miaad.entities.AnneeUniv;
import fsm.miaad.entities.Semestre;
import fsm.miaad.entities.Session;
import fsm.miaad.enums.NomSession;
import fsm.miaad.enums.TypeSession;
import fsm.miaad.repositories.AnneeUnivRepository;
import fsm.miaad.repositories.SemestreRepository;
import fsm.miaad.repositories.SessionRepository;
import jakarta.ws.rs.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Service
public class AnneeUnivServiceImp implements AnneeUnivService{
    @Autowired
    AnneeUnivRepository anneeUnivRepository;

    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private SemestreRepository semestreRepository;

    @Autowired
    private SessionService sessionService;
    @Override
    public List<AnneeUniv> getAllAnneeUniv() {
        return anneeUnivRepository.findAll();
    }

    @Override
    public AnneeUniv addAnneUniv(AnneeUniv anneeUniv) {
        // Logique pour marquer la nouvelle année comme l'année universitaire courante
        marquerAnneeCourante(anneeUniv);

        AnneeUniv nouvelleAnnee = anneeUnivRepository.save(anneeUniv);

        // Logique pour créer automatiquement les sessions et les semestres
        creerSessionsEtSemestres(nouvelleAnnee);
        return nouvelleAnnee;
    }

    private void creerSessionsEtSemestres(AnneeUniv anneeUniversitaire) {
        // Logique pour déterminer la structure d'enseignement de chaque établissement
        // Vous pouvez ajuster cela en fonction des règles spécifiques de votre établissement

        // Exemple de logique : Deux sessions par année (Automne et Printemps)
        Session sessionAutomne = new Session(NomSession.Automne, TypeSession.Ordinaire, anneeUniversitaire);
        Session sessionPrintemps = new Session(NomSession.Printemps, TypeSession.Ordinaire, anneeUniversitaire);

        // Enregistrement des sessions
        sessionRepository.saveAll(List.of(sessionAutomne, sessionPrintemps));

        // Exemple de logique : Trois semestres par session (S1, S3, S5)
        Semestre s1 = new Semestre("S1", sessionAutomne);
        Semestre s3 = new Semestre("S3", sessionAutomne);
        Semestre s5 = new Semestre("S5", sessionAutomne);

        Semestre s2 = new Semestre("S2", sessionPrintemps);
        Semestre s4 = new Semestre("S4", sessionPrintemps);
        Semestre s6 = new Semestre("S6", sessionPrintemps);

        // Enregistrement des semestres
        semestreRepository.saveAll(List.of(s1, s3, s5, s2, s4, s6));
    }



    @Override
    public AnneeUniv editAnneUniv(Long id, AnneeUniv anneeUniv) {
        AnneeUniv existingAnneeUniv = anneeUnivRepository.findById(id).orElse(null);

        if (existingAnneeUniv == null) {
            throw new NotFoundException("Academic year not found with id: " + id);
        }

        existingAnneeUniv.setAnneeUniversitaire(anneeUniv.getAnneeUniversitaire());
        return anneeUnivRepository.save(existingAnneeUniv);
    }

    @Override
    public void deleteAnneeUniv(Long id) {
        AnneeUniv anneeUniv=anneeUnivRepository.getById(id);

        if(anneeUniv!=null) {
            List<Session> sessions = anneeUniv.getSession();
            for (Session session:sessions) {
                sessionService.delete(session.getId());
            }
            anneeUnivRepository.deleteById(id);
        }
    }

    @Override
    public AnneeUniv getById(Long id) {
        return anneeUnivRepository.findById(id).orElse(null);
    }

    // Logique pour désigner la nouvelle année comme l'année universitaire courante
    private void marquerAnneeCourante(AnneeUniv nouvelleAnnee) {
        // D'abord, démarquer toutes les années comme non courantes
        List<AnneeUniv> annees = anneeUnivRepository.findAll();
        for (AnneeUniv annee : annees) {
            annee.setAnneeCourante(false);
            editAnneUniv(annee.getId(), annee);
        }

        // Ensuite, marquer la nouvelle année comme courante
        nouvelleAnnee.setAnneeCourante(true);
    }

    @Override
    public String getAnneeCourante() {
        String anneeUniversitaireCouante = null;

        List<AnneeUniv> annees = anneeUnivRepository.findAll();
        for (AnneeUniv annee : annees) {
            if(annee.isAnneeCourante()){
                anneeUniversitaireCouante=annee.getAnneeUniversitaire();
            }
        }
        return anneeUniversitaireCouante;
    }
}
