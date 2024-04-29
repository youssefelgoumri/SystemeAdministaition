package fsm.miaad.models;

import lombok.*;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Resultat_RattrapageID implements Serializable {
    private String CNE;
    private Long moduleID;
    private String semestreID;
    private Long filiereID;
}
