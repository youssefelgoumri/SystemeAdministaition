package fsm.miaad.Models;

import java.util.List;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class EtudiantInscriptionEnLigne {
    String massar;
    String nomEnArabe;
    String prenomEnArabe;
    String nomEnFrançais;
    String prenomEnFrançais;
    String CIN;
    String nationalite;
    String sexe;
    String dateNaissance;
    String lieuNaissanceEnArabe;
    String lieuNaissanceEnFrançais;
    String ville;
    String province;
    Integer anneeBac;
    String serieBac;
    String mentionBac;
    String lieuObtentionBac;
    String lycee;
    String academie;
    String dateInscription;
    String etablissement;
    List<String> fillieres;
    String idEtablissement;
    List<Long> idFillieres;
}
