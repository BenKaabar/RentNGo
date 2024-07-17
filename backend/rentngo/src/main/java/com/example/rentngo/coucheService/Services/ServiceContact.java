package com.example.rentngo.coucheService.Services;

import java.util.List;

import com.example.rentngo.DAO.entites.Contact;

public interface ServiceContact {
    public Contact addContact(Contact contact);
    public Contact getContactById(Long id);
    public List<Contact> getAllContact();
    public Contact updateContact(Contact contact, Long id);
    public void deleteContactById(Long id);
}