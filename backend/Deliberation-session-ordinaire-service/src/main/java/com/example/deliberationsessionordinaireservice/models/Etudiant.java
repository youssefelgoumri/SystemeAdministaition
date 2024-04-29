package com.example.deliberationsessionordinaireservice.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Etudiant {
    private String massar;
    private String nomEnFrançais;
    private String prenomEnFrançais;
}
