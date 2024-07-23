package com.example.rentngo.coucheService.Services;

import java.io.IOException;
import java.util.List;


import com.example.rentngo.DAO.entites.Temoignage;

public interface ServiceTemoignage {
    void addTemoignage(String temoignageRequestDTO) throws IOException;

    Temoignage findTemoignageById(Long id);

    List<Temoignage> getAllTemoignage();

    void deleteTemoignage(Long id);
}
