package com.example.deliberationsessionordinaireservice.entities;

import jakarta.persistence.Id;
import lombok.*;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class PlanDeValidationModuleID implements Serializable {

    private String CNE;
    private Long moduleID;
    private String semestreID;
    private Long filiereID;
}
