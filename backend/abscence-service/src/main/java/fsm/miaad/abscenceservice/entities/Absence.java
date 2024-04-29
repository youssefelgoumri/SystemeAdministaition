package fsm.miaad.abscenceservice.entities;
import jakarta.persistence.*;
import lombok.*;



import java.util.Date;

@Entity
@Data @AllArgsConstructor @NoArgsConstructor @ToString
@Table(name = "absences")
public class Absence {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "etudiant_id")
    private String etudiantId;

    @Column(name = "matiere_id")
    private Long matiereId;

    @Column(name = "professeur_id")
    private Long professeurId;

    @Column(name = "date_absence")
    private Date dateAbsence;

    @Column(name = "creneau_horaire")
    private String creneauHoraire;

    @Column(name = "presence_professeur")
    private boolean presenceProfesseur;

    @Column(name = "justification")
    private String justification;


}