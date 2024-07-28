package com.example.rentngo.coucheWeb.DTO;

import com.example.rentngo.DAO.enums.Status;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ReservationRequestDTO {
    private Long id;
    private String dateDebut;
    private String dateFin;
    private String message;
    private Status status;
    private String localisation;
    private Long idClient;
    private Long idVoiture;
}