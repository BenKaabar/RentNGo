package com.example.rentngo.coucheWeb.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.rentngo.DAO.entites.Voiture;
import com.example.rentngo.coucheService.Services.VoitureService;
import com.example.rentngo.coucheWeb.DTO.VoitureRequestDTO;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@AllArgsConstructor
@RestController
@RequestMapping("voiture")
@CrossOrigin("*")
@Slf4j
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
    public ResponseEntity<String> addCar(@RequestParam("voitureDTO") String voitureDTOJson,
            @RequestParam("photoVoiture") MultipartFile photoVoiture) {
        try {
            // Convertir le JSON en VoitureRequestDTO
            VoitureRequestDTO voitureDTO = new ObjectMapper().readValue(voitureDTOJson, VoitureRequestDTO.class);

            // // Log the voitureDTO string
            // log.info("Received voitureDTO: *****************************\"" +
            // voitureDTO);

            // // Log the image information
            // log.info("Image file name: *****************************" +
            // photoVoiture.getOriginalFilename());
            // log.info("Image file size: *****************************\"" +
            // photoVoiture.getSize());

            // // Save the uploaded image file to the "upload-dir" directory
            // String fileName = photoVoiture.getOriginalFilename();
            // Path path = Paths.get("upload-dir/" + fileName);

            // // Ensure the directory exists
            // if (!Files.exists(path.getParent())) {
            // Files.createDirectories(path.getParent()); // Create the directory if it
            // doesn't exist
            // }

            // // Write the image file to the specified directory
            // Files.write(path, photoVoiture.getBytes());

            // // Log file save success
            // log.info("Image file saved: *****************************\"" + fileName);

            // Ajouter la voiture en base de données
            carService.addCar(voitureDTO, photoVoiture);

            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur lors de l'ajout de la voiture");
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateCar(@RequestParam("voitureDTO") String voitureDTOJson,
            @RequestParam("photoVoiture") MultipartFile photoVoiture,
            @PathVariable Long id) {
        try {
            // Convertir le JSON en VoitureRequestDTO
            VoitureRequestDTO voitureDTO = new ObjectMapper().readValue(voitureDTOJson, VoitureRequestDTO.class);

            carService.updateCar(voitureDTO, photoVoiture, id);
            return ResponseEntity.ok("Voiture updated successfully");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid request: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating car: " + e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteCar(@PathVariable Long id) {
        try {
            carService.deleteCar(id);
            return ResponseEntity.ok("Voiture deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error deleting car: " + e.getMessage());
        }
    }
}
