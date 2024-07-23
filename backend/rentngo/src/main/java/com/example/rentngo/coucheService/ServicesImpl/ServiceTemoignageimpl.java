package com.example.rentngo.coucheService.ServicesImpl;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.example.rentngo.DAO.entites.Temoignage;
import com.example.rentngo.DAO.repository.TemoignageRepository;
import com.example.rentngo.coucheService.Services.ServiceTemoignage;
import com.example.rentngo.coucheWeb.DTO.TemoignageRequestDTO;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
@Transactional
public class ServiceTemoignageimpl implements ServiceTemoignage {
    @Autowired
    private TemoignageRepository temoignageRepository;

    @Override
    public void addTemoignage(String temoignageRequestDTO) throws IOException {
        TemoignageRequestDTO temoignageRequestDTO1 = new ObjectMapper().readValue(temoignageRequestDTO,
                TemoignageRequestDTO.class);
        Temoignage temoignage = new Temoignage();
        temoignage.setDateTemoignage(temoignageRequestDTO1.getDateTemoignage());
        temoignage.setMessageTemoignage(temoignageRequestDTO1.getMessageTemoignage());
        temoignageRepository.save(temoignage);
    }

    @Override
    public Temoignage findTemoignageById(Long id) {
        return temoignageRepository.findById(id).get();
    }

    @Override
    public List<Temoignage> getAllTemoignage() {
        return temoignageRepository.findAll();
    }

    @Override
    public void deleteTemoignage(Long id) {
        Temoignage temoignage = temoignageRepository.findById(id).get();
        temoignageRepository.delete(temoignage);

    }

}
