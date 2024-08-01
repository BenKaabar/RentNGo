package com.example.rentngo.coucheWeb.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.rentngo.DAO.entites.Contact;
import com.example.rentngo.coucheService.Services.ServiceContact;

import lombok.extern.slf4j.Slf4j;

@RestController
@CrossOrigin("*")
@RequestMapping(path = "/contact")
@Slf4j
public class ContactController {
    @Autowired
    private ServiceContact serviceContact;

    // Select all Contacts
    @GetMapping(path = "/all")
    public ResponseEntity<List<Contact>> getAllContact() {
        List<Contact> contacts = serviceContact.getAllContact();
        return ResponseEntity.ok(contacts);
    }

    // Select Contact by id
    @GetMapping(path = "/by/{id}")
    public ResponseEntity<Contact> getContactById(@PathVariable("id") Long id) {
        try {
            Contact contact = serviceContact.getContactById(id);
            return ResponseEntity.ok(contact);
        } catch (Exception e) {
            log.error("Contact with id {} not found", id, e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // Add Contact
    @PostMapping(path = "/add")
    public ResponseEntity<String> addContact(@RequestBody String contactRequestDTO, Long idClient) {
        try {
            serviceContact.addContact(contactRequestDTO, idClient);
            return ResponseEntity.ok("Contact added successfully");
        } catch (IOException e) {
            log.error("Error adding contact: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid request: " + e.getMessage());
        } catch (Exception e) {
            log.error("Unexpected error occurred while adding contact: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }

    // Update Contact
    @PutMapping(path = "/update/{id}")
    public ResponseEntity<String> updateContact(@PathVariable Long id,
            @RequestBody String contactRequestDTO, Long idClient) {
        try {
            serviceContact.updateContact(contactRequestDTO, id, idClient);
            return ResponseEntity.ok("Contact updated successfully");
        } catch (IOException e) {
            log.error("Error updating contact with id {}: {}", id, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid request: " + e.getMessage());
        } catch (Exception e) {
            log.error("Unexpected error occurred while updating contact with id {}: {}", id, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }

    // Delete Contact by id
    @DeleteMapping(path = "/delete/{id}")
    public ResponseEntity<String> deleteContact(@PathVariable Long id) {
        try {
            serviceContact.deleteContact(id);
            return ResponseEntity.ok("Contact deleted successfully");
        } catch (Exception e) {
            log.error("Contact with id {} not found for deletion", id, e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Contact not found with id: " + id);
        }
    }
}
