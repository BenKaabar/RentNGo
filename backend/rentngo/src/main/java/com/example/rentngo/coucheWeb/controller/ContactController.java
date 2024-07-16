package com.example.rentngo.coucheWeb.controller;

import com.example.rentngo.DAO.entites.Contact;
import com.example.rentngo.coucheService.Services.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/contacts")
public class ContactController {

    @Autowired
    private ContactService contactService;

    @GetMapping
    public List<Contact> getAllContacts() {
        return contactService.getAllContacts();
    }

    @PostMapping
    public Contact createContact(@RequestBody Contact contact) {
        return contactService.addContact(contact);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Contact> updateContact(@PathVariable(value = "id") Long contactId, @RequestBody Contact contactDetails) {
        Contact updatedContact = contactService.updateContact(contactId, contactDetails);
        return ResponseEntity.ok(updatedContact);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContact(@PathVariable(value = "id") Long contactId) {
        contactService.deleteContact(contactId);
        return ResponseEntity.noContent().build();
    }
}
