package fsm.miaad.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;




@Entity
@Data
@NoArgsConstructor @AllArgsConstructor @ToString
@Builder
public class Semestre {
    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @ManyToOne
    private Session session;
}
