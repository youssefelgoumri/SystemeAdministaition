package fsm.miaad.Dtos;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class ResponsableResponseDTO {
    Long id;
    String nom, prenom;
}
