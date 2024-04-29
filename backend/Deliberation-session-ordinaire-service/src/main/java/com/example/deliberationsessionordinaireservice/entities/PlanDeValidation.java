package com.example.deliberationsessionordinaireservice.entities;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Entity @NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
@IdClass(PlanDeValidationID.class)
public class PlanDeValidation implements Serializable {
    @Id
    private String CNE;
    @Id
    private Long moduleID;
    @Id
    private String semestreID;
    @Id
    private Long filiereID;
    @Id
    private Long elementID;

    private Float noteTP;
    private Float noteExam;
    private Float noteFinale;

    @Enumerated(EnumType.STRING)
    private Resultat resultat;

}