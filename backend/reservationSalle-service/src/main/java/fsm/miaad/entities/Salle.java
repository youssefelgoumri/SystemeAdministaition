package fsm.miaad.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity @Data @AllArgsConstructor @NoArgsConstructor @ToString @Builder
public class Salle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idSalle;
    @Column(unique = true)
    private  String nom;
    @Enumerated(EnumType.STRING)
    private TypeSalle typeSalle;

    private  String description;
}
