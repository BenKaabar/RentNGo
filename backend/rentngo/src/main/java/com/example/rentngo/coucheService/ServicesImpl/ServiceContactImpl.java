package com.example.rentngo.coucheService.ServicesImpl;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.rentngo.DAO.entites.Client;
import com.example.rentngo.DAO.entites.Contact;
import com.example.rentngo.DAO.repository.ClientRepository;
import com.example.rentngo.DAO.repository.ContactRepository;
import com.example.rentngo.coucheService.Services.ServiceContact;
import com.example.rentngo.coucheWeb.DTO.ClientRequestDTO;
import com.example.rentngo.coucheWeb.DTO.ContactRequestDTO;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@AllArgsConstructor
@Service
@Transactional
@Slf4j
public class ServiceContactImpl implements ServiceContact {
    @Autowired
    private ContactRepository contactRepository;
    @Autowired
    private ClientRepository clientRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void addContact(String dto, Long idClient) throws IOException {
        Client client = clientRepository.findById(idClient).orElse(null);
        ContactRequestDTO contactRequestDTO1 = objectMapper.readValue(dto, ContactRequestDTO.class);
        if (client != null) {
            Contact contact = new Contact();
            contact.setEmail(contactRequestDTO1.getEmail());
            contact.setMessage(contactRequestDTO1.getMessage());
            contact.setClient(client);
            contactRepository.save(contact);
            log.info("Added new contact to client id {} ----------------------", idClient);
        } else {
            log.warn("Attempted to add a contact failed--------------------");
        }
    }

    @Override
    public Contact getContactById(Long id) {
        return contactRepository.findById(id).orElseThrow(() -> new RuntimeException("Contact not found"));
    }

    @Override
    public List<Contact> getAllContact() {
        return contactRepository.findAll();
    }

    @Override
    public void updateContact(String dto, Long id, Long idClient) throws IOException {
        Contact contact = contactRepository.findById(id).orElse(null);
        Client client = clientRepository.findById(idClient).orElse(null);
        ContactRequestDTO contactRequestDTO1 = objectMapper.readValue(dto, ContactRequestDTO.class);
        if (client != null && contact != null) {
            if (contactRequestDTO1.getEmail() != null) {
                contact.setEmail(contactRequestDTO1.getEmail());
            }
            if (contactRequestDTO1.getMessage() != null) {
                contact.setMessage(contactRequestDTO1.getMessage());
            }
            contact.setClient(client);
            contactRepository.save(contact);
            log.info("update contact with id: {} done!-------------------------", id);
        } else {
            log.warn("Attempted to update a contact with id: {} that does not exist-----------------------", id);
        }
    }

    @Override
    public void deleteContact(Long id) {
        Contact contact = contactRepository.findById(id).orElse(null);
        if (contact != null) {
            contactRepository.delete(contact);
            log.info("Deleted contact with id: {}---------------------------", id);
        } else {
            log.warn("Attempted to delete a contact with id: {} that does not exist----------------------", id);
        }
    }
}
