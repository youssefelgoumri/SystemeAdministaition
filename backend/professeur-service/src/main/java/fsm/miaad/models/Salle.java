package fsm.miaad.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

@Data @AllArgsConstructor @NoArgsConstructor @ToString @Builder
public class Salle {
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private long idSalle;
    private  String nom;
    private TypeSalle typeSalle;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private  String description;
}
