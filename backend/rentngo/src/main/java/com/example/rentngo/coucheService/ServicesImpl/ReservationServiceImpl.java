package com.example.rentngo.coucheService.ServicesImpl;

import com.example.rentngo.DAO.entites.Client;
import com.example.rentngo.DAO.entites.Reservation;
import com.example.rentngo.DAO.entites.Voiture;
import com.example.rentngo.DAO.enums.Status;
import com.example.rentngo.DAO.repository.ClientRepository;
import com.example.rentngo.DAO.repository.ReservationRepository;
import com.example.rentngo.DAO.repository.VoitureRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.rentngo.coucheService.Services.ReservationService;
import com.example.rentngo.coucheWeb.DTO.ReservationRequestDTO;
import lombok.extern.slf4j.Slf4j;
import java.io.IOException;
import java.util.List;

@Slf4j
@Service
public class ReservationServiceImpl implements ReservationService {
    @Autowired
    private ReservationRepository reservationRepository;
    @Autowired
    private VoitureRepository voitureRepository;
    @Autowired
    private ClientRepository clientRepository;

    @Override
    public List<Reservation> getAllRentals() {
        return reservationRepository.findAll();
    }

    @Override
    public void addRental(ReservationRequestDTO rental, Long idClient, Long idVoiture) throws IOException {
        Client client = clientRepository.findById(rental.getIdClient()).orElse(null);
        Voiture voiture = voitureRepository.findById(rental.getIdVoiture()).orElse(null);

        if (client != null && voiture != null && voiture.getEstDisponible() == true) {
            voiture.setEstDisponible(false);
            Reservation reservation = new Reservation();
            reservation.setClient(client);
            reservation.setVoiture(voiture);
            reservation.setDateDebut(rental.getDateDebut());
            reservation.setDateFin(rental.getDateFin());
            reservation.setMessage(rental.getMessage());
            reservation.setStatus(Status.EN_ATTENTE);
            reservation.setLocalisation(rental.getLocalisation());
            reservationRepository.save(reservation);
            log.info("reservation added successfully");
        } else {
            log.warn("Attempted to add a reservation failed");
        }
    }

    @Override
    public Reservation GetRentalById(Long id) {
        return reservationRepository.findById(id).orElseThrow(() -> new RuntimeException("reservation not found"));
    }

    @Override
    public void updateRental(ReservationRequestDTO rental, Long id_client, Long id_voiture,
            Long id) throws IOException {
        Client client = clientRepository.findById(rental.getIdClient()).orElse(null);
        Voiture voiture = voitureRepository.findById(rental.getIdVoiture()).orElse(null);
        Reservation reservation = reservationRepository.findById(id).orElse(null);
        if (client != null && voiture != null && voiture.getEstDisponible() == false && reservation != null) {
            if (rental.getDateDebut() != null) {
                reservation.setDateDebut(rental.getDateDebut());
            }
            if (rental.getDateFin() != null) {
                reservation.setDateFin(rental.getDateFin());
            }
            if (rental.getMessage() != null) {
                reservation.setMessage(rental.getMessage());
            }
            if (rental.getLocalisation() != null) {
                reservation.setLocalisation(rental.getLocalisation());
            }
            reservationRepository.save(reservation);
            log.info("update reservation with id: {} done!--------------------", id);
        } else {
            log.warn("Attempted to update a reservation with id: {} that does not exist----------------------", id);
        }
    }

    @Override
    public void deleteRental(Long id) {
        Reservation reservation = reservationRepository.findById(id).orElse(null);
        if (reservation != null) {
            reservationRepository.delete(reservation);
            log.info("Deleted reservation with id: {}---------------------------", id);
        } else {
            log.warn("Attempted to delete a reservation with id: {} that does not exist----------------------", id);
        }
    }
}