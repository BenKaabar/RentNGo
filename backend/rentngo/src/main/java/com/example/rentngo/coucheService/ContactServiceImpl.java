package com.example.rentngo.coucheService;
import com.example.rentngo.coucheService.Services.ContactService;

import com.example.rentngo.DAO.entites.Contact;
import com.example.rentngo.DAO.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactServiceImpl implements ContactService {
    @Autowired
    private ContactRepository contactRepository;

    @Override
    public List<Contact> getAllContacts() {
        return contactRepository.findAll();
    }

    @Override
    public Contact addContact(Contact contact) {
        return contactRepository.save(contact);
    }

    @Override
    public Contact updateContact(Long id, Contact contactDetails) {
        Contact contact = contactRepository.findById(id).orElseThrow();
        contact.setEmail(contactDetails.getEmail());
        contact.setMessage(contactDetails.getMessage());
        return contactRepository.save(contact);
    }

    @Override
    public void deleteContact(Long id) {
        Contact contact = contactRepository.findById(id).orElseThrow();
        contactRepository.delete(contact);
    }
}
