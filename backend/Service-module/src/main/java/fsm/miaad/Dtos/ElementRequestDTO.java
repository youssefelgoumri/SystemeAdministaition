package fsm.miaad.Dtos;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class ElementRequestDTO {
    String partieCours, partieTPs;
    Integer coefficientCours, coefficientTPs;
    Integer contribution;
    fsm.miaad.Entities.Module module;
}
