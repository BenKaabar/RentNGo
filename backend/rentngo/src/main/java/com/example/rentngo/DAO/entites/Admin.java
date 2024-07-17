package com.example.rentngo.DAO.entites;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String motdepasse;

    @OneToMany(mappedBy = "admin", fetch = FetchType.LAZY)
    private List<Contact> contacts;

    @OneToMany(mappedBy = "admin", fetch = FetchType.LAZY) // clé premier de table admin "idadmin"
    private List<Client> client;

    @OneToMany(mappedBy = "admin", fetch = FetchType.LAZY)
    private List<Temoignage> temoignages;

    @OneToMany(mappedBy = "admin", fetch = FetchType.LAZY)
    private List<Voiture> voiture;

    @OneToMany(mappedBy = "admin", fetch = FetchType.LAZY)
    private List<Reservation> reservation;
}