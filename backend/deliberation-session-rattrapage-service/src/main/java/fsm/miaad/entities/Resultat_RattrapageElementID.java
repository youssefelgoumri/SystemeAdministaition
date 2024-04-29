package fsm.miaad.entities;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Resultat_RattrapageElementID {
    private String CNE;
    private Long moduleID;
    private String semestreID;
    private Long filiereID;
    private Long elementID;

}
