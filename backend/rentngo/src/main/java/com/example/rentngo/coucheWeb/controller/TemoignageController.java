package com.example.rentngo.coucheWeb.controller;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.rentngo.DAO.entites.Temoignage;
import com.example.rentngo.coucheService.Services.ServiceTemoignage;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@CrossOrigin("*") // Purpose: It allows any domain to make requests to your API. The * wildcard
                  // indicates that requests from all origins are permitted.
@RequestMapping(path = "/temoignage")
public class TemoignageController {
    @Autowired
    private ServiceTemoignage serviceTemoignage;

    // select all Temoignage
    @GetMapping(path = "/all")
    public List<Temoignage> getAllTemoignage() {
        return serviceTemoignage.getAllTemoignage();
    }

    // select Temoignage by id
    @GetMapping(path = "/ById/{id}")
    public Temoignage getById(@PathVariable("id") Long id) {
        return serviceTemoignage.findTemoignageById(id);
    }

    // add Temoignage
    @PostMapping(path = "/add")
    public ResponseEntity<?> addTemoignage(@RequestParam("TemoignageRequestDTO") String temoignageRequestDTO) throws IOException {
        try {
            serviceTemoignage.addTemoignage(temoignageRequestDTO);
            return ResponseEntity.ok("temoignage added successfully");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid request");
        }
    }

    // delete by id
    @DeleteMapping(path = "/delete/{id}")
    public void deleteTemoignageById(@RequestParam Long id) {
        serviceTemoignage.deleteTemoignage(id);
    }

}
