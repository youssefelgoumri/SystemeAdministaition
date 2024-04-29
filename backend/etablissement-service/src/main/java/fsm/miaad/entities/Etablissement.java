package fsm.miaad.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import fsm.miaad.models.Filiere;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Data
@AllArgsConstructor @NoArgsConstructor @ToString
@Builder
public class Etablissement {
    @Id
    private String codeName;
    private String nom,ville,discipline;


   @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @ElementCollection
    @CollectionTable(name = "etablissement_filiere", joinColumns = @JoinColumn(name = "etablissement_id"))
    @Column(name = "filiere_id")
    private List<Long> filiereIds;
    // @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Transient
    private Collection<Filiere> filieres;

    public Collection<Filiere> getFilieres() {
    if (this.filieres == null) {
        this.filieres = new ArrayList<>();
    }
    return this.filieres;
    }

    private String adminUsername;
    private String adminPassword;

    public void generateAdminCredentials() {
        // Assuming codeName is not null
        this.adminUsername = "admin" + this.codeName;
        this.adminPassword = "admin";
    }
    public void setAdminUsername(String adminUsername) {
        this.adminUsername = adminUsername;
    }

    public void setAdminPassword(String adminPassword) {
        this.adminPassword = adminPassword;
    }}