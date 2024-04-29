package fsm.miaad.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data @NoArgsConstructor @AllArgsConstructor @ToString @Builder
public class PlanDeValidationID {
    private String CNE;
    private Long moduleID;
    private String semestreID;
    private Long filiereID;
    private Long elementID;
}
