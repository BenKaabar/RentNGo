package com.example.rentngo.coucheWeb.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.rentngo.DAO.entites.Temoignage;
import com.example.rentngo.coucheService.serviceTemoignage.ServiceTemoignage;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@CrossOrigin("*") //Purpose: It allows any domain to make requests to your API. The * wildcard indicates that requests from all origins are permitted.
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
    @GetMapping(path = "/{id}")
    public Temoignage getById(@PathVariable("id") Long id) {
        return serviceTemoignage.getTemoignageById(id);
    }

    // add Temoignage
    @PostMapping(path = "/add")
    public Temoignage addTemoignage(@RequestBody Temoignage temoignage) {
        // Set the current date and time
        temoignage.setDateTemoignage(LocalDateTime.now());
        return serviceTemoignage.addTemoignage(temoignage);
    }


    // delete by id
    @DeleteMapping(path = "/delete/{id}")
    public void deleteTemoignageById(@PathVariable("id") Long id) {
        serviceTemoignage.deleteTemoignageById(id);
    }

}
