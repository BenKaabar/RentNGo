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
    public Voiture findCarById(@RequestParam Long id) {
        return carService.findCarById(id);
    }

    @GetMapping("/all")
    public List<Voiture> getAllCars() {
        return carService.getAllCars();
    }

    @PostMapping("/add")
    public ResponseEntity<?> addCar(@RequestParam("VoitureRequestDTO") String voitureRequestDTO,
            @RequestParam("logo") MultipartFile file) throws IOException {
        try {
            carService.addCar(voitureRequestDTO, file);
            return ResponseEntity.ok("Voiture added successfully");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid request");
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateCar(@RequestBody String voitureRequestDTO, Long id,
            MultipartFile file) throws IOException {
        try {
            carService.updateCar(voitureRequestDTO, file);
            return ResponseEntity.ok("voiture updated successfully");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid request");
        }
    }

    @DeleteMapping(path = "/delete/{id}")
    public void deleteCar(@RequestParam Long id) {
        carService.deleteCar(id);

    }
}
