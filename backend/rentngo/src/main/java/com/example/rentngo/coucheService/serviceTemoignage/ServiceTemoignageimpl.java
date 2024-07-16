package com.example.rentngo.coucheService.serviceTemoignage;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.rentngo.DAO.entites.Temoignage;
import com.example.rentngo.DAO.repository.TemoignageRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
@Transactional
public class ServiceTemoignageimpl implements ServiceTemoignage {
    final TemoignageRepository temoignageRepository;

    @Override
    public Temoignage addTemoignage(Temoignage temoignage) {
        if (temoignage == null) {
            return null;
        }
        return this.temoignageRepository.save(temoignage);
    }

    @Override
    public Temoignage getTemoignageById(Long id) {
        if (id == null) {
            return null;
        }
        return this.temoignageRepository.getTemoignageById(id);
    }

    @Override
    public List<Temoignage> getAllTemoignage() {
        return this.temoignageRepository.findAll();
    }

    @Override
    public void deleteTemoignageById(Long id) {
        if (id == null) {
            return;
        } else {
            this.temoignageRepository.deleteById(id);
        }
    }

}
