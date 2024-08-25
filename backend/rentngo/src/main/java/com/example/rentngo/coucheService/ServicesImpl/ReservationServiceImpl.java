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
import org.springframework.transaction.annotation.Transactional;

import com.example.rentngo.coucheService.Services.ReservationService;
import com.example.rentngo.coucheWeb.DTO.ReservationRequestDTO;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import java.io.IOException;
import java.util.List;

@Slf4j
@Service
@Transactional
@AllArgsConstructor
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
    public Reservation addRental(ReservationRequestDTO reservationRequestDTO, Long idClient, Long idVoiture)
            throws IOException {
        // Retrieve client and car based on provided IDs
        Client client = clientRepository.findById(idClient).orElse(null);
        Voiture voiture = voitureRepository.findById(idVoiture).orElse(null);
        System.out.println("client " + client + " voiture " + voiture);
        // Check if client and car exist
        if (client != null && voiture != null) {
            // Create new reservation
            Reservation reservation = new Reservation();
            voiture.setEstDisponible(true);
            reservation.setDateDebut(reservationRequestDTO.getDateDebut());
            reservation.setDateFin(reservationRequestDTO.getDateFin());
            reservation.setMessage(reservationRequestDTO.getMessage());
            reservation.setLocalisation(reservationRequestDTO.getLocalisation());
            reservation.setStatus(Status.EN_ATTENTE);
            reservation.setClient(client);
            reservation.setVoiture(voiture);
            reservationRepository.save(reservation);
            log.info("Reservation created successfully.");
            return reservation;
        } else {
            throw new IllegalArgumentException("Client or Car not found.");
        }
    }

    @Override
    public Reservation GetRentalById(Long id) {
        return reservationRepository.findById(id).orElseThrow(() -> new RuntimeException("reservation not found"));
    }

    @Override
    public void updateRental(ReservationRequestDTO rental, Long id_client, Long id_voiture, Long id)
            throws IOException {
        Client client = clientRepository.findById(id_client).orElse(null);
        Voiture voiture = voitureRepository.findById(id_voiture).orElse(null);
        Reservation reservation = reservationRepository.findById(id).orElse(null);

        if (client != null && voiture != null && reservation != null) {
            if (voiture.getEstDisponible()) { // Correction ici
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
                if (rental.getStatus() != null) {
                    reservation.setStatus(rental.getStatus());
                }
                reservation.setClient(client);
                reservation.setVoiture(voiture);

                reservationRepository.save(reservation);
                log.info("Reservation with id: {} updated successfully.", id);
            } else {
                throw new IllegalArgumentException("The car is not available.");
            }
        } else {
            throw new IllegalArgumentException("Client, Car, or Reservation not found.");
        }
    }

    @Override
    public void deleteRental(Long id) {
        try {
            Reservation reservation = reservationRepository.findById(id).orElse(null);
            if (reservation != null) {
                Voiture voiture = voitureRepository.findById(reservation.getVoiture().getId()).orElse(null);
                voiture.setEstDisponible(true);
                voitureRepository.save(voiture);
                reservationRepository.delete(reservation);
                log.info("Deleted reservation with id: {}", id);
            } else {
                log.warn("Attempted to delete a reservation with id: {} that does not exist", id);
            }
        } catch (Exception e) {
            log.error("Error occurred while deleting reservation with id: {}", id, e);
            throw new RuntimeException("Failed to delete reservation", e); // Re-throw or handle accordingly
        }
    }

}