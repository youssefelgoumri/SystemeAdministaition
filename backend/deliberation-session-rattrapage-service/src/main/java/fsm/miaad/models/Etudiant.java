package fsm.miaad.models;

import lombok.*;

@Data @NoArgsConstructor @AllArgsConstructor @ToString @Builder
public class Etudiant {
    private String massar;
    private String nomEnFrançais;
    private String prenomEnFrançais;
}
