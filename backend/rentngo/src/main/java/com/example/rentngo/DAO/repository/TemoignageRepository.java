package com.example.rentngo.DAO.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.rentngo.DAO.entites.Temoignage;

public interface TemoignageRepository extends JpaRepository<Temoignage, Long>{

    // Temoignage getTemoignageById(Long id);

}