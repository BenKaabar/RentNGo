package com.example.rentngo.DAO.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.rentngo.DAO.entites.Client;

public interface ClientRepository extends JpaRepository<Client,Long>{
    List<Client> findByNom(String nom);
    Client getClientById(Long id);
}