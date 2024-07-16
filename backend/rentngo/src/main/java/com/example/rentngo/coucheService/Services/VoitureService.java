package com.example.rentngo.coucheService.Services;

import com.example.rentngo.DAO.entites.Voiture;

import java.util.List;

public interface VoitureService {
    List<Voiture> getAllCars();
    Voiture addCar(Voiture car);
    Voiture updateCar(Long id, Voiture carDetails);
    void deleteCar(Long id);
}

