package com.example.rentngo.coucheService;

import com.example.rentngo.DAO.entites.Reservation;
import com.example.rentngo.DAO.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.rentngo.coucheService.Services.ReservationService;
import java.util.Date;
import java.util.List;

@Service
public class ReservationServiceImpl implements ReservationService {
    @Autowired
    private ReservationRepository reservationRepository;

    @Override
    public List<Reservation> getAllRentals() {
        return reservationRepository.findAll();
    }

    @Override
    public Reservation addRental(Reservation rental) {
        return reservationRepository.save(rental);
    }

    @Override
    public Reservation updateRental(Long id, Reservation rentalDetails) {
        Reservation rental = reservationRepository.findById(id).orElseThrow();
        rental.setVoiture(rentalDetails.getVoiture());
        rental.setDateDebut(rentalDetails.getDateDebut());
        rental.setDateFin(rentalDetails.getDateFin());
        return reservationRepository.save(rental);
    }

    @Override
    public void deleteRental(Long id) {
        Reservation rental = reservationRepository.findById(id).orElseThrow();
        reservationRepository.delete(rental);
    }

    @Override
    public boolean checkAvailability(Long voitureId, Date startDate, Date endDate) {
        List<Reservation> rentals = reservationRepository.findAllByVoitureIdAndDateFinAfterAndDateDebutBefore(voitureId, startDate, endDate);
        return rentals.isEmpty();
    }
}
