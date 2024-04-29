package fsm.miaad.models;

import fsm.miaad.entities.Salle;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.Id;

import java.util.List;


@Data @AllArgsConstructor @NoArgsConstructor @ToString @Builder
public class Professeur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom,prenom;
    @Enumerated(EnumType.STRING)
    private Departement departement;


}

