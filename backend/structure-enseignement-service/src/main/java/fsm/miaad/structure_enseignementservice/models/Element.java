package fsm.miaad.structure_enseignementservice.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Element {
    Long id;
    String partieCours, partieTPs;
    Integer coefficientCours, coefficientTPs;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    List<Module> modules;

    @Override
    public String toString(){
        return "Element {" +
                "id=" + id +
                ", partieCours='" + partieCours + '\'' +
                ", partieTPs='" + partieTPs + '\'' +
                ", coefficientCours='" + coefficientCours + '\'' +
                ", coefficientTPs='" + coefficientTPs + '\'' +
                '}';
    }
}