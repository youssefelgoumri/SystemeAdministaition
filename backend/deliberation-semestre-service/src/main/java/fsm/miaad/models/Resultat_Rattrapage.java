package fsm.miaad.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;


@Data @AllArgsConstructor @NoArgsConstructor @Builder @ToString
public class Resultat_Rattrapage implements Serializable {

    private String CNE;
    private Long moduleID;
    private String semestreID;
    private Long filiereID;
    private Float note_ordinaire;
    private Float note_ratt;
    private Float note_final;
    private Statut statut;

}
