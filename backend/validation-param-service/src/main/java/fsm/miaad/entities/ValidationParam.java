package fsm.miaad.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

import java.io.Serializable;

@Entity
@Data @AllArgsConstructor @NoArgsConstructor @ToString @Builder
public class ValidationParam implements Serializable {

    @Id
    private Long filiereID;
    private Float X; //pour valider un module respo de module
    private Float Y; //pour valider un semestre respo du filiere
    private Float Z; //pour componsation d'un module  respo du filiere

}
