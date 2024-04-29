package fsm.miaad.entities;

import io.micrometer.core.annotation.TimedSet;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Entity
@Data @AllArgsConstructor @NoArgsConstructor @ToString @Builder
@IdClass(Resultat_ModuleID.class)
public class Resultat_Module implements Serializable {
    @Id
    private String CNE;
    @Id
    private Long moduleID;
    @Id
    private String semestreID;
    @Id
    private Long filiereID;
    private Float note_finale;
    @Enumerated(EnumType.STRING)
    private Statut statut;

}
