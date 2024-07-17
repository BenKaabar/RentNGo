package com.example.rentngo.coucheWeb.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.rentngo.DAO.entites.Reservation;
import com.example.rentngo.coucheService.Services.ReservationService;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/reservation")
public class ReservationController {
    @Autowired
    private ReservationService rentalService;

    @GetMapping("/all")
    public List<Reservation> getAllRentals() {
        return rentalService.getAllRentals();
    }

    @PostMapping("/add")
    public Reservation createRental(@RequestBody Reservation rental) {
        return rentalService.addRental(rental);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Reservation> updateRental(@PathVariable(value = "id") Long rentalId, @RequestBody Reservation rentalDetails) {
        Reservation updatedRental = rentalService.updateRental(rentalId, rentalDetails);
        return ResponseEntity.ok(updatedRental);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteRental(@PathVariable(value = "id") Long rentalId) {
        rentalService.deleteRental(rentalId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/checkAvailability/{id}")
    public ResponseEntity<Boolean> checkAvailability(@PathVariable(value = "id") @RequestParam Long voitureId, @RequestParam Date startDate, @RequestParam Date endDate) {
        boolean isAvailable = rentalService.checkAvailability(voitureId, startDate, endDate);
        return ResponseEntity.ok(isAvailable);
    }
}
