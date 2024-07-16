package com.example.rentngo.DAO.entites;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


@Entity
public class Voiture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String immatriculation;
    private String marque;
    //private double prix;
    private String couleur;
/*   public double getPrix() {
        return prix;
    }
    public void setPrix(double prix) {
        this.prix = prix;
    } */
    public String getCouleur() {
        return couleur;
    }
    public void setCouleur(String couleur) {
        this.couleur = couleur;
    }
    //  private Date dateMiseEnCirculation;
private double prixLocation;
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getImmatriculation() {
        return immatriculation;
    }
    public void setImmatriculation(String immatriculation) {
        this.immatriculation = immatriculation;
    }
    public String getMarque() {
        return marque;
    }
    public void setMarque(String marque) {
        this.marque = marque;
    }
    
/*     public Date getDateMiseEnCirculation() {
        return dateMiseEnCirculation;
    }
    public void setDateMiseEnCirculation(Date dateMiseEnCirculation) {
        this.dateMiseEnCirculation = dateMiseEnCirculation;
    }
  */
    
  public double getPrixLocation() {
    return prixLocation;
}
public void setPrixLocation(double prixLocation) {
    this.prixLocation = prixLocation;
}
    // Getters et Setters
    
}
