package fsm.miaad.models;

import lombok.*;


@Builder
@Data @AllArgsConstructor @NoArgsConstructor @ToString
public class ResponsableFiliere {
    private Long id;
    private String nom;
    private String prenom;
}
