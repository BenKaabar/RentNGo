package com.example.rentngo.coucheWeb.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.rentngo.DAO.entites.Reservation;
import com.example.rentngo.coucheService.Services.ReservationService;
import com.example.rentngo.coucheWeb.DTO.ReservationRequestDTO;

import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/reservation")
@Slf4j
public class ReservationController {
    @Autowired
    private ReservationService rentalService;

    @GetMapping("/all")
    public ResponseEntity<List<Reservation>> getAllRentals() {
        List<Reservation> reservations = rentalService.getAllRentals();
        return ResponseEntity.ok(reservations);
    }

    @PostMapping("/add")
    public ResponseEntity<?> createRental(@RequestBody ReservationRequestDTO rental, Long idClient, Long idVoiture)
            throws IOException {
        try {
            rentalService.addRental(rental, idClient, idVoiture);
            return ResponseEntity.ok("reservation added successfully");
        } catch (IOException e) {
            log.error("Error adding reservation: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid request: " + e.getMessage());
        } catch (Exception e) {
            log.error("Unexpected error occurred while adding reservation: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateRental(@PathVariable Long id, ReservationRequestDTO rental, Long idClient,
            Long idVoiture)
            throws IOException {
        try {
            rentalService.updateRental(rental, idClient, idVoiture, id);
            return ResponseEntity.ok("reservation update successfully");
        } catch (IOException e) {
            log.error("Error updated reservation: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid request: " + e.getMessage());
        } catch (Exception e) {
            log.error("Unexpected error occurred while updated reservation: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteRental(@PathVariable Long rentalId) {
        try {
            rentalService.deleteRental(rentalId);
            return ResponseEntity.ok("reservation deleted successfully");
        } catch (Exception e) {
            log.error("reservation with id {} not found for deletion", rentalId, e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("reservation not found with id: " + rentalId);
        }
    }
}
