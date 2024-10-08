package com.example.rentngo.DAO.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.rentngo.DAO.entites.Reservation;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
}