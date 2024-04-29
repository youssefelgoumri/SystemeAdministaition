package fsm.miaad.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor @ToString
@Builder
public class AnneeUniv {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "annee_universitaire")
    private String anneeUniversitaire;

    @Column(name = "annee_courante")
    private boolean anneeCourante;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @OneToMany(mappedBy = "anneeUniversitaire", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Session> session;

    public AnneeUniv(String anneeUniversitaire) {
        this.anneeUniversitaire = anneeUniversitaire;
    }
    public AnneeUniv(String anneeUniversitaire, Boolean anneeCourante) {
        this.anneeUniversitaire = anneeUniversitaire;
        this.anneeCourante = false;
    }
    public AnneeUniv(String anneeUniversitaire, Boolean anneeCourante, List<Session> session) {
        this.anneeUniversitaire = anneeUniversitaire;
        this.anneeCourante = false;
        this.session = session;
    }

    // Méthode pour marquer cette année comme l'année universitaire courante
    public void marquerCommeAnneeCourante() {
        this.anneeCourante = true;
    }
}
