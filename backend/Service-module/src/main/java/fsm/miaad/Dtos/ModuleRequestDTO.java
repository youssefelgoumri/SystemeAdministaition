package fsm.miaad.Dtos;

import java.util.List;

import fsm.miaad.Entities.Element;
import fsm.miaad.Entities.Responsable;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class ModuleRequestDTO {
    String intitule;
    List<Element> elementsModule;
    Responsable responsableModule;
}
