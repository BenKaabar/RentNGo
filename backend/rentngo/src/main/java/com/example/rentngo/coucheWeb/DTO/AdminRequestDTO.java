package com.example.rentngo.coucheWeb.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AdminRequestDTO {
    private Long id;
    private String username;
    private String motdepasse;
}
