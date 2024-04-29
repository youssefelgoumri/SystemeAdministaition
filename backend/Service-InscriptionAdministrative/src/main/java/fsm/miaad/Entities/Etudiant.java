package fsm.miaad.Entities;

import java.util.List;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Etudiant {
    @Id
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
    String etablissement;
    List<String> fillieres;
    String idEtablissement;
    List<Long> idFillieres;
    String anneeUniversitaire;
    String etape;
    Boolean bourse;
    @OneToMany(mappedBy = "massar")
    List<Diplome> diplomes;
    String adressePersonnelle;
    String telephone;
    String mail;
    String adresseParents;
    String dateInscription;//automatique
}
