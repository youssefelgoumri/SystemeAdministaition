package fsm.miaad.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import lombok.*;

import java.io.Serializable;

@Data @AllArgsConstructor @NoArgsConstructor @ToString @Builder
public class Resultat_Semestre_id implements Serializable {
    private String CNE;

    private String semestreID;

    private Long filiereID;



}
