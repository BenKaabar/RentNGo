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
import com.example.rentngo.coucheWeb.DTO.ContactRequestDTO;

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

    @Override
    public void addContact(ContactRequestDTO contactRequestDTO, Long idClient) throws IOException {
        Client client = clientRepository.findById(contactRequestDTO.getIdClient()).orElse(null);
        if (client != null) {
            Contact contact = new Contact();
            contact.setEmail(contactRequestDTO.getEmail());
            contact.setMessage(contactRequestDTO.getMessage());
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
    public void updateContact(ContactRequestDTO contactRequestDTO, Long id, Long idClient) throws IOException {
        Contact contact = contactRepository.findById(id).orElse(null);
        Client client = clientRepository.findById(contactRequestDTO.getIdClient()).orElse(null);
        if (client != null && contact != null) {
            if (contactRequestDTO.getEmail() != null) {
                contact.setEmail(contactRequestDTO.getEmail());
            }
            if (contactRequestDTO.getMessage() != null) {
                contact.setMessage(contactRequestDTO.getMessage());
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
