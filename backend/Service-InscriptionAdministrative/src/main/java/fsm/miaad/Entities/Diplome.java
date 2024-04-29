package fsm.miaad.Entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Diplome {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String dateObtention;
    String diplome;
    String specialite;
    String universite;
    String etablissement;
    String ville;
    String mention;
    String massar;
}
