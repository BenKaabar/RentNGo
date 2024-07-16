package com.example.rentngo.DAO.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.rentngo.DAO.entites.Contact;

public interface ContactRepository extends JpaRepository<Contact, Long> {
    Contact getContactById(Long id);
}
