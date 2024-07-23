package com.example.rentngo.coucheService.ServicesImpl;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.rentngo.DAO.entites.Contact;
import com.example.rentngo.DAO.repository.ContactRepository;
import com.example.rentngo.coucheService.Services.ServiceContact;
import com.example.rentngo.coucheWeb.DTO.ContactRequestDTO;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
@Transactional
public class ServiceContactImpl implements ServiceContact {
    @Autowired
    private ContactRepository contactRepository;

    @Override
    public void addContact(String contactRequestDTO) throws IOException {
        ContactRequestDTO contactRequestDTO1 = new ObjectMapper().readValue(contactRequestDTO,
                ContactRequestDTO.class);
        Contact contact = new Contact();
        contact.setEmail(contactRequestDTO1.getEmail());
        contact.setMessage(contactRequestDTO1.getMessage());
        contactRepository.save(contact);
    }

    @Override
    public Contact getContactById(Long id) {
        return contactRepository.findById(id).get();
    }

    @Override
    public List<Contact> getAllContact() {
        return contactRepository.findAll();
    }

    @Override
    public void updateContact(String contactRequestDTO) throws IOException {
        ContactRequestDTO contactRequestDTO1 = new ObjectMapper().readValue(contactRequestDTO,
                ContactRequestDTO.class);
        Contact contact = new Contact();
        if (contactRequestDTO1.getEmail() != "") {
            contact.setEmail(contactRequestDTO1.getEmail());
        }
        if (contactRequestDTO1.getMessage() != "") {
            contact.setMessage(contactRequestDTO1.getMessage());
        }
    }

    @Override
    public void deleteContact(Long id) {
        Contact contact = contactRepository.findById(id).get();
        contactRepository.delete(contact);
    }

}
