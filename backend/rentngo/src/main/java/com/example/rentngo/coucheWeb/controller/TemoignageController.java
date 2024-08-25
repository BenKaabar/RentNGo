package com.example.rentngo.coucheWeb.controller;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.rentngo.DAO.entites.Temoignage;
import com.example.rentngo.coucheService.Services.ServiceTemoignage;
import com.example.rentngo.coucheWeb.DTO.TemoignageRequestDTO;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/temoignage")
public class TemoignageController {

    @Autowired
    private ServiceTemoignage serviceTemoignage;

    @GetMapping(path = "/all")
    public ResponseEntity<List<Temoignage>> getAllTemoignages() {
        log.info("Request received to get all temoignages");
        List<Temoignage> temoignages = serviceTemoignage.getAllTemoignage();
        return ResponseEntity.ok(temoignages);
    }

    @GetMapping(path = "/ById/{id}")
    public ResponseEntity<?> getById(@PathVariable("id") Long id) {
        try {
            Temoignage temoignage = serviceTemoignage.findTemoignageById(id);
            return ResponseEntity.ok(temoignage);
        } catch (RuntimeException e) {
            log.error("Temoignage with id {} not found", id, e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PostMapping(path = "/add")
    public ResponseEntity<Map<String, String>> addTemoignage(
            @RequestParam Long idClient,
            @RequestBody TemoignageRequestDTO temoignageRequestDTO) {
        try {
            Temoignage temoignage = serviceTemoignage.addTemoignage(temoignageRequestDTO, idClient);
            if (temoignage != null) {
                return ResponseEntity.ok(Collections.singletonMap("message", "Client added successfully"));

            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } catch (Exception e) {
            log.error("Error adding temoignage", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, String>> deleteTemoignage(@PathVariable Long id) {
        try {
            serviceTemoignage.deleteTemoignage(id);
            return ResponseEntity.ok(Collections.singletonMap("message", "Client deleted successfully"));
        } catch (Exception e) {
            log.error("Error deleting temoignage", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonMap("error", "Failed to delete client"));
        }
    }
    

}
