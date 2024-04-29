package fsm.miaad.models;

import fsm.miaad.entities.Statut;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;


@Data @AllArgsConstructor @NoArgsConstructor @ToString @Builder
public class Resultat_Module implements Serializable {

    private String CNE;

    private Long moduleID;

    private String semestreID;

    private Long filiereID;
    private Float note_finale;
    @Enumerated(EnumType.STRING)
    private Statut statut;

    public Resultat_Module(String CNE, Long moduleID) {
        this.CNE = CNE;
        this.moduleID = moduleID;
    }
}
