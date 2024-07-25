package com.example.rentngo.coucheWeb.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class VoitureRequestDTO {
    private Long id;
    private String immatriculation;
    private String marque;
    private Long prix;
    private String couleur;
    private String categorie;
    private Long garantie;
    private String nomPhotoVoiture;
}
