package com.example.rentngo.coucheService.ServicesImpl;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.rentngo.DAO.entites.Client;
import com.example.rentngo.DAO.entites.Temoignage;
import com.example.rentngo.DAO.repository.ClientRepository;
import com.example.rentngo.DAO.repository.TemoignageRepository;
import com.example.rentngo.coucheService.Services.ServiceTemoignage;
import com.example.rentngo.coucheWeb.DTO.TemoignageRequestDTO;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
public class ServiceTemoignageImpl implements ServiceTemoignage {

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private TemoignageRepository temoignageRepository;

    @Override
    public Temoignage addTemoignage(TemoignageRequestDTO dto, Long idClient) throws IOException {
        Client client = clientRepository.findById(idClient).orElse(null);
        if (client == null) {
            log.warn("Client with id {} not found", idClient);
            return null;
        }
        
        Temoignage temoignage = new Temoignage();
        temoignage.setDateTemoignage(dto.getDateTemoignage());
        temoignage.setMessageTemoignage(dto.getMessageTemoignage());
        temoignage.setClient(client);
        
        Temoignage savedTemoignage = temoignageRepository.save(temoignage);
        log.info("Added new temoignage to client id {}", idClient);
        return savedTemoignage;
    }

    @Override
    public Temoignage findTemoignageById(Long id) {
        return temoignageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Temoignage with id " + id + " not found"));
    }

    @Override
    public List<Temoignage> getAllTemoignage() {
        try {
            return temoignageRepository.findAll();
        } catch (Exception e) {
            log.error("Error retrieving all temoignages", e);
            throw new RuntimeException("Could not retrieve temoignages", e);
        }
    }

    @Override
    public void deleteTemoignage(Long id) {
        if (!temoignageRepository.existsById(id)) {
            log.error("Temoignage with id {} not found for deletion", id);
            throw new RuntimeException("Temoignage with id " + id + " not found");
        }
        temoignageRepository.deleteById(id);
        log.info("Deleted temoignage with id: {}", id);
    }
}
