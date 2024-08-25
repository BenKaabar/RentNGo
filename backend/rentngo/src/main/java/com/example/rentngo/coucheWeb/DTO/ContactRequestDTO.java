package com.example.rentngo.coucheWeb.DTO;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class ContactRequestDTO {
    private Long id;
    private String email;
    private String message;
    // private Long idClient;
}
