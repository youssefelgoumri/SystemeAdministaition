package com.example.deliberationsessionordinaireservice.entities;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
@IdClass(PlanDeValidationModuleID.class)
public class PlanDeValidationModule implements Serializable {
    @Id
    private String CNE;
    @Id
    private Long moduleID;
    @Id
    private String semestreID;
    @Id
    private Long filiereID;

    @Transient
    private List<PlanDeValidation> planDeValidationsElements;

    private Float noteFinale;

    @Enumerated(EnumType.STRING)
    private Resultat resultat;

}
