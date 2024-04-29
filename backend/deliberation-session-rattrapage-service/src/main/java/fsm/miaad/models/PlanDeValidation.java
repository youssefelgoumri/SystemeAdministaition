package fsm.miaad.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data @AllArgsConstructor @NoArgsConstructor @ToString @Builder
public class PlanDeValidation {
    private String CNE;
    private Long moduleID;
    private String semestreID;
    private Long filiereID;
    private Long elementID;

    private Float noteTP;
    private Float noteExam;
    private Float noteFinale;
    private Resultat resultat;
}
