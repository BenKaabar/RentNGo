package com.example.rentngo.coucheWeb.DTO;

import com.example.rentngo.DAO.enums.Status;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class ReservationRequestDTO {
    private Long idClient;
    private Long idVoiture;
    private String dateDebut;
    private String dateFin;
    private String message;
    private String localisation;
    private Status status;
}
