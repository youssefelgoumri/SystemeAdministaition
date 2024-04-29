package fsm.miaad.structure_enseignementservice.models;



import lombok.*;

import java.util.List;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Module {
    Long id;
    String intitule;
    List<Element> elementsModule;
    Responsable responsableModule;
}