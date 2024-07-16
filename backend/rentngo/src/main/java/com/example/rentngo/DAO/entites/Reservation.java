package com.example.rentngo.DAO.entites;

import java.util.Date;
import com.example.rentngo.DAO.enums.Status;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Voiture voiture;

    // @ManyToOne
    // private Client client;

    @Temporal(TemporalType.DATE)
    private Date dateDebut;

    @Temporal(TemporalType.DATE)
    private Date dateFin;
    private String message;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status = Status.EN_ATTENTE;  // Valeur par défaut
/* 
    private String typeGarantie;
    private double fraisLocation;
    private String modePaiement;
    private double montantGarantie;
 */
    // Getters et Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Voiture getVoiture() {
        return voiture;
    }

    public void setVoiture(Voiture voiture) {
        this.voiture = voiture;
    }

    /* public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    } */

    public Date getDateDebut() {
        return dateDebut;
    }

    public void setDateDebut(Date dateDebut) {
        this.dateDebut = dateDebut;
    }

    public Date getDateFin() {
        return dateFin;
    }

    public void setDateFin(Date dateFin) {
        this.dateFin = dateFin;
    }
/* 
    public String getTypeGarantie() {
        return typeGarantie;
    }

    public void setTypeGarantie(String typeGarantie) {
        this.typeGarantie = typeGarantie;
    }

    public double getFraisLocation() {
        return fraisLocation;
    }

    public void setFraisLocation(double fraisLocation) {
        this.fraisLocation = fraisLocation;
    }

    public String getModePaiement() {
        return modePaiement;
    }

    public void setModePaiement(String modePaiement) {
        this.modePaiement = modePaiement;
    }

    public double getMontantGarantie() {
        return montantGarantie;
    }

    public void setMontantGarantie(double montantGarantie) {
        this.montantGarantie = montantGarantie;
    } */

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
