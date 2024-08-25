package com.example.rentngo.coucheWeb.DTO;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class VoitureRequestDTO {
    private Long id;
    @NotNull(message = "Immatriculation is required")
    @Size(min = 1, message = "Immatriculation must not be empty")
    private String immatriculation;

    @NotNull(message = "Marque is required")
    @Size(min = 1, message = "Marque must not be empty")
    private String marque;

    @Positive(message = "Prix must be positive")
    private Long prix;
    private boolean EstDisponible;
    private String couleur;
    private String categorie;
    private Long garantie;
    private String nomPhotoVoiture;
    private String typePhotoVoiture;
    // private byte[] photoVoiture;
}
