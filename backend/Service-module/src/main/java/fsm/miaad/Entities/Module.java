package fsm.miaad.Entities;

import java.util.List;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class Module {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String intitule;
    @OneToMany(mappedBy = "module")
    List<Element> elementsModule;
    @ManyToOne
    Responsable responsableModule;
}