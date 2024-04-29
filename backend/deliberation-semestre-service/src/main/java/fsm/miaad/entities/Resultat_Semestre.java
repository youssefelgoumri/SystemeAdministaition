package fsm.miaad.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Entity
@Data @AllArgsConstructor @NoArgsConstructor @ToString @Builder
@IdClass(Resultat_Semestre_id.class)
public class Resultat_Semestre implements Serializable {
    @Id
    private String CNE;
    @Id
    private String semestreID;
    @Id
    private Long filiereID;
    private Float note_finale;
    @Enumerated(EnumType.STRING)
    private Statut statut;



}
