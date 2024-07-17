package com.example.rentngo.coucheService.Services;


import com.example.rentngo.DAO.entites.Reservation;

import java.util.Date;
import java.util.List;

public interface ReservationService {
    List<Reservation> getAllRentals();
    Reservation addRental(Reservation rental);
    Reservation updateRental(Long id, Reservation rentalDetails);
    void deleteRental(Long id);
    boolean checkAvailability(Long voitureId, Date startDate, Date endDate);
}

