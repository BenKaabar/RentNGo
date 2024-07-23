package com.example.rentngo.coucheService.Services;

import java.io.IOException;
import java.util.List;

import com.example.rentngo.DAO.entites.Contact;

public interface ServiceContact {
    void addContact(String contactRequestDTO) throws IOException;

    Contact getContactById(Long id);

    List<Contact> getAllContact();

    void updateContact(String contactRequestDTO) throws IOException;

    void deleteContact(Long id);
}