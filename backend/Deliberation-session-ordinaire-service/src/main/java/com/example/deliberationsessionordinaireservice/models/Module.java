package com.example.deliberationsessionordinaireservice.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Module {
    private Long id;

    private String intitule;

    private List<Element> elementsModule;
    private ResponsableModule responsableModule;

}
