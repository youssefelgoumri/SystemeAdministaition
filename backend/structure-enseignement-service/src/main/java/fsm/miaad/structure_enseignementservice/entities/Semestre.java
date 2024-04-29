package fsm.miaad.structure_enseignementservice.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Semestre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomSemestre;

    // Liste des IDs des modules associés à ce semestre
    @ElementCollection
    @CollectionTable(name = "semestre_modules", joinColumns = @JoinColumn(name = "semestre_id"))
    @Column(name = "module_id")
    private List<Long> modulesIds;

}
