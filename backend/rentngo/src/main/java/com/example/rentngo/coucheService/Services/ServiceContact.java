package com.example.rentngo.coucheService.Services;

import java.io.IOException;
import java.util.List;

import com.example.rentngo.DAO.entites.Contact;
import com.example.rentngo.coucheWeb.DTO.ContactRequestDTO;

public interface ServiceContact {
    Contact addContact(ContactRequestDTO contactRequestDTO, Long id_client) throws IOException;

    Contact getContactById(Long id);

    List<Contact> getAllContact();

    Contact updateContact(ContactRequestDTO contactRequestDTO, Long id, Long id_client) throws IOException;

    void deleteContact(Long id);
}