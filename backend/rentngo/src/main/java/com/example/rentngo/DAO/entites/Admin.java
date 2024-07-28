package com.example.rentngo.DAO.entites;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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

    // @OneToMany(mappedBy = "admin", fetch = FetchType.LAZY)
    // private List<Contact> contacts;

    // @OneToMany(mappedBy = "admin")
    // private List<Client> clients;

    // @OneToMany(mappedBy = "admin", fetch = FetchType.LAZY)
    // private List<Temoignage> temoignages;

    // @OneToMany(mappedBy = "admin", fetch = FetchType.LAZY)
    // private List<Voiture> voiture;

    // @OneToMany(mappedBy = "admin", fetch = FetchType.LAZY)
    // private List<Reservation> reservation;
}