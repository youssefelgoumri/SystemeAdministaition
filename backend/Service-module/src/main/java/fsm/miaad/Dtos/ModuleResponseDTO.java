package fsm.miaad.Dtos;

import java.util.List;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class ModuleResponseDTO {
    Long id;
    String intitule;
    List<ElementResponseDTO> elementsModule;
    ResponsableResponseDTO responsableModule;
}
