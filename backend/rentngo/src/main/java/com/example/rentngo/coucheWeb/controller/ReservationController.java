package com.example.rentngo.coucheWeb.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.rentngo.DAO.entites.Reservation;
import com.example.rentngo.coucheService.Services.ReservationService;
import com.example.rentngo.coucheWeb.DTO.ReservationRequestDTO;

import lombok.extern.slf4j.Slf4j;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@CrossOrigin("*")
@RequestMapping(path = "/reservation")
@Slf4j
public class ReservationController {
    @Autowired
    private ReservationService rentalService;

    @GetMapping(path = "/all")
    public ResponseEntity<List<Reservation>> getAllRentals() {
        List<Reservation> reservations = rentalService.getAllRentals();
        return ResponseEntity.ok(reservations);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addRental(
            @RequestParam("idClient") Long idClient,
            @RequestParam("idVoiture") Long idVoiture,
            @RequestBody ReservationRequestDTO reservationRequestDTO) {
        try {
            Reservation reservation = rentalService.addRental(reservationRequestDTO, idClient, idVoiture);
            return ResponseEntity.ok(reservation);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Map<String, String>> updateReservation(
            @PathVariable Long id,
            @RequestBody ReservationRequestDTO reservationRequest,
            @RequestParam Long id_client,
            @RequestParam Long id_voiture) {

        Map<String, String> response = new HashMap<>();
        try {
            rentalService.updateRental(reservationRequest, id_client, id_voiture, id);
            response.put("message", "Reservation updated successfully");
            return ResponseEntity.ok(response);
        } catch (DataIntegrityViolationException e) {
            response.put("message", "Data integrity violation: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } catch (Exception e) {
            response.put("message", "An unexpected error occurred: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @DeleteMapping(path = "/delete/{id}")
    public ResponseEntity<Map<String, String>> deleteRental(@PathVariable Long id) {
        Map<String, String> response = new HashMap<>();
        try {
            rentalService.deleteRental(id);
            response.put("message", "reservation deleted successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("reservation with id {} not found for deletion", id, e);
            response.put("message", "reservation not found with id: " + id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

}
