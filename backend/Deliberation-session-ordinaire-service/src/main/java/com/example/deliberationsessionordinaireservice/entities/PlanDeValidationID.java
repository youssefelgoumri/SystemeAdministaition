package com.example.deliberationsessionordinaireservice.entities;

import lombok.*;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class PlanDeValidationID implements Serializable {
    private String CNE;
    private Long moduleID;
    private String semestreID;
    private Long filiereID;
    private Long elementID;
}
