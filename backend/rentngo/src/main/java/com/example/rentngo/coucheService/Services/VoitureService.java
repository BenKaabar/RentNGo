package com.example.rentngo.coucheService.Services;

import com.example.rentngo.DAO.entites.Voiture;
import com.example.rentngo.coucheWeb.DTO.VoitureRequestDTO;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public interface VoitureService {
    List<Voiture> getAllCars();

    public void addCar(VoitureRequestDTO voitureRequestDTO, MultipartFile file) throws IOException;

    Voiture findCarById(Long id);

    void updateCar(VoitureRequestDTO voitureRequestDTO, MultipartFile File, Long id) throws IOException;

    void deleteCar(Long id);
}