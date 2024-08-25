package com.example.rentngo.DAO.entites;

import com.example.rentngo.DAO.enums.Status;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String dateDebut;
    private String dateFin;
    private String message;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;
    private String localisation;

    @OneToOne
    @JoinColumn(name = "id_voiture")
    @JsonManagedReference // Forward part of the relationship
    private Voiture voiture;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_client")
    private Client client;

}
