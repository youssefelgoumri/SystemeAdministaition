package fsm.miaad.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import fsm.miaad.models.reservation;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.List;

@Entity
@Data @AllArgsConstructor @NoArgsConstructor @Builder @ToString
public class Professeur implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private String prenom;
    @Column(unique = true)
    private String email;
    private String password;
    private String etablissement;
    @Enumerated(EnumType.STRING)
    private Departement departement;
    @Enumerated(EnumType.STRING)
    private List<Departement> discipline;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @ElementCollection
    @CollectionTable(name = "professor_reservations", joinColumns = @JoinColumn(name = "professor_id"))
    @Column(name = "reservation_id")
    private List<Long> reservationId;

    @Transient
    private List<reservation> reservations;

}
