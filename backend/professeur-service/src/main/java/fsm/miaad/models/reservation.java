package fsm.miaad.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.io.Serializable;
import java.util.Date;

@Data @AllArgsConstructor @NoArgsConstructor @ToString @Builder
public class reservation implements Serializable {
    private Long id;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private  Long IdProfesseur;

    private Salle salle;
    private Date date_debut;
    private Date date_fin;
}
