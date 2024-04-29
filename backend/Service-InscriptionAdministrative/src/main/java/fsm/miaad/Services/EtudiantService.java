package fsm.miaad.Services;

import java.util.List;

import fsm.miaad.Entities.Etudiant;

public interface EtudiantService {
    Etudiant findEtudiantById(String id);
    List<Etudiant> findEtudiantByName(String firstName, String lastName);
    List<Etudiant> findEtudiantByFilliere(Long idFilliere);
    List<Etudiant> findEtudiantByEtablissement(String idEtablissement);
    Etudiant addEtudiant(String massar);
    Etudiant updateEtudiant(String id, Etudiant newEtudiant);
    void deleteEtudiant(String id);
    List<Etudiant> allEtudiants();
}
