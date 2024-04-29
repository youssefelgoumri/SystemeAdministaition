package fsm.miaad.entities;

import fsm.miaad.models.Professeur;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;
// to know that we've two Ids
@Entity @Data @AllArgsConstructor @NoArgsConstructor @ToString @Builder
//@IdClass(reservationIds.class)
public class reservation implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /*@ManyToOne
    @JoinColumn(name = "id_prof")
    private Professeur professeur;*/
    private  Long IdProfesseur;

    @ManyToOne
    @JoinColumn(name = "idSalle")
    private Salle salle;

    @Temporal(TemporalType.TIMESTAMP)
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "date_debut")
    private Date date_debut;

    @Temporal(TemporalType.TIMESTAMP)
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "date_fin")
    private Date date_fin;
}
