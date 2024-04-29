package fsm.miaad.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Entity
@Data @AllArgsConstructor @NoArgsConstructor @Builder @ToString
@IdClass(Resultat_RattrapageElementID.class)
public class Resultat_RattrapageElement implements Serializable {
    @Id
    private String CNE;
    @Id
    private Long moduleID;
    @Id
    private String semestreID;
    @Id
    private Long filiereID;
    @Id
    private Long elementID;
    @JsonProperty("note_ordinaire")
    private Float note_ordinaire;
    @JsonProperty("note_rattrapage")
    private Float note_ratt;

    private Float noteTPratt;
    private Float noteExamratt;


    private Float note_final;
    @Enumerated(EnumType.STRING)
    private Statut statut;
    @PrePersist
    @PreUpdate
    public void beforeInsert() {
        this.note_final = Math.max(this.note_ordinaire, this.note_ratt);
    }

}
