package fsm.miaad.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ElementModule {
    Long id;
    String partieCours, partieTPs;
    Integer coefficientCours, coefficientTPs;
}
