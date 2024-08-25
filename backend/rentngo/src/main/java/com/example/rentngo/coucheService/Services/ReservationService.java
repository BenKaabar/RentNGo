package com.example.rentngo.coucheService.Services;

import com.example.rentngo.DAO.entites.Reservation;
import com.example.rentngo.coucheWeb.DTO.ReservationRequestDTO;

import java.io.IOException;
import java.util.List;

public interface ReservationService {
    List<Reservation> getAllRentals();

    Reservation GetRentalById(Long id);

    Reservation addRental(ReservationRequestDTO reservationRequestDTO, Long idClient, Long idVoiture) throws IOException;

    void updateRental(ReservationRequestDTO reservationRequestDTO, Long id_client, Long id_voiture,Long id) throws IOException;

    void deleteRental(Long id);
    // boolean checkAvailability(Long voitureId, Date startDate, Date endDate);
}
