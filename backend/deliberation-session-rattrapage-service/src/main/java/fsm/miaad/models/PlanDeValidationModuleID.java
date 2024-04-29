package fsm.miaad.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data @AllArgsConstructor @NoArgsConstructor @ToString @Builder
public class PlanDeValidationModuleID {
    private String CNE;
    private Long moduleID;
    private String semestreID;
    private Long filiereID;
}
