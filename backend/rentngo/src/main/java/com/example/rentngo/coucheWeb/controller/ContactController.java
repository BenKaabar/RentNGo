package com.example.rentngo.coucheWeb.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.rentngo.DAO.entites.Contact;
import com.example.rentngo.coucheService.Services.ServiceContact;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@CrossOrigin("*") // Purpose: It allows any domain to make requests to your API. The * wildcard
                  // indicates that requests from all origins are permitted.
@RequestMapping(path = "/contact")
public class ContactController {
    @Autowired
    private ServiceContact serviceContact;

    // select all Contact
    @GetMapping(path = "/all")
    public List<Contact> getAllContact() {
        return serviceContact.getAllContact();
    }

    // select Contact by id
    @GetMapping(path = "/{id}")
    public Contact getContactById(@PathVariable("id") Long id) {
        return serviceContact.getContactById(id);
    }

    // add Contact
    @PostMapping(path = "/add")
    public ResponseEntity<?> addContact(@RequestParam("ContactRequestDTO") String contactRequestDTO)
            throws IOException {
        try {
            serviceContact.addContact(contactRequestDTO);
            return ResponseEntity.ok("Contact added successfully");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid request");
        }
    }

    // update Contact
    @PutMapping(path = "/update/{id}")
    public ResponseEntity<?> updateContact(@RequestBody String contactRequestDTO) throws IOException {
        try {
            serviceContact.updateContact(contactRequestDTO);
            return ResponseEntity.ok("Contact updated successfully");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid request");
        }
    }

    // delete by id
    @DeleteMapping(path = "/delete/{id}")
    public void deleteContact(@RequestParam Long id) {
        serviceContact.deleteContact(id);
    }

}
