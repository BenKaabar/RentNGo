package com.example.rentngo.coucheWeb.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.rentngo.DAO.entites.Temoignage;
import com.example.rentngo.coucheService.Services.ServiceTemoignage;
import com.example.rentngo.coucheWeb.DTO.TemoignageRequestDTO;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@CrossOrigin("*")
@RequestMapping(path = "/temoignage")
public class TemoignageController {
    @Autowired
    private ServiceTemoignage serviceTemoignage;

    // Select all Temoignage
    @GetMapping(path = "/all")
    public List<Temoignage> getAllTemoignage() {
        return serviceTemoignage.getAllTemoignage();
    }

    // Select Temoignage by id
    @GetMapping(path = "/ById/{id}")
    public ResponseEntity<?> getById(@PathVariable("id") Long id) {
        try {
            Temoignage temoignage = serviceTemoignage.findTemoignageById(id);
            return ResponseEntity.ok(temoignage);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    // Add Temoignage
    @PostMapping(path = "/add")
    public ResponseEntity<?> addTemoignage(@RequestBody TemoignageRequestDTO temoignageRequestDTO, Long idClient) {
        try {
            serviceTemoignage.addTemoignage(temoignageRequestDTO, idClient);
            return ResponseEntity.ok("Temoignage added successfully");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid request: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }

    // Delete by id
    @DeleteMapping(path = "/delete/{id}")
    public ResponseEntity<?> deleteTemoignageById(@PathVariable Long id) {
        try {
            serviceTemoignage.deleteTemoignage(id);
            return ResponseEntity.ok("Temoignage deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
