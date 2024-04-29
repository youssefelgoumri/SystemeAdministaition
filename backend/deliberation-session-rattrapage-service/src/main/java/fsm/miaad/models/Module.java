package fsm.miaad.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Module {
    private Long id;
    private String intitule;
    private List<ElementModule> elementsModule;
    private ResponsableModule responsableModule;
}
