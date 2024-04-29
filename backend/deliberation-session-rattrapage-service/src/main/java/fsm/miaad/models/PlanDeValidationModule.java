package fsm.miaad.models;

import java.util.List;

import jakarta.persistence.Enumerated;
import lombok.*;

@Data @AllArgsConstructor @NoArgsConstructor @ToString @Builder
public class PlanDeValidationModule {
    private String CNE;
    private Long moduleID;
    private Long filiereID;
    private Float noteFinale;
    private Resultat resultat;
}
