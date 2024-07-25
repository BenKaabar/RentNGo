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

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@AllArgsConstructor
@Service
@Transactional
@Slf4j
public class ServiceTemoignageImpl implements ServiceTemoignage {
    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private TemoignageRepository temoignageRepository;

    @Override
    public void addTemoignage(TemoignageRequestDTO temoignageRequestDTO, Long idClient) throws IOException {
        Client client = clientRepository.findById(temoignageRequestDTO.getIdClient()).orElse(null);
        if (client != null) {
            Temoignage temoignage = new Temoignage();
            temoignage.setDateTemoignage(temoignageRequestDTO.getDateTemoignage());
            temoignage.setMessageTemoignage(temoignageRequestDTO.getMessageTemoignage());
            temoignage.setClient(client);
            temoignageRepository.save(temoignage);
            log.info("Added new temoignage to client id {} ----------------------", idClient);
        } else {
            log.warn("Attempted to add a temoignage failed--------------------");
        }
    }

    @Override
    public Temoignage findTemoignageById(Long id) {
        return temoignageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Temoignage with id " + id + " not found"));
    }

    @Override
    public List<Temoignage> getAllTemoignage() {
        return temoignageRepository.findAll();
    }

    @Override
    public void deleteTemoignage(Long id) {
        Temoignage temoignage = temoignageRepository.findById(id).orElse(null);

        if (temoignage != null) {
            log.error("Temoignage with id {} not found for deletion", id);
            throw new RuntimeException("Temoignage with id " + id + " not found");
        }
        temoignageRepository.deleteById(id);
        log.info("Deleted temoignage with id: {}", id);
    }
}

// Voiture car = carRepository.findById(id).orElse(null);
// if (car != null) {
// carRepository.delete(car);
// log.info("Deleted car with id: {}", id);
// } else {
// log.warn("Attempted to delete a car with id: {} that does not exist", id);
// }