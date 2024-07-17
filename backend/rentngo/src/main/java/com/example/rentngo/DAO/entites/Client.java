package com.example.rentngo.DAO.entites;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "clients")
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private String prenom;
    private String email;
    private String motDePasse;
    private Long telephone;
    private String address;
    
    @ManyToOne
    @JoinColumn(name = "id_admin") // nom de column id_admin
    private Admin admin;

    @OneToMany(mappedBy = "client", fetch = FetchType.LAZY)
    private List<Contact> contacts;
    
    @OneToMany(mappedBy = "client", fetch = FetchType.LAZY)
    private List<Temoignage> temoignages;

    @OneToMany(mappedBy = "client", fetch = FetchType.LAZY)
    private List<Reservation> reservations;
}