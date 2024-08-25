package com.example.rentngo.coucheWeb.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.rentngo.DAO.entites.Contact;
import com.example.rentngo.coucheService.Services.ServiceContact;
import com.example.rentngo.coucheWeb.DTO.ContactRequestDTO;

import lombok.extern.slf4j.Slf4j;
import lombok.AllArgsConstructor;

@AllArgsConstructor
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
    public ResponseEntity<Contact> addContact(@RequestBody ContactRequestDTO contactRequestDTO,
            @RequestParam Long idClient) {
        try {
            Contact contact = serviceContact.addContact(contactRequestDTO, idClient);
            return ResponseEntity.ok(contact);
        } catch (IOException e) {
            log.error("Error adding contact: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        } catch (Exception e) {
            log.error("Unexpected error occurred while adding contact: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .build();
        }
    }

    // Update Contact
    @PutMapping(path = "/update/{id}")
    public ResponseEntity<Contact> updateContact(
            @PathVariable Long id,
            @RequestBody ContactRequestDTO contactRequestDTO,
            @RequestParam Long idClient) {
        try {
            Contact contact = serviceContact.updateContact(contactRequestDTO, id, idClient);
            return ResponseEntity.ok(contact);
        } catch (IOException e) {
            log.error("Error updating contact with id {}: {}", id, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .build();
        } catch (Exception e) {
            log.error("Unexpected error occurred while updating contact with id {}: {}", id, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .build();
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
