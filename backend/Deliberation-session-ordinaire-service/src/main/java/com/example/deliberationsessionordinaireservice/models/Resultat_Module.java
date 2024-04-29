package com.example.deliberationsessionordinaireservice.models;

import com.example.deliberationsessionordinaireservice.entities.Resultat;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;


@Data @AllArgsConstructor @NoArgsConstructor @ToString @Builder
public class Resultat_Module implements Serializable {

    private String CNE;

    private Long moduleID;

    private String semestreID;

    private Long filiereID;

    //private Long elementID;

    private Float note_finale;
    @Enumerated(EnumType.STRING)
    private Resultat resultat;
    public Resultat_Module(String CNE, Long moduleID) {
        this.CNE = CNE;
        this.moduleID = moduleID;
    }
}