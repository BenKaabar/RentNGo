package com.example.rentngo.DAO.entites;

import java.util.List;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
    // @JoinColumn(name = "idAdmin")
    // private Admin admin;
    @OneToMany(mappedBy = "client", fetch = FetchType.LAZY)
    private List<Contact> contacts;
    @OneToMany(mappedBy = "client", fetch = FetchType.LAZY)
    private List<Temoignage> temoignages;
    // @OneToMany(mappedBy = "client", fetch = FetchType.LAZY)
    // private List<Reservation> reservations;
}

// {
// "nom": "Doe",
// "prenom": "John",
// "email": "john.doe@example.com",
// "motDePasse": "password123",
// "telephone": 1234567890,
// "address": "123 Main Street",
// "contacts": [
// {
// "email": "contact1@example.com",
// "message": "First contact message"
// },
// {
// "email": "contact2@example.com",
// "message": "Second contact message"
// }
// ]
// }
