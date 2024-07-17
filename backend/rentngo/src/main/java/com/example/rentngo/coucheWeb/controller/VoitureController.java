package com.example.rentngo.coucheWeb.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.rentngo.DAO.entites.Voiture;
import com.example.rentngo.coucheService.Services.VoitureService;

import java.util.List;

@RestController
@RequestMapping("voiture")
public class VoitureController {
    @Autowired
    private VoitureService carService;

    @GetMapping("/all")
    public List<Voiture> getAllCars() {
        return carService.getAllCars();
    }

    @PostMapping("/add")
    public Voiture createCar(@RequestBody Voiture car) {
        return carService.addCar(car);
    }

    @PutMapping("/voitures/{id}")
    public ResponseEntity<Voiture> updateCar(@PathVariable(value = "id") Long id, @RequestBody Voiture carDetails) {
        Voiture updatedCar = carService.updateCar(id, carDetails);
        return ResponseEntity.ok(updatedCar);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteCar(@PathVariable(value = "id") Long id) {
        carService.deleteCar(id);
        return ResponseEntity.noContent().build();
    }
}

