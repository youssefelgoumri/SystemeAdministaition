package fsm.miaad.entities;

import fsm.miaad.enums.NomSession;
import fsm.miaad.enums.TypeSession;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Session {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Enumerated(EnumType.STRING)
    private NomSession nom; // enum to change
    // functions : add(session as body request )
    @Enumerated(EnumType.STRING)
    private TypeSession typeSession; // enum to change
    @OneToMany(mappedBy = "session")
    private List<Semestre> semestres;

    @ManyToOne
    @JoinColumn(name = "annee_universitaire_id")
    private AnneeUniv anneeUniversitaire;

    public Session(Long id, NomSession nom, TypeSession typeSession) {
        this.id = id;
        this.nom = nom;
        this.typeSession = typeSession;
    }

    public Session(NomSession nom, TypeSession typeSession, AnneeUniv anneeUniversitaire) {
        this.nom = nom;
        this.typeSession = typeSession;
        this.anneeUniversitaire = anneeUniversitaire;
    }

    @Override
    public String toString() {
        return "Session{" +
                "id=" + id +
                ", nom=" + nom +
                ", typeSession=" + typeSession +
                ", semestres=" + semestres +
                ", anneeUniversitaire=" + anneeUniversitaire +
                '}';
    }
}
