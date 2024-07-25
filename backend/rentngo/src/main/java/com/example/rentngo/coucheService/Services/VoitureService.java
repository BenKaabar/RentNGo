package com.example.rentngo.coucheService.Services;

import com.example.rentngo.DAO.entites.Voiture;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public interface VoitureService {
    List<Voiture> getAllCars();

    void addCar(String voitureRequestDTO, MultipartFile File) throws IOException;

    Voiture findCarById(Long id);

    void updateCar(String voitureRequestDTO, MultipartFile File, Long id) throws IOException;

    void deleteCar(Long id);
}