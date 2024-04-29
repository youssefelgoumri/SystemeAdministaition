package com.example.deliberationsessionordinaireservice.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Element {
    Long id;

    String partieCours, partieTPs;

    Integer coefficientCours, coefficientTPs;

    Module module;
}
