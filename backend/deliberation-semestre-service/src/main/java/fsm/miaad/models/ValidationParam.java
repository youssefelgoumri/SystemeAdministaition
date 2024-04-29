package fsm.miaad.models;

import lombok.*;

@Data @AllArgsConstructor @NoArgsConstructor @ToString @Builder
public class ValidationParam {
    private Long filiereID;
    private Float X; //pour valider un module
    private Float Y; //pour valider un semestre
    private Float Z; //pour componsation d'un module
}
