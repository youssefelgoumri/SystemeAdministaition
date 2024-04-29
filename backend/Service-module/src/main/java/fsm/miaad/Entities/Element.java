package fsm.miaad.Entities;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Element {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String partieCours, partieTPs;
    Integer coefficientCours, coefficientTPs;
    Integer contribution;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @ManyToOne
    Module module;

    @Override
    public String toString(){
        return "Element {" +
                "id=" + id +
                ", partieCours='" + partieCours + '\'' +
                ", partieTPs='" + partieTPs + '\'' +
                ", coefficientCours='" + coefficientCours + '\'' +
                ", coefficientTPs='" + coefficientTPs + '\'' +
                ", contribution='" + contribution + '\'' +
                '}';
    }
}