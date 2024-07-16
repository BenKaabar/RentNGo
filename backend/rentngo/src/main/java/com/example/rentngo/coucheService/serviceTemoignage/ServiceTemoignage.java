package com.example.rentngo.coucheService.serviceTemoignage;

import java.util.List;

import com.example.rentngo.DAO.entites.Temoignage;

public interface ServiceTemoignage {
    public Temoignage addTemoignage(Temoignage temoignage);

    public Temoignage getTemoignageById(Long id);

    public List<Temoignage> getAllTemoignage();

    public void deleteTemoignageById(Long id);
}
