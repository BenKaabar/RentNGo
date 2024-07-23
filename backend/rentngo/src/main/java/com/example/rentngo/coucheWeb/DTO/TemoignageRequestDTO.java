package com.example.rentngo.coucheWeb.DTO;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class TemoignageRequestDTO {
    private Long id;
    private LocalDateTime dateTemoignage;
    private String messageTemoignage;
}
