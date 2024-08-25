package com.example.rentngo.DAO.entites;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Voiture {
  public Voiture(String name, String type, byte[] picbyte) {
    this.nomPhotoVoiture = name;
    this.typePhotoVoiture = type;
    this.photoVoiture = picbyte;
  }

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String immatriculation;
  private String marque;
  private Long prix;
  private String couleur;
  private String categorie;
  private Long garantie;
  private Boolean estDisponible;
  private String nomPhotoVoiture;
  @Column(name = "type")
  private String typePhotoVoiture;
  @Column(name = "picbyte", length = 50000000)
  private byte[] photoVoiture;

  @OneToOne(mappedBy = "voiture")
  @JsonBackReference
  private Reservation reservation;
}