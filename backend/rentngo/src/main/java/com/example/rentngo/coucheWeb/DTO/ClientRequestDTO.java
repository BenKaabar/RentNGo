package com.example.rentngo.coucheWeb.DTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ClientRequestDTO {
    private String nom;
    private String prenom;
    private String email;
    private String motDePasse;
    private Long telephone;
    private String address;
}