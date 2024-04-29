package fsm.miaad.models;

import fsm.miaad.entities.Statut;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;

import java.io.Serializable;


@Data @AllArgsConstructor @NoArgsConstructor @ToString @Builder
public class Resultat_ModuleID implements Serializable {

    private String CNE;

    private Long moduleID;

    private String semestreID;

    private Long filiereID;

}
