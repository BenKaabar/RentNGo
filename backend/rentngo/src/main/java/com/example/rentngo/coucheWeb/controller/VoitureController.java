package com.example.rentngo.coucheWeb.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.rentngo.DAO.entites.Voiture;
import com.example.rentngo.coucheService.Services.VoitureService;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("voiture")
@CrossOrigin("*")
public class VoitureController {
    @Autowired
    private VoitureService carService;

    @GetMapping(path = "/ById/{id}")
    public ResponseEntity<Voiture> findCarById(@PathVariable Long id) {
        try {
            Voiture voiture = carService.findCarById(id);
            return ResponseEntity.ok(voiture);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/all")
    public List<Voiture> getAllCars() {
        return carService.getAllCars();
    }

    @PostMapping("/add")
    public ResponseEntity<String> addCar(@RequestPart String voitureRequestDTO,
                                         @RequestPart("logo") MultipartFile file) {
        try {
            carService.addCar(voitureRequestDTO, file);
            return ResponseEntity.ok("Voiture added successfully");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid request: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateCar(@PathVariable Long id,
                                            @RequestPart String voitureRequestDTO,
                                            @RequestPart("logo") MultipartFile file) {
        try {
            carService.updateCar(voitureRequestDTO, file, id);
            return ResponseEntity.ok("Voiture updated successfully");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid request: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }

    @DeleteMapping(path = "/delete/{id}")
    public ResponseEntity<String> deleteCar(@PathVariable Long id) {
        try {
            carService.deleteCar(id);
            return ResponseEntity.ok("Voiture deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Voiture not found with id: " + id);
        }
    }
}
