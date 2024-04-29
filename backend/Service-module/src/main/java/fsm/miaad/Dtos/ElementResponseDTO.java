package fsm.miaad.Dtos;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class ElementResponseDTO {
    Long id;
    String partieCours, partieTPs;
    Integer coefficientCours, coefficientTPs;
}
