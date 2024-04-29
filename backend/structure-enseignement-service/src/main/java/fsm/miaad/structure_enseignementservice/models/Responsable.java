package fsm.miaad.structure_enseignementservice.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Responsable {
    Long id;
    String nom, prenom;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    List<Module> modules;

    @Override
    public String toString() {
        return "Responsable{" +
                "id=" + id +
                ", nom='" + nom + '\'' +
                ", prenom='" + prenom + '\'' +
                '}';
    }
}