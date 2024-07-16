package com.example.rentngo.coucheWeb.DTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ContactRequestDTO {
    // private Client client
    private String email;
    private String message;
}
