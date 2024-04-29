package fsm.miaad.services;

import fsm.miaad.entities.*;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.util.List;

public interface ResultatSemestreService {
    Resultat_Semestre getById(Resultat_Semestre_id id);
    List<Resultat_Semestre> addResultat_Semestre( Resultat_Semestre resultatSemestre);
    void delete(Resultat_Semestre_id id);
    Resultat_Semestre update(Resultat_Semestre resultat_semestre);
    List<Resultat_Semestre> allResultat_Semestre(String semestre);
    void RESULTAT_SEMESTREExcel(String semestre) throws IOException;

    public ResponseEntity<byte[]> genererFichierResultatsExcel(String semestre,String cne) throws IOException;

    public ResponseEntity<byte[]> genererFichierResultatsExcelForEtudient(String semestre,String cne) throws IOException;
    public List<Resultat_Semestre> allResultat_Semestre();



}
