package com.example.rentngo.coucheService.Services;

import java.io.IOException;
import java.util.List;


import com.example.rentngo.DAO.entites.Temoignage;
import com.example.rentngo.coucheWeb.DTO.TemoignageRequestDTO;

public interface ServiceTemoignage {
    Temoignage addTemoignage(TemoignageRequestDTO temoignageRequestDTO, Long idClient) throws IOException;

    Temoignage findTemoignageById(Long id);

    List<Temoignage> getAllTemoignage();

    void deleteTemoignage(Long id);
}
