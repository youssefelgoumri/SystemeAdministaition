package fsm.miaad.models;

import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class Filiere {
    private Long id;
    private String nom;
    private int nombreAnnees;
    private int nombreSemestresParAnnee;
//    private StructureEnseignement structure;
    private ResponsableFiliere responsable;
    private List<Long> modulesId;
    private List<Semestre> semestres;

    



}
