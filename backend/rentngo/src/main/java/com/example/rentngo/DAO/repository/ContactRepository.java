package com.example.rentngo.DAO.repository;
import com.example.rentngo.DAO.entites.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {
}
