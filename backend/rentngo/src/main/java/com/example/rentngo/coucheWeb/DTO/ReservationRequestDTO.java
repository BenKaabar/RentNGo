package com.example.rentngo.coucheWeb.DTO;

import java.util.Date;

import com.example.rentngo.DAO.enums.Status;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ReservationRequestDTO {
    private Long id;
    private Date dateDebut;
    private Date dateFin;
    private String message;
    private Status status;
    private String localisation;
}
