package com.example.rentngo.coucheWeb.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class TemoignageRequestDTO {
    private Long id;
    private String dateTemoignage;
    private String messageTemoignage;
    private Long idClient;
}
