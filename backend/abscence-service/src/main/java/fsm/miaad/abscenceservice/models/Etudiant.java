package fsm.miaad.abscenceservice.models;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Etudiant {
    String massar;
    String nomEnFrançais;
    String prenomEnFrançais;
}
