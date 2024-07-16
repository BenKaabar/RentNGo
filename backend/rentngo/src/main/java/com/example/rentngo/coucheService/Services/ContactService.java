package com.example.rentngo.coucheService.Services;


import com.example.rentngo.DAO.entites.Contact;

import java.util.List;

public interface ContactService {
    List<Contact> getAllContacts();
    Contact addContact(Contact contact);
    Contact updateContact(Long id, Contact contactDetails);
    void deleteContact(Long id);
}
