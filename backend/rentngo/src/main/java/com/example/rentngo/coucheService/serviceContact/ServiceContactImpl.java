package com.example.rentngo.coucheService.serviceContact;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.rentngo.DAO.entites.Contact;
import com.example.rentngo.DAO.repository.ContactRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
@Transactional
public class ServiceContactImpl implements ServiceContact {
    final ContactRepository contactRepository;

    @Override
    public Contact addContact(Contact contact) {
        if (contact == null) {
            return null;
        }
        return this.contactRepository.save(contact);
    }

    @Override
    public Contact getContactById(Long id) {
        if (id == null) {
            return null;
        }
        return this.contactRepository.getContactById(id);
    }

    @Override
    public List<Contact> getAllContact() {
        return this.contactRepository.findAll();
    }

    @Override
    public Contact updateContact(Contact contact, Long id) {
        Contact existingContact = contactRepository.findById(id).orElse(null);
        if (existingContact == null) {
            return null;
        }

        existingContact.setEmail(contact.getEmail());
        existingContact.setMessage(contact.getMessage());

        return contactRepository.save(existingContact);
    }

    @Override
    public void deleteContactById(Long id) {
        if (id == null) {
            return;
        } else {
            this.contactRepository.deleteById(id);
        }
    }

}
