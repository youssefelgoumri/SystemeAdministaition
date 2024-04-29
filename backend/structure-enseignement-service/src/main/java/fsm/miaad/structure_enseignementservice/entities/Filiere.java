package fsm.miaad.structure_enseignementservice.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;
import fsm.miaad.structure_enseignementservice.models.Module;


import java.util.*;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class Filiere {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private int nombreAnnees;
    private int nombreSemestresParAnnee;

    @ElementCollection
    @CollectionTable(name = "filiere_modules", joinColumns = @JoinColumn(name = "filiere_id"))
    @Column(name = "module_id")
    private List<Long> modulesId = new ArrayList<>();

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Transient
    public List<Module> module;
    // Liste des semestres associés à cette filière
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "filiere_id")
    private List<Semestre> semestres;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "responsable_id", referencedColumnName = "id")
    private ResponsableFiliere responsable;


    // Méthode pour générer la liste des IDs des semestres avec les IDs des modules pour chaque semestre
    public Map<Long, List<Long>> genererListeIdsSemestresEtModules(List<Long> modulesIds) {
        Map<Long, List<Long>> semestresEtModules = new HashMap<>();
        long id = 1;
        for (int annee = 1; annee <= nombreAnnees; annee++) {
            for (int semestre = 1; semestre <= nombreSemestresParAnnee; semestre++) {
                if (id <= nombreAnnees * nombreSemestresParAnnee) {
                    List<Long> modulesSemestre = new ArrayList<>();
                    for (Long moduleId : modulesIds) {
                        modulesSemestre.add(moduleId);
                    }
                    semestresEtModules.put(id, modulesSemestre);
                    id++;
                } else {
                    // Si l'ID dépasse le produit des nombres d'années et de semestres par année, sortir de la boucle
                    break;
                }
            }
        }
        return semestresEtModules;

    }}

