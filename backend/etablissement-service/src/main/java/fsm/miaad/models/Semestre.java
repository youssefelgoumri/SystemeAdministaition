package fsm.miaad.models;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data @NoArgsConstructor @AllArgsConstructor @Builder @ToString
public class Semestre {
    private Long id;
    private String nomSemestre;
    private List<Long> modulesIds;
    private List<Module> modules;

}
